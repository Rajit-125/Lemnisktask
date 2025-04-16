// import React, { useState } from "react";
// import TimezoneSelector from "./TimezoneSelector";
// import { scheduleJob } from "../../api";

// function JobForm() {
//   const [jobType, setJobType] = useState("immediate");
//   const [timeZone, setTimeZone] = useState("Asia/Kolkata");
//   const [dateTime, setDateTime] = useState("");
//   const [frequency, setFrequency] = useState("");
//   const [days, setDays] = useState([]);
//   const [metadata, setMetadata] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const jobPayload = {
//       jobType,
//       timeZone,
//       dateTime,
//       frequency,
//       days,
//       metadata
//     };

//     const res = await scheduleJob(jobPayload);
//     alert(res.message || "Job scheduled!");
//   };

//   const handleDaysChange = (day) => {
//     setDays(prev =>
//       prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Job Type:
//         <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
//           <option value="immediate">Immediate</option>
//           <option value="one-time">One-Time</option>
//           <option value="recurring">Recurring</option>
//           <option value="delayed">Delayed Message</option>
//         </select>
//       </label>

//       {(jobType === "one-time" || jobType === "recurring") && (
//         <>
//           <br />
//           <label>
//             Date & Time:
//             <input
//               type="datetime-local"
//               value={dateTime}
//               onChange={(e) => setDateTime(e.target.value)}
//               required
//             />
//           </label>
//         </>
//       )}

//       <br />
//       <TimezoneSelector selected={timeZone} onChange={setTimeZone} />

//       {jobType === "recurring" && (
//         <>
//           <br />
//           <label>
//             Frequency:
//             <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
//               <option value="hourly">Hourly</option>
//               <option value="daily">Daily</option>
//               <option value="weekly">Weekly</option>
//               <option value="monthly">Monthly</option>
//             </select>
//           </label>

//           {frequency === "weekly" && (
//             <div>
//               <p>Select Days:</p>
//               {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
//                 <label key={day}>
//                   <input
//                     type="checkbox"
//                     value={day}
//                     checked={days.includes(day)}
//                     onChange={() => handleDaysChange(day)}
//                   />
//                   {day}
//                 </label>
//               ))}
//             </div>
//           )}
//         </>
//       )}

//       {jobType === "delayed" && (
//         <div>
//           <label>
//             Metadata:
//             <input
//               type="text"
//               placeholder="Kafka metadata"
//               value={metadata}
//               onChange={(e) => setMetadata(e.target.value)}
//               required
//             />
//           </label>
//         </div>
//       )}

//       <br />
//       <button type="submit">Schedule Job</button>
//     </form>
//   );
// }

// export default JobForm;

import { useState } from "react";
import { scheduleJob } from "../../api"; // Adjust path if needed
import { useNavigate } from "react-router-dom";

export default function JobForm() {
  const [job, setJob] = useState({
    name: "",
    time: "",
    timeZone: "Asia/Kolkata",
    type: "one-time",
    frequency: "none",
    days: [],
    dates: [],
    delay: 0,
    kafkaTopic: "",
    kafkaPayload: ""
  });

  const timeZones = ["UTC", "Asia/Kolkata", "America/New_York", "Europe/London"];
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const navigate=useNavigate()
  const handleSubmit = async () => {
    try {
      const res = await scheduleJob(job);
      const jobDetails = `
Job Name: ${job.name}
Time: ${job.time}
Time Zone: ${job.timeZone}
Type: ${job.type}
Frequency: ${job.frequency}
Days: ${job.days.join(", ")}
Dates: ${job.dates.join(", ")}
Delay: ${job.delay} minutes
Kafka Topic: ${job.kafkaTopic}
Kafka Payload: ${job.kafkaPayload}
      `;
      alert(`Job scheduled successfully!\n\n${jobDetails}`);
      navigate('/', { state: { jobDetails } })
    } catch (err) {
      alert("Failed to schedule job");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600">Schedule a Job</h1>

        {/* Job Name */}
        <div>
          <label className="block mb-1 font-semibold">Job Name</label>
          <input
            type="text"
            placeholder="Enter job name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={job.name}
            onChange={e => setJob({ ...job, name: e.target.value })}
          />
        </div>

        {/* Time Zone */}
        <div>
          <label className="block mb-1 font-semibold">Time Zone</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={job.timeZone}
            onChange={e => setJob({ ...job, timeZone: e.target.value })}
          >
            {timeZones.map(zone => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
        </div>

        {/* Time */}
        <div>
          <label className="block mb-1 font-semibold">Time</label>
          <input
            type="time"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={job.time}
            onChange={e => setJob({ ...job, time: e.target.value })}
          />
        </div>

        {/* Type */}
        <div>
          <label className="block mb-1 font-semibold">Job Type</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={job.type}
            onChange={e => setJob({ ...job, type: e.target.value })}
          >
            <option value="one-time">One-Time</option>
            <option value="immediate">Immediate</option>
            <option value="delayed">Delayed Message</option>
            <option value="recurring">Recurring</option>
          </select>
        </div>

        {/* Frequency for Recurring */}
        {job.type === "recurring" && (
          <div>
            <label className="block mb-1 font-semibold">Frequency</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={job.frequency}
              onChange={e => setJob({ ...job, frequency: e.target.value })}
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        )}

        {/* Weekly Days Picker */}
        {job.frequency === "weekly" && (
          <div>
            <label className="block mb-2 font-semibold">Select Days</label>
            <div className="flex flex-wrap gap-3">
              {daysOfWeek.map(day => (
                <label key={day} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-indigo-500"
                    checked={job.days.includes(day)}
                    onChange={() => {
                      const updatedDays = job.days.includes(day)
                        ? job.days.filter(d => d !== day)
                        : [...job.days, day];
                      setJob({ ...job, days: updatedDays });
                    }}
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Monthly Dates */}
        {job.frequency === "monthly" && (
          <div>
            <label className="block mb-1 font-semibold">Enter Dates (e.g., 1,15,30)</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={job.dates.join(",")}
              onChange={e => setJob({ ...job, dates: e.target.value.split(",") })}
            />
          </div>
        )}

        {/* Delay Option */}
        {job.type === "delayed" && (
          <div>
            <label className="block mb-1 font-semibold">Delay (minutes)</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={job.delay}
              onChange={e => setJob({ ...job, delay: Number(e.target.value) })}
            />
          </div>
        )}

        {/* Kafka Topic and Payload (for delayed) */}
        {job.type === "delayed" && (
          <>
            <div>
              <label className="block mb-1 font-semibold">Kafka Topic</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={job.kafkaTopic}
                onChange={e => setJob({ ...job, kafkaTopic: e.target.value })}
                placeholder="Enter Kafka topic"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Kafka Payload</label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                value={job.kafkaPayload}
                onChange={e => setJob({ ...job, kafkaPayload: e.target.value })}
                placeholder='Enter Kafka payload (JSON format)'
              />
            </div>
          </>
        )}

        {/* Submit */}
        <div>
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Schedule Job
          </button>
        </div>
      </div>
    </div>
  );
}
