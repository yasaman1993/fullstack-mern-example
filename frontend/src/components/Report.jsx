import { useState } from "react";

export default function Report() {
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState("");

  function loadReport() {
    fetch("https://fullstack-mern-example-79tt.onrender.com/reports", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not load reports.");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setMessage("");
        setReports(data);
      })
      .catch((error) => {
        setMessage("An error occurred while fetching the reports.");
      });
  }

  return (
    <>
      <button onClick={loadReport}>Lade Reportdaten</button>
      <div>{message}</div>
      {reports.map((report) => (
        <div key={report.id}>{report.title}</div>
      ))}
    </>
  );
}
