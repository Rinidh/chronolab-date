import React from "react";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useWatch } from "react-hook-form";

export const TimeZone = ({ methods }) => {
  const { register, control } = methods;
  const [timeZone, setTimeZone] = React.useState("America/New_York");

  const startDateTime = useWatch({
    control,
    name: "startDateTime",
  });

  const formatDateInTimeZone = (date, timeZone) => {
    if (!date) return "";
    return format(toZonedTime(date, timeZone), "yyyy-MM-dd HH:mm:ssXXX", {
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
          <option value="America/New-York">New York (USA)</option>
          <option value="Europe/London">London (UK)</option>
          <option value="Asia/Tokyo">Tokyo (Japan)</option>
          <option value="Australia/Sydney">Sydney (Australia)</option>
          <option value="America/Los_Angeles">Los Angeles</option>
        </select>
        It will be:
        <output>{formatDateInTimeZone(startDateTime, timeZone)}</output>
      </div>
    </fieldset>
  );
};
