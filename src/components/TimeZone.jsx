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
    <fieldset>
      <legend>Time Zone</legend>

      <div>
        <span>Your favourite TV show starts on:</span>
        <input
          type="datetime-local"
          {...register("startDateTime", { valueAsDate: true })}
        />
        <span>in your local date & time</span>
      </div>
      <div>
        In
        <select
          name="places"
          id="places"
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
        >
          <option value={getSystemTimeZone()}>My local date & time</option>
          <option value="America/New-York">New York (USA)</option>
          <option value="Europe/London">London (UK)</option>
          <option value="Asia/Tokyo">Tokyo (Japan)</option>
          <option value="Australia/Sydney">Sydney (Australia)</option>
          <option value="America/Los_Angeles">Los Angeles</option>
        </select>
        It will be:
        <output>
          {formatDateInTimeZone(
            startDateTime,
            timeZone,
            "EEEE do MMM, yyyy 'at' HH:mm:ss"
          )}
        </output>
      </div>
    </fieldset>
  );
};
