import React from "react";
import {
  addBusinessDays,
  addDays,
  addMonths,
  addWeeks,
  format,
  isSameDay,
} from "date-fns";
import { useWatch } from "react-hook-form";

export const AddSubtractDate = ({ methods }) => {
  const { register, control, getValues, formState } = methods;
  const initialReservationDate = getValues("initialReservationDate");
  const [newDate, setNewDate] = React.useState(initialReservationDate);
  const [accordionOpen, setAccordionOpen] = React.useState(false);

  const showNewText =
    formState.touchedFields?.reservationExtension &&
    !isSameDay(newDate, initialReservationDate) &&
    !accordionOpen;

  const { value = 0, unit = "days" } = useWatch({
    control,
    name: "reservationExtension",
  });

  React.useEffect(() => {
    setNewDate(() => {
      switch (unit) {
        case "days":
          return addDays(initialReservationDate, value);
        case "businessDays":
          return addBusinessDays(initialReservationDate, value);
        case "weeks":
          return addWeeks(initialReservationDate, value);
        case "months":
          return addMonths(initialReservationDate, value);
        default:
          return initialReservationDate;
      }
    });
  }, [unit, value, initialReservationDate]);

  return (
    <fieldset className="border rounded p-3 mb-4">
      <legend className="float-none w-auto px-2 fw-semibold">
        Add & Subtract Dates
      </legend>

      <div className="mb-3">
        <p
          className={`mb-1 ${
            showNewText ? "text-decoration-line-through text-muted" : ""
          }`}
        >
          Your reservation is valid upto{" "}
          <span className="fw-semibold">
            {format(initialReservationDate, "EEEE, do MMM, yyyy")}
          </span>
        </p>

        {showNewText && (
          <p className="text-success fw-semibold">
            Your reservation was changed to{" "}
            <span>{format(newDate, "EEEE, do MMM, yyyy")}</span>
          </p>
        )}
      </div>

      {!accordionOpen && (
        <button
          type="button"
          className="btn btn-outline-primary mb-3"
          onClick={() => setAccordionOpen(true)}
        >
          Change reservation
        </button>
      )}

      {accordionOpen && (
        <div className="border rounded bg-light p-3">
          <div className="mb-3 fw-semibold">Change your reservation by:</div>

          <div className="row g-3 align-items-end mb-3">
            <div className="col-4">
              <label className="form-label">Value</label>
              <input
                type="number"
                inputMode="numeric"
                pattern="\d*"
                className="form-control"
                {...register("reservationExtension.value", {
                  valueAsNumber: true,
                })}
              />
            </div>

            <div className="col-8">
              <label className="form-label">Unit</label>
              <select
                className="form-select"
                {...register("reservationExtension.unit")}
              >
                <option value="days">Days</option>
                <option value="businessDays">Business days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>

          <p className="mb-3">
            Your reservation will expire on{" "}
            <span className="fw-semibold">
              {format(newDate, "EEEE, do MMM, yyyy")}
            </span>
          </p>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => setAccordionOpen(false)}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </fieldset>
  );
};
