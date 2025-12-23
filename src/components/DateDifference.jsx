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
          interval(startDate, endDate)
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
        return `${days} ${makePlural("day", days !== 1)}`;
      }

      case "business days": {
        const businessDays = differenceInBusinessDays(endDate, startDate);
        return `${businessDays} ${makePlural(
          "business day",
          businessDays !== 1
        )}`;
      }

      case "weeks": {
        const weeks = differenceInWeeks(endDate, startDate);
        return `${weeks} ${makePlural("week", weeks !== 1)}`;
      }

      default:
        return "Invalid format selected";
    }
  };

  return (
    <fieldset className="border rounded p-3 mb-4">
      <legend className="float-none w-auto px-2 fw-semibold">
        Date Difference
      </legend>

      <p className="text-muted mb-3">
        How long would you like to rent an apartment?
      </p>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            className={`form-control ${
              formState.touchedFields.rentDuration && !isValid(startDate)
                ? "is-invalid"
                : ""
            }`}
            {...register("rentDuration.startDate", { valueAsDate: true })}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            className={`form-control ${
              formState.touchedFields.rentDuration && !isValid(endDate)
                ? "is-invalid"
                : ""
            }`}
            {...register("rentDuration.endDate", { valueAsDate: true })}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Difference Format</label>
        <select
          className="form-select"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >
          {formats.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-light border rounded p-3">
        <span className="fw-semibold">Result:</span>
        <div className="mt-1 fs-5">
          {calculateDuration() || (
            <span className="text-muted">Select start and end dates</span>
          )}
        </div>
      </div>

      {formState.touchedFields.rentDuration && (
        <div className="mt-2">
          {!isValid(startDate) && (
            <div className="text-danger small">
              Please enter a valid start date
            </div>
          )}
          {!isValid(endDate) && (
            <div className="text-danger small">
              Please enter a valid end date
            </div>
          )}
        </div>
      )}
    </fieldset>
  );
};
