import React from "react";
import { useWatch } from "react-hook-form";
import { formatDistance } from "date-fns";

export const RelativeDates = ({ methods }) => {
  const { control, register, formState } = methods;

  const deadline = useWatch({
    control,
    name: "deadline",
  });

  const getMessage = () => {
    const readableDistance = formatDistance(deadline, new Date(), {
      addSuffix: true,
    });

    if (deadline > new Date()) {
      return `Project should be complete ${readableDistance}`;
    } else {
      return `Deadline expired ${readableDistance}`;
    }
  };

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

        {deadline && <p>Project should be complete {getMessage()}</p>}
      </div>
    </fieldset>
  );
};
