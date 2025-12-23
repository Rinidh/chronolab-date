import {
  eachDayOfInterval,
  format,
  isSameDay,
  isSameHour,
  isSameWeek,
  isToday,
  isWeekend,
  parseISO,
} from "date-fns";
import React from "react";
import { useWatch } from "react-hook-form";

export const DateComparisonAnalysis = ({ methods }) => {
  const { register, formState, control } = methods;

  const appointmentDateString = useWatch({
    control,
    name: "appointment",
  });

  const interviewDate = useWatch({
    control,
    name: "interview",
  });

  // DATE COMPARISON LOGIC:
  const appointmentDate = parseISO(appointmentDateString);
  const sameHour = isSameHour(interviewDate, appointmentDate);
  const sameDay = isSameDay(interviewDate, appointmentDate);
  const sameWeek = isSameWeek(interviewDate, appointmentDate);

  const dateComparisonJSX = (
    <div className="mb-4">
      <p className="fw-semibold mb-2">Organize an interview on:</p>

      <input
        type="datetime-local"
        id="interview"
        className={`form-control mb-3 ${
          formState.errors.interview ? "is-invalid" : ""
        }`}
        {...register("interview", {
          required: "Please select a date for the interview",
        })}
      />

      <hr />

      {formState.touchedFields?.interview && (
        <div className="mt-3">
          {!sameWeek && !sameDay && !sameHour ? (
            <div className="alert alert-success">
              You have enough time between interview and appointment dates
            </div>
          ) : (
            <div className="mb-2 fw-semibold">
              Appointment and interview intersect on:
            </div>
          )}

          <div className="d-flex gap-2 flex-wrap">
            {sameWeek && <span className="badge bg-info">Same Week</span>}
            {sameDay && (
              <span className="badge bg-warning text-dark">Same Day</span>
            )}
            {sameHour && <span className="badge bg-danger">Same Hour</span>}
          </div>
        </div>
      )}
    </div>
  );

  // DATE RANGE ANALYSIS:
  let start;
  let end;
  if (appointmentDate > interviewDate) {
    start = interviewDate;
    end = appointmentDate;
  } else {
    start = appointmentDate;
    end = interviewDate;
  }

  const allDaysBetween = eachDayOfInterval({ start, end });
  const weekendsBetween = allDaysBetween.filter((date) => isWeekend(date));

  const [displayedDatesCount, setDisplayedDatesCount] = React.useState(10);
  const displayedDates = allDaysBetween.slice(0, displayedDatesCount);

  const dateRangeAnalysisJSX = (
    <div className="mt-4">
      <p className="mb-3">
        You have <span className="fw-bold">{allDaysBetween.length} days</span>{" "}
        between your appointment and interview, including{" "}
        <span className="fw-bold">{weekendsBetween.length} weekend days</span>{" "}
        for preparation.
      </p>

      <div className="list-group mb-3">
        {displayedDates.map((date) => (
          <div
            key={date.toISOString()}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <span>{format(date, "EEE, do MMM, yyyy")}</span>

            <div className="d-flex gap-1 flex-wrap">
              {isSameDay(date, appointmentDate) && (
                <span className="badge bg-primary">Appointment</span>
              )}
              {isSameDay(date, interviewDate) && (
                <span className="badge bg-primary">Interview</span>
              )}
              {isToday(date) && (
                <span className="badge bg-secondary">Today</span>
              )}
              {isWeekend(date) && (
                <span className="badge bg-success">Weekend</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {allDaysBetween.length > displayedDatesCount && (
        <div className="text-center">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setDisplayedDatesCount(displayedDatesCount + 10)}
          >
            Show more dates
          </button>
        </div>
      )}
    </div>
  );

  return (
    <fieldset className="border rounded p-3 mb-4">
      <legend className="float-none w-auto px-2 fw-semibold">
        Date Comparison Analysis
      </legend>

      {!appointmentDateString ? (
        <div className="alert alert-warning">
          Please select an appointment date to compare with
        </div>
      ) : (
        <>
          {dateComparisonJSX}
          {dateRangeAnalysisJSX}
        </>
      )}
    </fieldset>
  );
};
