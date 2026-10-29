export const EVENT_TYPES = [
  { value: "BIRTH", label: "Birth" },
  { value: "DEATH", label: "Death" },
  { value: "MARRIAGE", label: "Marriage" },
  { value: "DIVORCE", label: "Divorce" },
];

export const STATUSES = [
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

export const GENDERS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
];

export function labelFor(options, value) {
  return options.find((o) => o.value === value)?.label || value;
}

const LOCATION_SECTION = {
  title: "Place of Registration",
  fields: [
    { name: "region", label: "Region", required: true },
    { name: "zone", label: "Zone", required: true },
    { name: "woreda", label: "Woreda", required: true },
  ],
};

/**
 * Form layout per event type. Field names match the backend's event JSON,
 * except the child's name, which the form splits into three parts.
 */
export const EVENT_FORMS = {
  BIRTH: [
    {
      title: "Child",
      fields: [
        { name: "childFirstName", label: "First Name", required: true },
        { name: "childMiddleName", label: "Middle Name", required: true },
        { name: "childLastName", label: "Last Name", required: true },
        { name: "gender", label: "Gender", type: "select", options: GENDERS, required: true },
        { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
        { name: "birthWeight", label: "Birth Weight (kg, optional)", type: "number" },
      ],
    },
    {
      title: "Parents",
      fields: [
        { name: "fatherName", label: "Father's Full Name", required: true },
        { name: "motherName", label: "Mother's Full Name", required: true },
        { name: "phoneNumber", label: "Contact Phone (optional)", type: "tel" },
      ],
    },
    LOCATION_SECTION,
  ],
  DEATH: [
    {
      title: "Deceased",
      fields: [
        { name: "deceasedName", label: "Full Name", required: true },
        { name: "gender", label: "Gender", type: "select", options: GENDERS, required: true },
        { name: "dateOfDeath", label: "Date of Death", type: "date", required: true },
        { name: "causeOfDeath", label: "Cause of Death", required: true },
        { name: "placeOfDeath", label: "Place of Death", required: true },
        { name: "certifierName", label: "Certifier's Full Name", required: true },
      ],
    },
    LOCATION_SECTION,
  ],
  MARRIAGE: [
    {
      title: "Spouses",
      fields: [
        { name: "maleSpouseName", label: "Husband's Full Name", required: true },
        { name: "femaleSpouseName", label: "Wife's Full Name", required: true },
        { name: "dateOfMarriage", label: "Date of Marriage", type: "date", required: true },
      ],
    },
    {
      title: "Witnesses and Certifier",
      fields: [
        { name: "witnessOneName", label: "First Witness's Full Name", required: true },
        { name: "witnessTwoName", label: "Second Witness's Full Name", required: true },
        { name: "certifierName", label: "Certifier's Full Name", required: true },
      ],
    },
    LOCATION_SECTION,
  ],
  DIVORCE: [
    {
      title: "Spouses",
      fields: [
        { name: "maleSpouseName", label: "Husband's Full Name", required: true },
        { name: "femaleSpouseName", label: "Wife's Full Name", required: true },
        { name: "dateOfDivorce", label: "Date of Divorce", type: "date", required: true },
        { name: "courtName", label: "Court", required: true },
      ],
    },
    LOCATION_SECTION,
  ],
};

export function emptyValues(type) {
  const values = {};
  EVENT_FORMS[type].forEach((section) =>
    section.fields.forEach((field) => {
      values[field.name] = field.type === "select" ? field.options[0].value : "";
    })
  );
  return values;
}

/** Form values -> request body for register/update. */
export function toRequest(type, values) {
  const { childFirstName, childMiddleName, childLastName, region, zone, woreda, ...rest } =
    values;
  const request = { ...rest, type, location: { region, zone, woreda } };
  if (type === "BIRTH") {
    request.childName = [childFirstName, childMiddleName, childLastName]
      .map((part) => part.trim())
      .join(" ");
    request.birthWeight = values.birthWeight === "" ? null : Number(values.birthWeight);
    request.phoneNumber = values.phoneNumber.trim() || null;
  }
  return request;
}

/** Event from the API -> form values. */
export function fromEvent(event) {
  const values = emptyValues(event.type);
  Object.keys(values).forEach((name) => {
    if (event[name] !== undefined && event[name] !== null) values[name] = String(event[name]);
  });
  values.region = event.location.region;
  values.zone = event.location.zone;
  values.woreda = event.location.woreda;
  if (event.type === "BIRTH") {
    const [first = "", middle = "", ...last] = event.childName.split(/\s+/);
    values.childFirstName = first;
    values.childMiddleName = middle;
    values.childLastName = last.join(" ");
  }
  return values;
}

/** Label/value pairs describing an event, for read-only display. */
export function describeEvent(event) {
  const values = fromEvent(event);
  return EVENT_FORMS[event.type].flatMap((section) =>
    section.fields
      .filter((field) => values[field.name] !== "")
      .map((field) => ({
        label: field.label.replace(" (optional)", "").replace(" (kg, optional)", " (kg)"),
        value: field.options ? labelFor(field.options, values[field.name]) : values[field.name],
      }))
  );
}
