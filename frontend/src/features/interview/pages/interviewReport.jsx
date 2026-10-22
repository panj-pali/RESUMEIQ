import { useEffect, useState } from "react";
import { getAllInterviewReports } from "../servives/interview.api";
import "../style/interReport.scss";
import { useNavigate } from "react-router-dom";

function InterviewReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getAllInterviewReports();

        console.log("Fetched reports:", data);

        // API response se array extract karo
        const reportList = Array.isArray(data)
          ? data
          : data?.interviewReports;

        if (!Array.isArray(reportList)) {
          throw new Error("Invalid reports data received from API");
        }

        setReports(reportList);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch interview reports"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <p>Loading your reports...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="interview-reports">
      <button
  className="back-button"
  onClick={() => navigate(-1)}
>
  ← Back
</button>
      <h2>My Recent Interview Reports</h2>

      {reports.length === 0 ? (
        <p>No interview reports found. Generate your first report!</p>
      ) : (
        reports.map((report) => (
          <div className="report-card" key={report._id}>
            <h3>
              {report.title ||
                report.jobTitle ||
                report.role ||
                "Interview Report"}
            </h3>

              <p>
    <strong>Match Score:</strong>{" "}
    {report.matchScore ?? "Not available"} / 100
  </p>



            <p>
              <strong>Date:</strong>{" "}
              {report.createdAt
                ? new Date(report.createdAt).toLocaleDateString("en-IN")
                : "Not available"}
            </p>

         
          </div>
        ))
      )}
    </div>
  );
}

export default InterviewReports;