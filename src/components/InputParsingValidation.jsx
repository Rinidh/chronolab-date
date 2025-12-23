import React from "react";
import { parse, isWeekend, isValid, parseISO } from "date-fns";
import { dateFormats } from "../data/commonDateFormats";

export const InputParsingValidation = ({ methods }) => {
  const { register, formState, trigger } = methods;

  return (
    <fieldset className="border rounded p-3 mb-4">
      <legend className="float-none w-auto px-2 fw-semibold">
        Input, Parsing & Validation of Dates
      </legend>

      {/* Holiday */}
      <div className="mb-3">
        <label htmlFor="holiday" className="form-label">
          Leave for Christmas Holiday on
        </label>

        <input
          type="datetime-local"
          id="holiday"
          className={`form-control ${
            formState.errors.holiday ? "is-invalid" : ""
          }`}
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

        <div className="d-flex align-items-center gap-2 mt-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => trigger("holiday")}
          >
            Validate
          </button>

          {formState.touchedFields.holiday && !formState.errors.holiday && (
            <span className="text-success">✔ Valid</span>
          )}
        </div>

        {formState.errors.holiday && (
          <div className="invalid-feedback d-block">
            {formState.errors.holiday.message}
          </div>
        )}
      </div>

      {/* Random Date */}
      <div className="mb-3">
        <label htmlFor="randomDate" className="form-label">
          Random Date
        </label>

        <input
          type="text"
          id="randomDate"
          className={`form-control ${
            formState.errors.randomDate ? "is-invalid" : ""
          }`}
          placeholder="e.g. 25/12/2025 or 2025/12/25"
          {...register("randomDate", {
            validate: (value) => {
              let date = null;

              for (const format of dateFormats) {
                date = parse(value, format, new Date());
                if (isValid(date)) {
                  return true;
                }
              }
              return "Please enter a valid date format";
            },
          })}
        />

        <div className="d-flex align-items-center gap-2 mt-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => trigger("randomDate")}
          >
            Validate
          </button>

          {formState.touchedFields.randomDate &&
            !formState.errors.randomDate && (
              <span className="text-success">✔ Valid</span>
            )}
        </div>

        {formState.errors.randomDate && (
          <div className="invalid-feedback d-block">
            {formState.errors.randomDate.message}
          </div>
        )}
      </div>

      {/* Appointment */}
      <div className="mb-3">
        <label htmlFor="appointment" className="form-label">
          Appointment Date
        </label>

        <input
          type="datetime-local"
          id="appointment"
          className={`form-control ${
            formState.errors.appointment ? "is-invalid" : ""
          }`}
          {...register("appointment", {
            required: "Please select an appointment date",
            validate: (value) =>
              !isWeekend(parseISO(value)) ||
              "Weekends are not allowed for appointments",
          })}
        />

        <div className="d-flex align-items-center gap-2 mt-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => trigger("appointment")}
          >
            Validate
          </button>

          {formState.touchedFields.appointment &&
            !formState.errors.appointment && (
              <span className="text-success">✔ Valid</span>
            )}
        </div>

        {formState.errors.appointment && (
          <div className="invalid-feedback d-block">
            {formState.errors.appointment.message}
          </div>
        )}
      </div>
    </fieldset>
  );
};
