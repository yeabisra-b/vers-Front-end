import React from "react";
import InputField from "./InputField";
import SectionHeader from "./SectionHeader";
import SelectField from "./SelectField";
import { EVENT_FORMS } from "../lib/events";

const today = () => new Date().toISOString().slice(0, 10);

/** The fields for one event type. `onChange(name, value)` reports each edit. */
const EventForm = ({ type, values, onChange }) => (
  <div className="space-y-6">
    {EVENT_FORMS[type].map((section) => (
      <section key={section.title}>
        <SectionHeader title={section.title} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {section.fields.map((field) => {
            const id = `event-${field.name}`;
            const handleChange = (e) => onChange(field.name, e.target.value);
            return field.type === "select" ? (
              <SelectField
                key={field.name}
                id={id}
                label={field.label}
                value={values[field.name]}
                onChange={handleChange}
                options={field.options}
                required={field.required}
              />
            ) : (
              <InputField
                key={field.name}
                id={id}
                label={field.label}
                type={field.type || "text"}
                value={values[field.name]}
                onChange={handleChange}
                required={field.required}
                max={field.type === "date" ? today() : undefined}
                min={field.type === "number" ? "0.1" : undefined}
                step={field.type === "number" ? "0.01" : undefined}
              />
            );
          })}
        </div>
      </section>
    ))}
  </div>
);

export default EventForm;
