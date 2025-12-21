import {
  eachDayOfInterval,
  format,
  getDay,
  isSameDay,
  isSameHour,
  isSameWeek,
  isToday,
  isWeekend,
  parseISO,
} from "date-fns";
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

  // DATE COMPARISON LOGIC:
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

  const [displayedDatesCount, setDisplayedDatesCount] = React.useState(10);
  const displayedDates = allDaysBetween.slice(0, displayedDatesCount);

  const dateRangeAnalysisJSX = (
    <div>
      <p>
        You have{" "}
        <span style={{ fontWeight: "bold" }}>{allDaysBetween.length} days</span>{" "}
        between your appointment and interview.
      </p>
      {displayedDates.map((date) => (
        <p>
          {format(date, "EEE, do MMM, 2025")}
          {isSameDay(date, appointmentDate) && (
            <span className="badge badge-primary">Appointment Day</span>
          )}
          {isSameDay(date, interviewDate) && (
            <span className="badge badge-primary">Interview Day</span>
          )}
          {isToday(date) && <span className="badge badge-primary">Today</span>}
          {isWeekend(date) && (
            <span className="badge badge-success">
              Weekend (You can do preparations)
            </span>
          )}
        </p>
      ))}
      {allDaysBetween.length > displayedDatesCount && (
        <>
          <p>...</p>
          <br />

          <button
            onClick={() => setDisplayedDatesCount(displayedDatesCount + 10)}
          >
            Show more dates
          </button>
        </>
      )}
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
        <div>
          {dateComparisonJSX}
          {dateRangeAnalysisJSX}
        </div>
      )}
    </fieldset>
  );
};
