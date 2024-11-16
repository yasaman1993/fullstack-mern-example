import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Please enter a valid email address.",
    },
  },
 
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  tokenExpiresAt: {
    type: Date,
  },
});

// // Mongoose ruft die toJSON Methode automatisch auf, wenn das Dokument in JSON Format transformiert wird
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v; // this is js
  return obj;
};

const User = mongoose.model("User", UserSchema);
export default User;
