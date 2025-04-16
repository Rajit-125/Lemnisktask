import React from "react";
import timezones from "timezones-list";

function TimezoneSelector({ selected, onChange }) {
  return (
    <div>
      <label>
        Timezone:
        <select value={selected} onChange={(e) => onChange(e.target.value)}>
          {timezones.map((tz) => (
            <option key={tz.tzCode} value={tz.tzCode}>
              {tz.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default TimezoneSelector;
