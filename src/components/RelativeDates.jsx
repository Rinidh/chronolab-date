import React from "react";
import { useWatch } from "react-hook-form";
import { formatDistance } from "date-fns";

export const RelativeDates = ({ methods }) => {
  const { control, register, formState } = methods;

  const deadline = useWatch({
    control,
    name: "deadline",
  });

  return (
    <fieldset>
      <legend>Relative Dates</legend>

      <div>
        <label htmlFor="deadline">Set your Project Deadline on:</label>
        <input
          type="datetime-local"
          id="deadline"
          name="deadline"
          {...register("deadline", {
            required: "Please select a deadline",
          })}
        />

        {formState.errors.deadline && (
          <p role="alert">{formState.errors.deadline.message}</p>
        )}

        {deadline && (
          <p>
            Project should be complete{" "}
            {formatDistance(deadline, new Date(), { addSuffix: true })}
          </p>
        )}
      </div>
    </fieldset>
  );
};
