export const scheduleJob = async (job) => {
    try {
      const res = await fetch("http://localhost:8080/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });
      return await res.json();
    } catch (err) {
      console.error("Schedule error", err);
      return { message: "Failed to schedule job" };
    }
  };
  
  export const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/jobs");
      return await res.json();
    } catch (err) {
      console.error("Fetch error", err);
      return { jobs: [] };
    }
  };
  