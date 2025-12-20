import React from "react";
import { format as formatDate } from "date-fns";
import { locales } from "../data/locales";
import { useWatch } from "react-hook-form";

const formats = [
  "EEEE, dd MMMM yyyy",
  "EEE, MMM d",
  "MMMM do, yyyy",
  "dd/MM/yyyy",
  "yyyy-MM-dd",
];

export const DateFormatting = ({ methods }) => {
  const { control, register, formState } = methods;
  const [format, setFormat] = React.useState(formats[0]);

  const birthdayDateWatch = useWatch({
    control,
    name: "birthday",
  });

  const localeWatch = useWatch({
    control,
    name: "locale",
  });

  return (
    <fieldset>
      <legend>Date formatting</legend>
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
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            {formats.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>
        <input type="date" {...register("birthday", { valueAsDate: true })} />
      </div>
      <div>
        <span>Your birthday is on: </span>
        {formState.dirtyFields.birthday ? (
          <>
            {formatDate(birthdayDateWatch, format, {
              locale: locales[localeWatch]?.locale || locales["en-US"].locale,
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
    </fieldset>
  );
};
