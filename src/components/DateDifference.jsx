import React from "react";
import { interval, intervalToDuration } from "date-fns";
import { useWatch } from "react-hook-form";

export const DateDifference = ({ methods }) => {
  const { control, register } = methods;

  const { startDate, endDate } = useWatch({
    control,
    name: "rentDuration",
  });

  const calculateDuration = () => {
    if (!startDate && !endDate) return "Select start and end dates";
    if (!startDate) return "Select a start date as well";
    if (!endDate) return "Select an end date as well";

    let dateString = "";
    let { years, months, days } = intervalToDuration(
      interval(startDate, endDate) // interval() validates input dates as well
    );

    if (years) dateString += `${years} years, `;
    if (months) dateString += `${months} months, `;
    if (days) dateString += `${days} days`;
    if (years < 0 || months < 0 || days < 0) {
      dateString = dateString.slice(1);
      dateString += " before";
    }

    return dateString || "Select start and end dates";
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

      <output>{calculateDuration()}</output>
    </fieldset>
  );
};
