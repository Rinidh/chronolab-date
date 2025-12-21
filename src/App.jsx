import { useForm } from "react-hook-form";
import { DateFormatting } from "./components/DateFormatting";
import { InputParsingValidation } from "./components/InputParsingValidation";
import { DateDifference } from "./components/DateDifference";
import "./App.css";
import { AddSubtractDate } from "./components/AddSubtractDate";
import { DateComparisonAnalysis } from "./components/DateComparisonAnalysis";

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
    },
  });

  const onSubmit = (d) => {
    console.table(d);
  };
  const onError = (err) => console.error(err);

  return (
    <div>
      <h1>Chronolab for JS Dates</h1>
      <main>
        <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
          <InputParsingValidation methods={methods} />
          {/* <DateFormatting methods={methods} /> */}
          {/* <DateDifference methods={methods} /> */}
          {/* <AddSubtractDate methods={methods} /> */}
          <DateComparisonAnalysis methods={methods} />
          <input type="submit" />
        </form>
      </main>
    </div>
  );
}

export default App;
