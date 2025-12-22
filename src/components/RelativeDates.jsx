import React from "react";
import { useWatch } from "react-hook-form";
import { formatDistance } from "date-fns";
import { locales } from "../data/locales";

export const RelativeDates = ({ methods }) => {
  const { control, register, formState } = methods;
  const [currentLocale, setCurrentLocale] = React.useState("en-US");

  const deadline = useWatch({
    control,
    name: "deadline",
  });

  const getMessage = () => {
    const readableDistance = formatDistance(deadline, new Date(), {
      addSuffix: true,
      locale: locales[currentLocale].locale,
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
            valueAsDate: true,
          })}
        />

        {formState.errors.deadline && (
          <p role="alert">{formState.errors.deadline.message}</p>
        )}

        {deadline && <p>{getMessage()}</p>}

        <select
          name="locale"
          id="locale"
          onChange={(e) => {
            console.log(e.target.value);
            setCurrentLocale(e.target.value);
          }}
        >
          {Object.entries(locales).map(([key, value]) => (
            <option key={key} value={key}>
              {value.name}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  );
};
