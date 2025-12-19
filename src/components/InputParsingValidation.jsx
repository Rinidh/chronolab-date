import React from "react";
import { parse, isWeekend, isValid, parseISO } from "date-fns";

export const InputParsingValidation = ({ methods }) => {
  const { register, formState, trigger } = methods;

  return (
    <div>
      <h2>Input, Parsing & Validation of Dates</h2>
      <fieldset>
        <div>
          <label htmlFor="meeting">Date Picker</label>
          <input
            type="datetime-local"
            id="meeting"
            name="meeting"
            {...register("dateTime", {
              required: "Please select a date",
              min: {
                value: "2025-12-01T00:00",
                message: "Date cannot be before 1st December",
              },
              max: {
                value: "2025-12-31T23:59",
                message: "Date cannot be after 31 December",
              },
            })}
          />
          <button onClick={() => trigger("dateTime")}>Validate</button>
          {formState.touchedFields.dateTime &&
            !formState.errors.dateTime &&
            "✅"}
          {formState.errors.dateTime && (
            <p role="alert" color="red">
              {formState.errors.dateTime.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="travel">Lunch Time</label>
          <input
            type="text"
            id="travel"
            name="travel"
            {...register("dateTime2", {
              validate: (value) => {
                let date = null;
                const dateFormats = ["dd/MM/yyyy", "MM/dd/yyyy", "yyyy/MM/dd"];

                for (const format of dateFormats) {
                  date = parse(value, format, new Date());
                  if (isValid(date)) {
                    return true;
                  }
                }
                return "Please enter a valid date separated by slashes";
              },
            })}
            placeholder="Type in day, month & year in any pattern, but use slashes '/' to separate"
          />
          <button onClick={() => trigger("dateTime2")}>Validate</button>
          {formState.touchedFields.dateTime2 &&
            !formState.errors.dateTime2 &&
            "✅"}
          {formState.errors.dateTime2 && (
            <p role="alert" color="red">
              {formState.errors.dateTime2.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="appointment">Appointment Date</label>
          <input
            type="datetime-local"
            id="appointment"
            {...register("dateTime3", {
              required: "Please select an appointment date",
              validate: (value) =>
                !isWeekend(parseISO(value)) ||
                "Weekends are not allowed for appointments",
            })}
          />
          <button onClick={() => trigger("dateTime3")}>Validate</button>
          {formState.touchedFields.dateTime3 &&
            !formState.errors.dateTime3 &&
            "✅"}
          {formState.errors.dateTime3 && (
            <p role="alert" color="red">
              {formState.errors.dateTime3.message}
            </p>
          )}
        </div>
      </fieldset>
    </div>
  );
};
