import React from "react";
import {
  differenceInBusinessDays,
  differenceInDays,
  differenceInWeeks,
  interval,
  intervalToDuration,
  isValid,
} from "date-fns";
import { useWatch } from "react-hook-form";

const makePlural = (singularNoun, booleanCondition) => {
  // this function adds 's' to the end of a noun based on a boolean condition
  return booleanCondition ? `${singularNoun}s` : singularNoun;
};

const formats = ["years, months, days", "days", "business days", "weeks"];

export const DateDifference = ({ methods }) => {
  const { control, register, formState } = methods;
  const [format, setFormat] = React.useState(formats[0]);

  const { startDate, endDate } = useWatch({
    control,
    name: "rentDuration",
  });

  const calculateDuration = () => {
    if (!isValid(startDate) || !isValid(endDate)) return;

    let dateString = "";

    switch (format) {
      case "years, months, days": {
        let { years, months, days } = intervalToDuration(
          interval(startDate, endDate) // interval() validates input dates as well
        );

        if (years)
          dateString += `${years} ${makePlural("year", years !== 1)}, `;
        if (months)
          dateString += `${months} ${makePlural("month", months !== 1)}, `;
        if (days) dateString += `${days} ${makePlural("day", days !== 1)}`;
        if (years < 0 || months < 0 || days < 0) {
          dateString = dateString.slice(1);
          dateString += " before";
        }
        return dateString;
      }
      case "days": {
        const days = differenceInDays(endDate, startDate);
        dateString += `${days} ${makePlural("day", days !== 1)}`;
        return dateString;
      }
      case "business days": {
        const businesDays = differenceInBusinessDays(endDate, startDate);
        dateString += `${businesDays} ${makePlural(
          "business day",
          businesDays !== 1
        )}`;
        return dateString;
      }
      case "weeks": {
        const weeks = differenceInWeeks(endDate, startDate);
        dateString += `${weeks} ${makePlural("week", weeks !== 1)}`;
        return dateString;
      }

      default:
        dateString += "Invalid format selected";
        return dateString;
    }
  };

  return (
    <fieldset>
      <legend>Date difference</legend>

      <div>
        <p>How long would you like to rent an apartment?</p>
        <label htmlFor="startDate">Start Date:</label>
        <input
          id="startDate"
          type="date"
          {...register("rentDuration.startDate", { valueAsDate: true })}
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <input
          id="endDate"
          type="date"
          {...register("rentDuration.endDate", { valueAsDate: true })}
        />
      </div>

      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        {formats.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>

      <output>{calculateDuration() || "Select start and end dates"}</output>
      {formState.touchedFields.rentDuration && (
        <>
          {!isValid(startDate) && <p role="alert">Enter start date as well</p>}
          {!isValid(endDate) && <p role="alert">Enter end date as well</p>}
        </>
      )}
    </fieldset>
  );
};
