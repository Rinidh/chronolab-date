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
    <fieldset className="border rounded p-3 mb-4">
      <legend className="float-none w-auto px-2 fw-semibold">
        Date Formatting
      </legend>

      {/* Controls */}
      <div className="row g-3 align-items-end mb-3">
        <div className="col-md-4">
          <label className="form-label">Locale</label>
          <select className="form-select" {...register("locale")}>
            {Object.keys(locales).map((locale) => (
              <option key={locale} value={locale}>
                {locales[locale].name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Date Format</label>
          <select
            className="form-select"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            {formats.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Your Birthday</label>
          <input
            type="date"
            className="form-control"
            {...register("birthday", { valueAsDate: true })}
          />
        </div>
      </div>

      {/* Output */}
      <div className="bg-light border rounded p-3">
        <span className="fw-semibold">Formatted Output:</span>
        <div className="mt-1">
          {formState.dirtyFields.birthday ? (
            <>
              <span className="fs-5">
                {formatDate(birthdayDateWatch, format, {
                  locale:
                    locales[localeWatch]?.locale || locales["en-US"].locale,
                })}
              </span>
              <span className="text-muted ms-2">
                ({locales[localeWatch]?.name})
              </span>
            </>
          ) : (
            <span className="text-muted">-- not set --</span>
          )}
        </div>
      </div>
    </fieldset>
  );
};
