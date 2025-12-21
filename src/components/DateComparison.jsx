import { isSameDay, isSameHour, isSameWeek, parseISO } from "date-fns";
import React from "react";
import { useWatch } from "react-hook-form";

export const DateComparison = ({ methods }) => {
  const { register, formState, control } = methods;

  const appointmentDateString = useWatch({
    control,
    name: "appointment",
  });

  const interviewDate = useWatch({
    control,
    name: "interview",
  });

  const appointmentDate = parseISO(appointmentDateString);
  const sameHour = isSameHour(interviewDate, appointmentDate);
  const sameDay = isSameDay(interviewDate, appointmentDate);
  const sameWeek = isSameWeek(interviewDate, appointmentDate);

  const dateComparisonJSX = (
    <div>
      <p>Organize an interview on:</p>
      <input
        type="datetime-local"
        id="interview"
        name="interview"
        {...register("interview", {
          required: "Please select a date for the interview",
        })}
      />
      <hr />

      <div>
        {formState.touchedFields?.interview && (
          <>
            Appointment and interview is on:
            {sameWeek && <span className="badge badge-info">Same Week</span>}
            {sameDay && <span className="badge badge-warning">Same Day</span>}
            {sameHour && <span className="badge badge-danger">Same Hour</span>}
            {!sameWeek && !sameDay && !sameHour && (
              <span>
                You have enough time between interview and appointment dates ✅
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <fieldset>
      <legend>Date Comparison Component</legend>

      {!appointmentDateString ? (
        <div className="alert alert-primary">
          ⚠️ Please select an appointment date to compare with
          {/* Will use Bootstrap for designing whole form in the end */}
        </div>
      ) : (
        dateComparisonJSX
      )}
    </fieldset>
  );
};
