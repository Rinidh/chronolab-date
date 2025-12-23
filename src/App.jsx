import { useForm } from "react-hook-form";
import { DateFormatting } from "./components/DateFormatting";
import { InputParsingValidation } from "./components/InputParsingValidation";
import { DateDifference } from "./components/DateDifference";
import "./App.css";
import { AddSubtractDate } from "./components/AddSubtractDate";
import { DateComparisonAnalysis } from "./components/DateComparisonAnalysis";
import { RelativeDates } from "./components/RelativeDates";
import { TimeZone } from "./components/TimeZone";

function App() {
  const methods = useForm({
    defaultValues: {
      holiday: "",
      randomDate: "",
      appointment: "",
      birthday: null,
      locale: "en-US",
      rentDuration: { startDate: null, endDate: null },
      initialReservationDate: new Date("2026-01-01"),
      reservationExtension: { value: 0, unit: "days" },
      deadline: null,
      startDateTime: null,
    },
  });

  const onSubmit = (d) => {
    console.table(d);
  };
  const onError = (err) => console.error(err);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">ChronoLab for JS Dates</h1>

      <main className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
            <InputParsingValidation methods={methods} />
            <DateFormatting methods={methods} />
            <DateDifference methods={methods} />
            <AddSubtractDate methods={methods} />
            {/* <DateComparisonAnalysis methods={methods} /> */}
            {/* <RelativeDates methods={methods} /> */}
            {/* <TimeZone methods={methods} /> */}

            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary btn-lg">
                Submit All Data
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
