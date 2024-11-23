import { useEffect, useState } from "react";

export default function Report() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("https://fullstack-mern-example-79tt.onrender.com/reports", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }

        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="reports">
      <h1>Reports</h1>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>{report.title}</li>
        ))}
      </ul>
    </div>
  );
}
