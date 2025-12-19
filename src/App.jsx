import { useForm } from "react-hook-form";
import { DateFormatting } from "./components/DateFormatting";
import { InputParsingValidation } from "./components/InputParsingValidation";
import "./App.css";

function App() {
  const methods = useForm({
    defaultValues: {
      dateTime: "",
      dateTime2: "",
      dateTime3: "",
      dateTime4: null,
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
          <section>
            <InputParsingValidation methods={methods} />
          </section>

          <section>
            <DateFormatting methods={methods} />
          </section>
        </form>
      </main>
    </div>
  );
}

export default App;
