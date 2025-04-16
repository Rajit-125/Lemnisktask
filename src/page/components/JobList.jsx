import { useLocation } from "react-router-dom";

export default function JobList() {
  const location = useLocation();
  const jobDetails = location.state?.jobDetails;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-indigo-600 mb-4">📄 Scheduled Job</h1>

        {jobDetails ? (
          <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap text-gray-800">
            {jobDetails}
          </pre>
        ) : (
          <p className="text-gray-500">No job data available. Please schedule a job first.</p>
        )}
      </div>
    </div>
  );
}
