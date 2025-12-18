import { useForm } from "react-hook-form";
import { format, isValid, isWeekend, parse, parseISO } from "date-fns";
import { enUS, enGB, fr, de } from "date-fns/locale";
import "./App.css";

const locales = {
  "en-US": {
    locale: enUS,
    name: "English (US) Calendar",
  },
  "en-GB": {
    locale: enGB,
    name: "English (UK) Calendar",
  },
  "fr-FR": {
    locale: fr,
    name: "French Calendar",
  },
  "de-DE": {
    locale: de,
    name: "German Calendar",
  },
};

function App() {
  const { handleSubmit, register, formState, trigger, watch } = useForm({
    defaultValues: {
      dateTime: "",
      dateTime2: "",
      dateTime3: "",
      dateTime4: null,
      locale: "en-US",
    },
  });

  const birthdayDateWatch = watch("dateTime4");
  const localeWatch = watch("locale");

  const onSubmit = (d) => {
    console.table(d);
  };
  const onError = (err) => console.error(err);

  return (
    <div>
      <h1>Chronolab for JS Dates</h1>
      <main>
        <section>
          <h2>Input, Parsing & Validation of Dates</h2>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <fieldset>
              <div>
                <label htmlFor="meeting">Date Picker</label>
                <input
                  type="datetime-local"
                  id="meeting"
                  name="meeting"
                  {...register("dateTime", {
                    required: "Please select a date",
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
                <button onClick={() => trigger("dateTime")}>Validate</button>
                {formState.touchedFields.dateTime &&
                  !formState.errors.dateTime &&
                  "✅"}
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
                {formState.touchedFields.dateTime2 &&
                  !formState.errors.dateTime2 &&
                  "✅"}
                {formState.errors.dateTime2 && (
                  <p role="alert" color="red">
                    {formState.errors.dateTime2.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="appointment">Appointment Date</label>
                <input
                  type="datetime-local"
                  id="appointment"
                  {...register("dateTime3", {
                    required: "Please select an appointment date",
                    validate: (value) =>
                      !isWeekend(parseISO(value)) ||
                      "Weekends are not allowed for appointments",
                  })}
                />
                <button onClick={() => trigger("dateTime3")}>Validate</button>
                {formState.touchedFields.dateTime3 &&
                  !formState.errors.dateTime3 &&
                  "✅"}
                {formState.errors.dateTime3 && (
                  <p role="alert" color="red">
                    {formState.errors.dateTime3.message}
                  </p>
                )}
              </div>
            </fieldset>

            <input type="submit" value="Sumbit" />
          </form>
        </section>

        <section>
          <h2>Date formatting</h2>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div>
              <label>
                Your Birthday:{" "}
                <select {...register("locale")}>
                  {Object.keys(locales).map((locale) => (
                    <option key={locale} value={locale}>
                      {locales[locale].name}
                    </option>
                  ))}
                </select>
              </label>
              <input
                type="date"
                {...register("dateTime4", { valueAsDate: true })}
              />
              <div>
                <span>Your birthday is on: </span>
                {formState.dirtyFields.dateTime4 ? (
                  <>
                    {format(birthdayDateWatch, "EEEE, dd MMMM yyyy", {
                      locale:
                        locales[localeWatch]?.locale || locales["en-US"].locale,
                    })}
                    <span style={{ opacity: 0.6 }}>
                      {" "}
                      in {locales[localeWatch]?.name}
                    </span>
                  </>
                ) : (
                  "-- not set --"
                )}
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
