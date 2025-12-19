import React from "react";
import { format } from "date-fns";
import { locales } from "../data/locales";
import { useWatch } from "react-hook-form";

export const DateFormatting = ({ methods }) => {
  const { control, register, formState } = methods;

  const birthdayDateWatch = useWatch({
    control,
    name: "dateTime4",
  });

  const localeWatch = useWatch({
    control,
    name: "locale",
  });

  return (
    <div>
      <h2>Date formatting</h2>
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
        <input type="date" {...register("dateTime4", { valueAsDate: true })} />
        <div>
          <span>Your birthday is on: </span>
          {formState.dirtyFields.dateTime4 ? (
            <>
              {format(birthdayDateWatch, "EEEE, dd MMMM yyyy", {
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
      </div>
    </div>
  );
};
