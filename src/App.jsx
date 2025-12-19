import { useForm } from "react-hook-form";
import { DateFormatting } from "./components/DateFormatting";
import { InputParsingValidation } from "./components/InputParsingValidation";
import "./App.css";

function App() {
  const methods = useForm({
    defaultValues: {
      holiday: "",
      randomDate: "",
      appointment: "",
      birthday: null,
      locale: "en-US",
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
          <DateFormatting methods={methods} />

          <input type="submit" />
        </form>
      </main>
    </div>
  );
}

export default App;
