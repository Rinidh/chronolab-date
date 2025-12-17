import { useForm } from "react-hook-form";
import { isValid, parse, parseISO } from "date-fns";
import "./App.css";

function App() {
  const { handleSubmit, register, formState, trigger } = useForm({
    defaultValues: {
      dateTime: "",
      dateTime2: "",
    },
  });

  const onSubmit = (d) => {
    console.log(parseISO(d.dateTime).toDateString());
  };
  const onError = (err) => console.error(err);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <fieldset>
          <div>
            <label htmlFor="meeting">Date Picker</label>
            <input
              type="datetime-local"
              id="meeting"
              name="meeting"
              {...register("dateTime", {
                min: {
                  value: "2025-12-01T00:00",
                  message: "Date cannot be before 1st December",
                },
                max: {
                  value: "2025-12-31T23:59",
                  message: "Date cannot be after 31 December",
                },
              })}
            />
            {formState.errors.dateTime && (
              <p role="alert" color="red">
                {formState.errors.dateTime.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="travel">Lunch Time</label>
            <input
              type="text"
              id="travel"
              name="travel"
              {...register("dateTime2", {
                validate: (value) => {
                  let date = null;
                  const dateFormats = [
                    "dd/MM/yyyy",
                    "MM/dd/yyyy",
                    "yyyy/MM/dd",
                  ];

                  for (const format of dateFormats) {
                    date = parse(value, format, new Date());
                    if (isValid(date)) {
                      return true;
                    }
                  }
                  return "Please enter a valid date separated by slashes";
                },
              })}
              placeholder="Type in day, month & year in any pattern, but use slashes '/' to separate"
            />
            <button onClick={() => trigger("dateTime2")}>Validate</button>
            {formState.errors.dateTime2 && (
              <p role="alert" color="red">
                {formState.errors.dateTime2.message}
              </p>
            )}
          </div>
        </fieldset>

        <input type="submit" value="Sumbit" />
      </form>
    </div>
  );
}

export default App;
