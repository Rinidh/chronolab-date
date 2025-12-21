import React from "react";
import {
  addBusinessDays,
  addDays,
  addMonths,
  addWeeks,
  format,
} from "date-fns";
import { useWatch } from "react-hook-form";

export const AddSubtractDate = ({ methods }) => {
  const { register, control, getValues } = methods;
  const initialReservationDate = getValues("initialReservationDate");
  const [newDate, setNewDate] = React.useState(initialReservationDate);

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
          break;
      }
    });
  }, [unit, value, initialReservationDate]);

  return (
    <fieldset>
      <legend>Add & Subtract Dates</legend>

      <div>
        <p>
          Your reservation is valid upto{" "}
          <span>{format(initialReservationDate, "EEEE, do MMM, yyyy")}</span>
        </p>
        <span>Change your reservation by:</span>
        <input
          type="number"
          inputMode="numeric"
          pattern="\d*" // to prevent decimal inputs
          {...register("reservationExtension.value", {
            valueAsNumber: true,
          })}
        />
        <select {...register("reservationExtension.unit")}>
          <option value="days">days</option>
          <option value="businessDays">business days</option>
          <option value="weeks">weeks</option>
          <option value="months">months</option>
        </select>

        <p>
          Your reservation will expire on:{" "}
          <span>{format(newDate, "EEEE, do MMM, yyyy")}</span>
        </p>
      </div>
    </fieldset>
  );
};
