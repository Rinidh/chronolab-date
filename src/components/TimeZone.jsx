import React from "react";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useWatch } from "react-hook-form";

function getSystemTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export const TimeZone = ({ methods }) => {
  const { register, control } = methods;
  const [timeZone, setTimeZone] = React.useState(() => getSystemTimeZone());

  const startDateTime = useWatch({
    control,
    name: "startDateTime",
  });

  const formatDateInTimeZone = (
    date,
    timeZone,
    pattern = "yyyy-MM-dd HH:mm:ssXXX"
  ) => {
    if (!date) return "";
    return format(toZonedTime(date, timeZone), pattern, {
      timeZone,
    });
  };

  return (
    <fieldset className="border rounded p-3 mb-4">
      <legend className="float-none w-auto px-2 fs-6">Time Zone</legend>

      <div className="mb-3">
        <label className="form-label">Your favourite TV show starts on</label>

        <input
          type="datetime-local"
          className="form-control"
          {...register("startDateTime", { valueAsDate: true })}
        />

        <div className="form-text">In your local date & time</div>
      </div>

      <div className="row align-items-center g-2">
        <div className="col-md-4">
          <select
            className="form-select"
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
          >
            <option value={getSystemTimeZone()}>My local date & time</option>
            <option value="America/New_York">New York (USA)</option>
            <option value="Europe/London">London (UK)</option>
            <option value="Asia/Tokyo">Tokyo (Japan)</option>
            <option value="Australia/Sydney">Sydney (Australia)</option>
            <option value="America/Los_Angeles">Los Angeles</option>
          </select>
        </div>

        <div className="col-md-8">
          <output className="form-control bg-light">
            {formatDateInTimeZone(
              startDateTime,
              timeZone,
              "EEEE do MMM, yyyy 'at' HH:mm:ss"
            )}
          </output>
        </div>
      </div>
    </fieldset>
  );
};
