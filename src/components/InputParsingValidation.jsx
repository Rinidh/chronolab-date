import React from "react";
import { parse, isWeekend, isValid, parseISO } from "date-fns";

export const InputParsingValidation = ({ methods }) => {
  const { register, formState, trigger } = methods;

  return (
    <fieldset>
      <legend>Input, Parsing & Validation of Dates</legend>
      <div>
        <label htmlFor="meeting">Leave for Christmas Holiday on</label>
        <input
          type="datetime-local"
          id="holiday"
          name="holiday"
          {...register("holiday", {
            required: "Please select a date",
            min: {
              value: "2025-12-01T00:00",
              message:
                "You're leaving too early for Christmas holiday (before 1st December)",
            },
            max: {
              value: "2025-12-31T23:59",
              message:
                "Don't leave too late for Christmas holiday (after 31 December)",
            },
          })}
        />
        <button onClick={() => trigger("holiday")}>Validate</button>
        {formState.touchedFields.holiday && !formState.errors.holiday && "✅"}
        {formState.errors.holiday && (
          <p role="alert" color="red">
            {formState.errors.holiday.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="randomDate">Random day</label>
        <input
          type="text"
          id="randomDate"
          name="randomDate"
          {...register("randomDate", {
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
        <button onClick={() => trigger("randomDate")}>Validate</button>
        {formState.touchedFields.randomDate &&
          !formState.errors.randomDate &&
          "✅"}
        {formState.errors.randomDate && (
          <p role="alert" color="red">
            {formState.errors.randomDate.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="appointment">Appointment Date</label>
        <input
          type="datetime-local"
          id="appointment"
          {...register("appointment", {
            required: "Please select an appointment date",
            validate: (value) =>
              !isWeekend(parseISO(value)) ||
              "Weekends are not allowed for appointments",
          })}
        />
        <button onClick={() => trigger("appointment")}>Validate</button>
        {formState.touchedFields.appointment &&
          !formState.errors.appointment &&
          "✅"}
        {formState.errors.appointment && (
          <p role="alert" color="red">
            {formState.errors.appointment.message}
          </p>
        )}
      </div>
    </fieldset>
  );
};
