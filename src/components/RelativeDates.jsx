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
    <fieldset className="border rounded p-3 mb-4">
      <legend className="float-none w-auto px-2 fw-semibold">
        Relative Dates
      </legend>

      <div className="row g-3 align-items-end">
        <div className="col-md-6">
          <label htmlFor="deadline" className="form-label">
            Project Deadline
          </label>
          <input
            type="datetime-local"
            id="deadline"
            className={`form-control ${
              formState.errors.deadline ? "is-invalid" : ""
            }`}
            {...register("deadline", {
              required: "Please select a deadline",
              valueAsDate: true,
            })}
          />

          {formState.errors.deadline && (
            <div className="invalid-feedback d-block">
              {formState.errors.deadline.message}
            </div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="locale" className="form-label">
            Language / Locale
          </label>
          <select
            id="locale"
            className="form-select"
            onChange={(e) => setCurrentLocale(e.target.value)}
          >
            {Object.entries(locales).map(([key, value]) => (
              <option key={key} value={key}>
                {value.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {deadline && (
        <div className="alert alert-info mt-3 mb-0">{getMessage()}</div>
      )}
    </fieldset>
  );
};
