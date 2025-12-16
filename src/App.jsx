import { useState } from "react";
import { isValid } from "date-fns";
import { useForm } from "react-hook-form";
import { parseISO } from "date-fns";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      dateTime: "",
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
            <label>Date</label>
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
        </fieldset>

        <input type="submit" value="Sumbit" />
      </form>
    </div>
  );
}

export default App;
