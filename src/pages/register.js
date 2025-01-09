import { useState } from "react";

export default function TempPage() {
  const [eventType, setEventType] = useState("birth");
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({}); // Store field-specific errors

  // Common fields
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");

  // Birth-specific fields
  const [motherFirstName, setMotherFirstName] = useState("");
  const [motherMiddleName, setMotherMiddleName] = useState("");
  const [motherLastName, setMotherLastName] = useState("");
  const [birthWeight, setBirthWeight] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [region, setRegion] = useState("");
  const [zone, setZone] = useState("");
  const [woreda, setWoreda] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Death-specific fields
  const [causeOfDeath, setCauseOfDeath] = useState("");
  const [declaredFirstName, setDeclaredFirstName] = useState("");
  const [declaredMiddleName, setDeclaredMiddleName] = useState("");
  const [declaredLastName, setDeclaredLastName] = useState("");
  const [dateOfDeath, setDateOfDeath] = useState("");
  const [deathRegion, setDeathRegion] = useState("");
  const [deathZone, setDeathZone] = useState("");
  const [deathWoreda, setDeathWoreda] = useState("");
  const [deathSpecificPlace, setDeathSpecificPlace] = useState("");

  // Marriage-specific fields
  const [maleSpouseName, setMaleSpouseName] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
  });
  const [femaleSpouseName, setFemaleSpouseName] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
  });
  const [witnesses, setWitnesses] = useState([
    { firstName: "", middleName: "", lastName: "" },
    { firstName: "", middleName: "", lastName: "" },
  ]);
  const [dateOfMarriage, setDateOfMarriage] = useState("");

  const updateWitness = (index, field, value) => {
    const updatedWitnesses = [...witnesses];
    updatedWitnesses[index][field] = value;
    setWitnesses(updatedWitnesses);
  };

  // Divorce-specific fields
  const [divorceMaleSpouseName, setDivorceMaleSpouseName] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
  });
  const [divorceFemaleSpouseName, setDivorceFemaleSpouseName] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
  });
  const [courtName, setCourtName] = useState("");
  const [dateOfDivorce, setDateOfDivorce] = useState("");

  const resetFields = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setGender("male");
    setMotherFirstName("");
    setMotherMiddleName("");
    setMotherLastName("");
    setBirthWeight("");
    setDateOfBirth("");
    setRegion("");
    setZone("");
    setWoreda("");
    setPhoneNumber("");
    setCauseOfDeath("");
    setDeclaredFirstName("");
    setDeclaredMiddleName("");
    setDeclaredLastName("");
    setDateOfDeath("");
    setDeathRegion("");
    setDeathZone("");
    setDeathWoreda("");
    setDeathSpecificPlace("");
    setMaleSpouseName({ firstName: "", middleName: "", lastName: "" });
    setFemaleSpouseName({ firstName: "", middleName: "", lastName: "" });
    setWitnesses([
      { firstName: "", middleName: "", lastName: "" },
      { firstName: "", middleName: "", lastName: "" },
      { firstName: "", middleName: "", lastName: "" },
    ]);
    setDateOfMarriage("");
    setDivorceMaleSpouseName({ firstName: "", middleName: "", lastName: "" });
    setDivorceFemaleSpouseName({ firstName: "", middleName: "", lastName: "" });
    setCourtName("");
    setDateOfDivorce("");
  };

  const validateForm = () => {
    const errors = {};

    if (eventType === "birth") {
      if (!firstName.trim()) errors.firstName = "First name is required.";
      if (!lastName.trim()) errors.lastName = "Last name is required.";
      if (!gender) errors.gender = "Gender is required.";
      if (!motherFirstName.trim())
        errors.motherFirstName = "Mother's first name is required.";
      if (!motherLastName.trim())
        errors.motherLastName = "Mother's last name is required.";
      if (!birthWeight.trim() || isNaN(birthWeight))
        errors.birthWeight = "Valid birth weight is required.";
      if (!dateOfBirth.trim())
        errors.dateOfBirth = "Date of birth is required.";
      if (!region.trim()) errors.region = "Region is required.";
      if (!zone.trim()) errors.zone = "Zone is required.";
      if (!woreda.trim()) errors.woreda = "Woreda is required.";
      if (!phoneNumber.trim() || !/^\d{10}$/.test(phoneNumber))
        errors.phoneNumber = "A valid 10-digit phone number is required.";
    }
    if (eventType === "death") {
      if (!firstName.trim()) errors.firstName = "First name is required.";
      if (!lastName.trim()) errors.lastName = "Last name is required.";
      if (!causeOfDeath.trim())
        errors.causeOfDeath = "Cause of death is required.";
      if (!declaredFirstName.trim())
        errors.declaredFirstName = "Declarant's first name is required.";
      if (!declaredLastName.trim())
        errors.declaredLastName = "Declarant's last name is required.";
      if (!dateOfDeath.trim())
        errors.dateOfDeath = "Date of death is required.";
      if (!deathRegion.trim()) errors.deathRegion = "Region is required.";
      if (!deathZone.trim()) errors.deathZone = "Zone is required.";
      if (!deathWoreda.trim()) errors.deathWoreda = "Woreda is required.";
      if (!deathSpecificPlace.trim())
        errors.deathSpecificPlace = "Specific place of death is required.";
    } else if (eventType === "marriage") {
      if (!maleSpouseName.firstName.trim())
        errors.maleSpouseFirstName = "Male spouse's first name is required.";
      if (!maleSpouseName.lastName.trim())
        errors.maleSpouseLastName = "Male spouse's last name is required.";
      if (!femaleSpouseName.firstName.trim())
        errors.femaleSpouseFirstName =
          "Female spouse's first name is required.";
      if (!femaleSpouseName.lastName.trim())
        errors.femaleSpouseLastName = "Female spouse's last name is required.";
      if (!dateOfMarriage.trim())
        errors.dateOfMarriage = "Date of marriage is required.";
      witnesses.forEach((witness, index) => {
        if (!witness.firstName.trim())
          errors[`witness${index + 1}FirstName`] = `Witness ${
            index + 1
          }'s first name is required.`;
        if (!witness.lastName.trim())
          errors[`witness${index + 1}LastName`] = `Witness ${
            index + 1
          }'s last name is required.`;
      });
    } else if (eventType === "divorce") {
      if (!divorceMaleSpouseName.firstName.trim())
        errors.maleSpouseFirstName = "Male spouse's first name is required.";
      if (!divorceMaleSpouseName.lastName.trim())
        errors.maleSpouseLastName = "Male spouse's last name is required.";
      if (!divorceFemaleSpouseName.firstName.trim())
        errors.femaleSpouseFirstName =
          "Female spouse's first name is required.";
      if (!divorceFemaleSpouseName.lastName.trim())
        errors.femaleSpouseLastName = "Female spouse's last name is required.";
      if (!courtName.trim()) errors.courtName = "Court name is required.";
      if (!dateOfDivorce.trim())
        errors.dateOfDivorce = "Date of divorce is required.";
    }

    return errors;
  };

  const saveToLocalStorage = () => {
    const newId = Math.floor(Math.random() * 100000);
    const newEvent = {
      id: newId,
      eventType,
      successMessage,
      fieldErrors,
      // Common fields
      firstName,
      middleName,
      lastName,
      gender,
      // Birth-specific fields
      motherFirstName,
      motherMiddleName,
      motherLastName,
      birthWeight,
      dateOfBirth,
      region,
      zone,
      woreda,
      phoneNumber,
      // Death-specific fields
      causeOfDeath,
      declaredFirstName,
      declaredMiddleName,
      declaredLastName,
      dateOfDeath,
      deathRegion,
      deathZone,
      deathWoreda,
      deathSpecificPlace,
      // Marriage-specific fields
      maleSpouseName,
      femaleSpouseName,
      witnesses,
      dateOfMarriage,
      courtName,
      dateOfDivorce,
    };
  
    // Retrieve the current events array from localStorage
    const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
  
    // Add the new event to the array
    existingEvents.push(newEvent);
  
    // Save the updated array back to localStorage
    localStorage.setItem("events", JSON.stringify(existingEvents));
  
    setSuccessMessage("Event added successfully!");
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setSuccessMessage("");
      setFieldErrors(errors); // Set the errors in state
      return;
    }

    // Simulate successful submission
    setSuccessMessage("Registered Successfully!");
    saveToLocalStorage();
    setFieldErrors({});
    resetFields();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white-600">
      <h1 className="text-4xl font-bold text-black mb-6">
        Register Vital Event
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-6 p-6 rounded-lg shadow-lg bg-white"
      >
        {successMessage && (
          <div className="p-4 text-center text-green-800 bg-green-200 rounded-lg">
            {successMessage}
          </div>
        )}

        <div>
          <label
            htmlFor="event-type"
            className="block text-xl font-semibold text-gray-800"
          >
            Event Type
          </label>
          <select
            id="event-type"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-green-500 text-black"
          >
            <option value="birth">Birth</option>
            <option value="death">Death</option>
            <option value="marriage">Marriage</option>
            <option value="divorce">Divorce</option>
          </select>
        </div>

        {/* Birth Form */}
        {eventType === "birth" && (
          <>
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* First Name */}
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.firstName}
                  </p>
                )}
              </div>

              {/* Middle Name */}
              <div>
                <label
                  htmlFor="middle-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Middle Name
                </label>
                <input
                  id="middle-name"
                  type="text"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.middleName && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.middleName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Gender Field */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 mt-6">
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {fieldErrors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.gender}
                  </p>
                )}
              </div>
            </div>

            {/* Mother's Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              {/* Mother's First Name */}
              <div>
                <label
                  htmlFor="mother-first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mother's First Name
                </label>
                <input
                  id="mother-first-name"
                  type="text"
                  value={motherFirstName}
                  onChange={(e) => setMotherFirstName(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.motherFirstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.motherFirstName}
                  </p>
                )}
              </div>

              {/* Mother's Middle Name */}
              <div>
                <label
                  htmlFor="mother-middle-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mother's Middle Name
                </label>
                <input
                  id="mother-middle-name"
                  type="text"
                  value={motherMiddleName}
                  onChange={(e) => setMotherMiddleName(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.motherMiddleName && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.motherMiddleName}
                  </p>
                )}
              </div>

              {/* Mother's Last Name */}
              <div>
                <label
                  htmlFor="mother-last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mother's Last Name
                </label>
                <input
                  id="mother-last-name"
                  type="text"
                  value={motherLastName}
                  onChange={(e) => setMotherLastName(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.motherLastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.motherLastName}
                  </p>
                )}
              </div>
            </div>

            {/* Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              {/* Region */}
              <div>
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700"
                >
                  Region
                </label>
                <input
                  id="region"
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.region && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.region}
                  </p>
                )}
              </div>

              {/* Zone */}
              <div>
                <label
                  htmlFor="zone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zone
                </label>
                <input
                  id="zone"
                  type="text"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.zone && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.zone}
                  </p>
                )}
              </div>

              {/* Woreda */}
              <div>
                <label
                  htmlFor="woreda"
                  className="block text-sm font-medium text-gray-700"
                >
                  Woreda
                </label>
                <input
                  id="woreda"
                  type="text"
                  value={woreda}
                  onChange={(e) => setWoreda(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.woreda && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.woreda}
                  </p>
                )}
              </div>
            </div>

            {/* Remaining Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="date-of-birth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <input
                  id="date-of-birth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.dateOfBirth}
                  </p>
                )}
              </div>

              {/* Birth Weight */}
              <div>
                <label
                  htmlFor="birth-weight"
                  className="block text-sm font-medium text-gray-700"
                >
                  Birth Weight (kg)
                </label>
                <input
                  id="birth-weight"
                  type="text"
                  value={birthWeight}
                  onChange={(e) => setBirthWeight(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.birthWeight && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.birthWeight}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  id="phone-number"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.phoneNumber}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Add other conditional forms */}
        {eventType === "death" && (
          <>
            {/* Name and Gender Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              {/* First Name */}
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.firstName}
                  </p>
                )}
              </div>

              {/* Middle Name */}
              <div>
                <label
                  htmlFor="middle-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Middle Name
                </label>
                <input
                  id="middle-name"
                  type="text"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.middleName && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.middleName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.lastName}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {fieldErrors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.gender}
                  </p>
                )}
              </div>
            </div>

            {/* Declared Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              {/* Declared First Name */}
              <div>
                <label
                  htmlFor="declared-first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Declared First Name
                </label>
                <input
                  id="declared-first-name"
                  type="text"
                  value={declaredFirstName}
                  onChange={(e) => setDeclaredFirstName(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.declaredFirstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.declaredFirstName}
                  </p>
                )}
              </div>

              {/* Declared Middle Name */}
              <div>
                <label
                  htmlFor="declared-middle-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Declared Middle Name
                </label>
                <input
                  id="declared-middle-name"
                  type="text"
                  value={declaredMiddleName}
                  onChange={(e) => setDeclaredMiddleName(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.declaredMiddleName && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.declaredMiddleName}
                  </p>
                )}
              </div>

              {/* Declared Last Name */}
              <div>
                <label
                  htmlFor="declared-last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Declared Last Name
                </label>
                <input
                  id="declared-last-name"
                  type="text"
                  value={declaredLastName}
                  onChange={(e) => setDeclaredLastName(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.declaredLastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.declaredLastName}
                  </p>
                )}
              </div>
            </div>

            {/* Cause of Death */}
            <div className="mt-6">
              <label
                htmlFor="cause-of-death"
                className="block text-sm font-medium text-gray-700"
              >
                Cause of Death
              </label>
              <input
                id="cause-of-death"
                type="text"
                value={causeOfDeath}
                onChange={(e) => setCauseOfDeath(e.target.value)}
                className="w-full p-3 mt-1 border rounded-lg text-black"
              />
              {fieldErrors.causeOfDeath && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.causeOfDeath}
                </p>
              )}
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              {/* Region */}
              <div>
                <label
                  htmlFor="death-region"
                  className="block text-sm font-medium text-gray-700"
                >
                  Region
                </label>
                <input
                  id="death-region"
                  type="text"
                  value={deathRegion}
                  onChange={(e) => setDeathRegion(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.deathRegion && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.deathRegion}
                  </p>
                )}
              </div>

              {/* Zone */}
              <div>
                <label
                  htmlFor="death-zone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zone
                </label>
                <input
                  id="death-zone"
                  type="text"
                  value={deathZone}
                  onChange={(e) => setDeathZone(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.deathZone && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.deathZone}
                  </p>
                )}
              </div>

              {/* Woreda */}
              <div>
                <label
                  htmlFor="death-woreda"
                  className="block text-sm font-medium text-gray-700"
                >
                  Woreda
                </label>
                <input
                  id="death-woreda"
                  type="text"
                  value={deathWoreda}
                  onChange={(e) => setDeathWoreda(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.deathWoreda && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.deathWoreda}
                  </p>
                )}
              </div>
            </div>

            {/* Date of Death and Specific Place */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {/* Date of Death */}
              <div>
                <label
                  htmlFor="date-of-death"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Death
                </label>
                <input
                  id="date-of-death"
                  type="date"
                  value={dateOfDeath}
                  onChange={(e) => setDateOfDeath(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.dateOfDeath && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.dateOfDeath}
                  </p>
                )}
              </div>

              {/* Specific Place of Death */}
              <div>
                <label
                  htmlFor="death-specific-place"
                  className="block text-sm font-medium text-gray-700"
                >
                  Specific Place of Death
                </label>
                <input
                  id="death-specific-place"
                  type="text"
                  value={deathSpecificPlace}
                  onChange={(e) => setDeathSpecificPlace(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.deathSpecificPlace && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.deathSpecificPlace}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {eventType === "marriage" && (
          <>
            {/* Male Spouse Details */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Male Spouse
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="marriage-male-spouse-first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="marriage-male-spouse-first-name"
                    type="text"
                    value={maleSpouseName.firstName}
                    onChange={(e) =>
                      setMaleSpouseName({
                        ...maleSpouseName,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full p-3 mt-1 border rounded-lg text-black"
                  />
                  {fieldErrors.maleSpouseFirstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.maleSpouseFirstName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="marriage-male-spouse-middle-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Middle Name
                  </label>
                  <input
                    id="marriage-male-spouse-middle-name"
                    type="text"
                    value={maleSpouseName.middleName}
                    onChange={(e) =>
                      setMaleSpouseName({
                        ...maleSpouseName,
                        middleName: e.target.value,
                      })
                    }
                    className="w-full p-3 mt-1 border rounded-lg text-black"
                  />
                </div>
                <div>
                  <label
                    htmlFor="marriage-male-spouse-last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="marriage-male-spouse-last-name"
                    type="text"
                    value={maleSpouseName.lastName}
                    onChange={(e) =>
                      setMaleSpouseName({
                        ...maleSpouseName,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full p-3 mt-1 border rounded-lg text-black"
                  />
                  {fieldErrors.maleSpouseLastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.maleSpouseLastName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Female Spouse Details */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Female Spouse
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="marriage-female-spouse-first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="marriage-female-spouse-first-name"
                    type="text"
                    value={femaleSpouseName.firstName}
                    onChange={(e) =>
                      setFemaleSpouseName({
                        ...femaleSpouseName,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full p-3 mt-1 border rounded-lg text-black"
                  />
                  {fieldErrors.femaleSpouseFirstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.femaleSpouseFirstName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="marriage-female-spouse-middle-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Middle Name
                  </label>
                  <input
                    id="marriage-female-spouse-middle-name"
                    type="text"
                    value={femaleSpouseName.middleName}
                    onChange={(e) =>
                      setFemaleSpouseName({
                        ...femaleSpouseName,
                        middleName: e.target.value,
                      })
                    }
                    className="w-full p-3 mt-1 border rounded-lg text-black"
                  />
                </div>
                <div>
                  <label
                    htmlFor="marriage-female-spouse-last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="marriage-female-spouse-last-name"
                    type="text"
                    value={femaleSpouseName.lastName}
                    onChange={(e) =>
                      setFemaleSpouseName({
                        ...femaleSpouseName,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full p-3 mt-1 border rounded-lg text-black"
                  />
                  {fieldErrors.femaleSpouseLastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.femaleSpouseLastName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Witness Details */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Witnesses
              </h3>
              {witnesses.map((witness, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4"
                >
                  <div>
                    <label
                      htmlFor={`witness-${index + 1}-first-name`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      id={`witness-${index + 1}-first-name`}
                      type="text"
                      value={witness.firstName}
                      onChange={(e) => {
                        const updatedWitnesses = [...witnesses];
                        updatedWitnesses[index].firstName = e.target.value;
                        setWitnesses(updatedWitnesses);
                      }}
                      className="w-full p-3 mt-1 border rounded-lg text-black"
                    />
                    {fieldErrors[`witness${index + 1}FirstName`] && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldErrors[`witness${index + 1}FirstName`]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor={`witness-${index + 1}-middle-name`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Middle Name
                    </label>
                    <input
                      id={`witness-${index + 1}-middle-name`}
                      type="text"
                      value={witness.middleName}
                      onChange={(e) => {
                        const updatedWitnesses = [...witnesses];
                        updatedWitnesses[index].middleName = e.target.value;
                        setWitnesses(updatedWitnesses);
                      }}
                      className="w-full p-3 mt-1 border rounded-lg text-black"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`witness-${index + 1}-last-name`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      id={`witness-${index + 1}-last-name`}
                      type="text"
                      value={witness.lastName}
                      onChange={(e) => {
                        const updatedWitnesses = [...witnesses];
                        updatedWitnesses[index].lastName = e.target.value;
                        setWitnesses(updatedWitnesses);
                      }}
                      className="w-full p-3 mt-1 border rounded-lg text-black"
                    />
                    {fieldErrors[`witness${index + 1}LastName`] && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldErrors[`witness${index + 1}LastName`]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Date of Marriage */}
            <div className="mb-6">
              <label
                htmlFor="marriage-date"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Marriage
              </label>
              <input
                id="marriage-date"
                type="date"
                value={dateOfMarriage}
                onChange={(e) => setDateOfMarriage(e.target.value)}
                className="w-full p-3 mt-1 border rounded-lg text-black"
              />
              {fieldErrors.dateOfMarriage && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.dateOfMarriage}
                </p>
              )}
            </div>
          </>
        )}

        {eventType === "divorce" && (
          <>
            {/* Male Spouse Details */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Male Spouse
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="divorce-male-spouse-first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="divorce-male-spouse-first-name"
                    type="text"
                    value={divorceMaleSpouseName.firstName}
                    onChange={(e) =>
                      setDivorceMaleSpouseName({
                        ...divorceMaleSpouseName,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full p-3 mt-1 border rounded-lg text-black"
                  />
                  {fieldErrors.maleSpouseFirstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.maleSpouseFirstName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="divorce-male-spouse-middle-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Middle Name
                  </label>
                  <input
                    id="divorce-male-spouse-middle-name"
                    type="text"
                    value={divorceMaleSpouseName.middleName}
                    onChange={(e) =>
                      setDivorceMaleSpouseName({
                        ...divorceMaleSpouseName,
                        middleName: e.target.value,
                      })
                    }
                    className="w-full p-3 mt-1 border rounded-lg text-black"
                  />
                </div>
                <div>
                  <label
                    htmlFor="divorce-male-spouse-last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="divorce-male-spouse-last-name"
                    type="text"
                    value={divorceMaleSpouseName.lastName}
                    onChange={(e) =>
                      setDivorceMaleSpouseName({
                        ...divorceMaleSpouseName,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full p-3 mt-1 border rounded-lg text-black"
                  />
                  {fieldErrors.maleSpouseLastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.maleSpouseLastName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Female Spouse Details */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Female Spouse
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="divorce-female-spouse-first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="divorce-female-spouse-first-name"
                    type="text"
                    value={divorceFemaleSpouseName.firstName}
                    onChange={(e) =>
                      setDivorceFemaleSpouseName({
                        ...divorceFemaleSpouseName,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full p-3 mt-1 border rounded-lg text-black"
                  />
                  {fieldErrors.femaleSpouseFirstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.femaleSpouseFirstName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="divorce-female-spouse-middle-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Middle Name
                  </label>
                  <input
                    id="divorce-female-spouse-middle-name"
                    type="text"
                    value={divorceFemaleSpouseName.middleName}
                    onChange={(e) =>
                      setDivorceFemaleSpouseName({
                        ...divorceFemaleSpouseName,
                        middleName: e.target.value,
                      })
                    }
                    className="w-full p-3 mt-1 border rounded-lg text-black"
                  />
                </div>
                <div>
                  <label
                    htmlFor="divorce-female-spouse-last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="divorce-female-spouse-last-name"
                    type="text"
                    value={divorceFemaleSpouseName.lastName}
                    onChange={(e) =>
                      setDivorceFemaleSpouseName({
                        ...divorceFemaleSpouseName,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full p-3 mt-1 border rounded-lg text-black"
                  />
                  {fieldErrors.femaleSpouseLastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.femaleSpouseLastName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Court Name and Date of Divorce */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="court-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Court Name
                </label>
                <input
                  id="court-name"
                  type="text"
                  value={courtName}
                  onChange={(e) => setCourtName(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.courtName && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.courtName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="date-of-divorce"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Divorce
                </label>
                <input
                  id="date-of-divorce"
                  type="date"
                  value={dateOfDivorce}
                  onChange={(e) => setDateOfDivorce(e.target.value)}
                  className="w-full p-3 mt-1 border rounded-lg text-black"
                />
                {fieldErrors.dateOfDivorce && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.dateOfDivorce}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
        >
          Register Event
        </button>
      </form>
    </div>
  );
}
