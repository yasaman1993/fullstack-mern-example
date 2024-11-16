import bcrypt from "bcrypt";
import User from "../models/User.js";
import crypto from "node:crypto";
import { Resend } from "resend";
import jwt from "jsonwebtoken";

const resend = new Resend(process.env.API_KEY);

// Register user
export async function registerUser(req, res) {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Check if email or password is missing
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  // Check if the email already exists in the database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email is already registered." });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with the hashed password and verification token
    const user = await User.create({
      email,
      password: hashedPassword,
      verificationToken: crypto.randomBytes(32).toString("hex"),
      tokenExpiresAt: Date.now() + 1000 * 60 * 60 * 24, // Token expires in 24 hours
    });

    // Send the verification email using Resend
    const emailResponse = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "yasaman.nikpay@dci-student.org",
      subject: "Welcome to d01b",
      html: `
        <html>
          <body style="font-family: Arial, sans-serif;">
            <h1>Welcome to d01b</h1>
            <p>Wir freuen uns, dich in unserem Team zu haben.</p>
            <p>Bitte bestätige deine E-Mail-Adresse, indem du auf den folgenden Link klickst:</p>
            <a href="http://localhost:3000/verify/${user.verificationToken}" style="color: blue;">E-Mail bestätigen</a>
            <p>Nächste Schritte:</p>
            <ol>
              <li>Explore our features</li>
              <li>Set up your profile</li>
              <li>Start using our platform to maximize productivity</li>
            </ol>
            <p>Bis bald!</p>
            <p>Das d01b Team</p>
          </body>
        </html>
      `,
    });

    if (emailResponse.error) {
      return res
        .status(500)
        .json({ error: "Failed to send verification email" });
    }

    res.status(201).json({ message: "User registered successfully!", user });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}

// Login user
export async function loginUser(req, res) {
  //Step 1: Extract email and password from the request body
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid email or password." });
  }
  try {
    // Step 2: Find the user by User
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: "Invalid login" });
    }
    // Step 3: Check if the user is verified
    if (!user.verified) {
      return res.status(403).json({ error: "Account not verified" });
    }

    // Step 4: Compare the password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // Step 5: If passwords do not match, return an error
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid login" });
    }

    // TODO Erstelle JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    // TODO Antworte mit token und paar Userdaten
    res
      .status(200)
      .json({ message: "Login successful!", user: user, token: token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}

// Verify user
export async function verifyUser(req, res) {
  // Extract the token from the URL
  const token = req.params.token;

  // Find the user based on the verification token
  const user = await User.findOne({ verificationToken: token });

  if (user && Date.now() < user.tokenExpiresAt) {
    // Check if the token is valid and not expired
    user.verified = true; // Mark the user as verified
    user.verificationToken = undefined; // Remove the verification token to prevent reuse
    user.tokenExpiresAt = undefined; // Remove the token expiry date

    // Save the changes to the database
    await user.save();
    res.status(200).json({ message: "Email successfully verified!" });
  } else {
    res.status(400).json({ message: "Invalid or expired token" });
  }
}

// Reports controller (example for using authMiddleware)
export const getReports = (req, res) => {
  console.log(req.user.userId);
  const reports = [
    { id: 1, title: "Status Report" },
    { id: 2, title: "Aktivitäts Report" },
  ];
  res.json(reports);
};
