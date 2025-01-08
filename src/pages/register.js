import InputBox from "@/components/InputBox";
import { useState } from "react";
<<<<<<< HEAD

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
=======

export default function RegisterEventPage() {
  const NEXT_PUBLIC_API_URL = "http://localhost:8080";

  const [formData, setFormData] = useState({
    type: "",
    childName: { firstName: "", middleName: "", lastName: "" },
    dateOfBirth: "",
    fatherName: { firstName: "", middleName: "", lastName: "" },
    motherName: { firstName: "", middleName: "", lastName: "" },
    birthWeight: "",
    deceasedName: { firstName: "", middleName: "", lastName: "" },
    dateOfDeath: "",
    causeOfDeath: "",
    certifierName: { firstName: "", middleName: "", lastName: "" },
    maleSpouseName: { firstName: "", middleName: "", lastName: "" },
    femaleSpouseName: { firstName: "", middleName: "", lastName: "" },
    witnessOneName: { firstName: "", middleName: "", lastName: "" },
    witnessTwoName: { firstName: "", middleName: "", lastName: "" },
    courtName: "",
    dateOfMarriage: "",
    dateOfDivorce: "",
    dateOfRegistration: "",
    location: {
      region: "",
      zone: "",
      woreda: "",
    },
    registrar: {
      username: "",
      role: "REGISTRAR",
    },
    status: "PENDING",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("location.")) {
      const locationField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value,
        },
      }));
    } else if (name.includes("registrar.")) {
      const registrarField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        registrar: {
          ...prev.registrar,
          [registrarField]: value,
        },
      }));
    } else if (name.includes("Name.")) {
      const [field, subField] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Concatenate name fields before sending
    const formattedData = {
      ...formData,
      childName: `${formData.childName.firstName} ${formData.childName.middleName} ${formData.childName.lastName}`.trim(),
      fatherName: `${formData.fatherName.firstName} ${formData.fatherName.middleName} ${formData.fatherName.lastName}`.trim(),
      motherName: `${formData.motherName.firstName} ${formData.motherName.middleName} ${formData.motherName.lastName}`.trim(),
      deceasedName: `${formData.deceasedName.firstName} ${formData.deceasedName.middleName} ${formData.deceasedName.lastName}`.trim(),
      certifierName: `${formData.certifierName.firstName} ${formData.certifierName.middleName} ${formData.certifierName.lastName}`.trim(),
      maleSpouseName: `${formData.maleSpouseName.firstName} ${formData.maleSpouseName.middleName} ${formData.maleSpouseName.lastName}`.trim(),
      femaleSpouseName: `${formData.femaleSpouseName.firstName} ${formData.femaleSpouseName.middleName} ${formData.femaleSpouseName.lastName}`.trim(),
      witnessOneName: `${formData.witnessOneName.firstName} ${formData.witnessOneName.middleName} ${formData.witnessOneName.lastName}`.trim(),
      witnessTwoName: `${formData.witnessTwoName.firstName} ${formData.witnessTwoName.middleName} ${formData.witnessTwoName.lastName}`.trim(),
    };

    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/registrar/register-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
        return;
      }

      const successData = await response.json();
      alert(successData.message);

      // Reset form
      setFormData({
        type: "",
        childName: { firstName: "", middleName: "", lastName: "" },
        dateOfBirth: "",
        fatherName: { firstName: "", middleName: "", lastName: "" },
        motherName: { firstName: "", middleName: "", lastName: "" },
        birthWeight: "",
        deceasedName: { firstName: "", middleName: "", lastName: "" },
        dateOfDeath: "",
        causeOfDeath: "",
        certifierName: { firstName: "", middleName: "", lastName: "" },
        maleSpouseName: { firstName: "", middleName: "", lastName: "" },
        femaleSpouseName: { firstName: "", middleName: "", lastName: "" },
        witnessOneName: { firstName: "", middleName: "", lastName: "" },
        witnessTwoName: { firstName: "", middleName: "", lastName: "" },
        courtName: "",
        dateOfMarriage: "",
        dateOfDivorce: "",
        dateOfRegistration: "",
        location: {
          region: "",
          zone: "",
          woreda: "",
        },
        registrar: {
          username: "",
          role: "REGISTRAR",
        },
        status: "PENDING",
      });
    } catch (error) {
      alert("Failed to connect to the server. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Register Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="type">
>>>>>>> 2482df1 (Initial commit for a branch)
            Event Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Event Type</option>
            <option value="BIRTH">Birth</option>
            <option value="DEATH">Death</option>
            <option value="MARRIAGE">Marriage</option>
            <option value="DIVORCE">Divorce</option>
          </select>
        </div>

<<<<<<< HEAD
        {/* Birth Form */}
        {eventType === "birth" && (
          <>
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* First Name */}
              <InputBox
                name={"FirstName"}
                id={"first-name"}
                type={"text"}
                fieldErrors={fieldErrors.firstName}
                value={firstName}
                setFunc={setFirstName}
              />
              {/* Middle Name */}
              <InputBox
                name={"Middle Name"}
                id={"middle-name"}
                type={"text"}
                fieldErrors={fieldErrors.middleName}
                value={middleName}
                setFunc={setMiddleName}
              />
              {/* Last Name */}
              <InputBox
                name={"Last Name"}
                id={"last-name"}
                type={"text"}
                fieldErrors={fieldErrors.lastName}
                value={lastName}
                setFunc={setLastName}
              />
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
              <InputBox
                name="Mother's First Name"
                id="mother-first-name"
                type="text"
                value={motherFirstName}
                setFunc={setMotherFirstName}
                fieldErrors={fieldErrors.motherFirstName}
              />

              {/* Mother's Middle Name */}
              <InputBox
                name="Mother's Middle Name"
                id="mother-middle-name"
                type="text"
                value={motherMiddleName}
                setFunc={setMotherMiddleName}
                fieldErrors={fieldErrors.motherMiddleName}
              />

              {/* Mother's Last Name */}
              <InputBox
                name="Mother's Last Name"
                id="mother-last-name"
                type="text"
                value={motherLastName}
                setFunc={setMotherLastName}
                fieldErrors={fieldErrors.motherLastName}
              />
            </div>

            {/* Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              {/* Region */}
              <InputBox
                name="Region"
                id="region"
                type="text"
                value={region}
                setFunc={setRegion}
                fieldErrors={fieldErrors.region}
              />

              {/* Zone */}
              <InputBox
                name="Zone"
                id="zone"
                type="text"
                value={zone}
                setFunc={setZone}
                fieldErrors={fieldErrors.zone}
              />

              {/* Woreda */}
              <InputBox
                name="Woreda"
                id="woreda"
                type="text"
                value={woreda}
                setFunc={setWoreda}
                fieldErrors={fieldErrors.woreda}
              />
            </div>

            {/* Remaining Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              {/* Date of Birth */}
              <InputBox
                name="Date of Birth"
                id="date-of-birth"
                type="date"
                value={dateOfBirth}
                setFunc={setDateOfBirth}
                fieldErrors={fieldErrors.dateOfBirth}
              />

              {/* Birth Weight */}
              <InputBox
                name="Birth Weight (kg)"
                id="birth-weight"
                type="text"
                value={birthWeight}
                setFunc={setBirthWeight}
                fieldErrors={fieldErrors.birthWeight}
              />

              {/* Phone Number */}
              <InputBox
                name="Phone Number"
                id="phone-number"
                type="text"
                value={phoneNumber}
                setFunc={setPhoneNumber}
                fieldErrors={fieldErrors.phoneNumber}
              />
            </div>
          </>
        )}

        {/* Add other conditional forms */}
        {eventType === "death" && (
          <>
            {/* Name and Gender Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              {/* First Name */}
              <InputBox
                name="First Name"
                id="first-name"
                type="text"
                value={firstName}
                setFunc={setFirstName}
                fieldErrors={fieldErrors.firstName}
              />

              {/* Middle Name */}
              <InputBox
                name="Middle Name"
                id="middle-name"
                type="text"
                value={middleName}
                setFunc={setMiddleName}
                fieldErrors={fieldErrors.middleName}
              />

              {/* Last Name */}
              <InputBox
                name="Last Name"
                id="last-name"
                type="text"
                value={lastName}
                setFunc={setLastName}
                fieldErrors={fieldErrors.lastName}
              />

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
              <InputBox
                name="Declared First Name"
                id="declared-first-name"
                type="text"
                value={declaredFirstName}
                setFunc={setDeclaredFirstName}
                fieldErrors={fieldErrors.declaredFirstName}
              />

              {/* Declared Middle Name */}
              <InputBox
                name="Declared Middle Name"
                id="declared-middle-name"
                type="text"
                value={declaredMiddleName}
                setFunc={setDeclaredMiddleName}
                fieldErrors={fieldErrors.declaredMiddleName}
              />

              {/* Declared Last Name */}
              <InputBox
                name="Declared Last Name"
                id="declared-last-name"
                type="text"
                value={declaredLastName}
                setFunc={setDeclaredLastName}
                fieldErrors={fieldErrors.declaredLastName}
              />
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
              <InputBox
                name="Region"
                id="death-region"
                type="text"
                value={deathRegion}
                setFunc={setDeathRegion}
                fieldErrors={fieldErrors.deathRegion}
              />

              {/* Zone */}
              <InputBox
                name="Zone"
                id="death-zone"
                type="text"
                value={deathZone}
                setFunc={setDeathZone}
                fieldErrors={fieldErrors.deathZone}
              />

              {/* Woreda */}
              <InputBox
                name="Woreda"
                id="death-woreda"
                type="text"
                value={deathWoreda}
                setFunc={setDeathWoreda}
                fieldErrors={fieldErrors.deathWoreda}
              />
            </div>

            {/* Date of Death and Specific Place */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {/* Date of Death */}
              <InputBox
                name="Date of Death"
                id="date-of-death"
                type="date"
                value={dateOfDeath}
                setFunc={setDateOfDeath}
                fieldErrors={fieldErrors.dateOfDeath}
              />

              {/* Specific Place of Death */}
              <InputBox
                name="Specific Place of Death"
                id="death-specific-place"
                type="text"
                value={deathSpecificPlace}
                setFunc={setDeathSpecificPlace}
                fieldErrors={fieldErrors.deathSpecificPlace}
              />
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
=======
        {formData.type === "BIRTH" && (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Child Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="childName.firstName"
              value={formData.childName.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Middle Name"
              name="childName.middleName"
              value={formData.childName.middleName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="childName.lastName"
              value={formData.childName.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <label className="block text-gray-700 font-bold mb-2">Father Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="fatherName.firstName"
              value={formData.fatherName.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Middle Name"
              name="fatherName.middleName"
              value={formData.fatherName.middleName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="fatherName.lastName"
              value={formData.fatherName.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <label className="block text-gray-700 font-bold mb-2">Mother Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="motherName.firstName"
              value={formData.motherName.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Middle Name"
              name="motherName.middleName"
              value={formData.motherName.middleName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="childName.lastName"
              value={formData.motherName.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label className="block text-gray-700 font-bold mb-2 mt-4">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label className="block text-gray-700 font-bold mb-2">Birth Weight</label>
            <input
              type="number"
              name="birthWeight"
              value={formData.birthWeight}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
          </div>
        )}

        {formData.type === "DEATH" && (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Deceased Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="deceasedName.firstName"
              value={formData.deceasedName.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Middle Name"
              name="deceasedName.middleName"
              value={formData.deceasedName.middleName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="deceasedName.lastName"
              value={formData.deceasedName.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label className="block text-gray-700 font-bold mb-2 mt-4">Date of Death</label>
            <input
              type="date"
              name="dateOfDeath"
              value={formData.dateOfDeath}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label className="block text-gray-700 font-bold mb-2 mt-4">Cause of Death</label>
            <input
              type="text"
              name="causeOfDeath"
              value={formData.causeOfDeath}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label className="block text-gray-700 font-bold mb-2">Certifier Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="certifierName.firstName"
              value={formData.certifierName.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Middle Name"
              name="certifierName.middleName"
              value={formData.certifierName.middleName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="certifierName.lastName"
              value={formData.certifierName.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        {formData.type === "MARRIAGE" && (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Male Spouse Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="maleSpouseName.firstName"
              value={formData.maleSpouseName.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Middle Name"
              name="maleSpouseName.middleName"
              value={formData.maleSpouseName.middleName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="maleSpouseName.lastName"
              value={formData.maleSpouseName.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label className="block text-gray-700 font-bold mb-2 mt-4">Female Spouse Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="femaleSpouseName.firstName"
              value={formData.femaleSpouseName.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Middle Name"
              name="femaleSpouseName.middleName"
              value={formData.femaleSpouseName.middleName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="femaleSpouseName.lastName"
              value={formData.femaleSpouseName.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label className="block text-gray-700 font-bold mb-2 mt-4">Date of Marriage</label>
            <input
              type="date"
              name="dateOfMarriage"
              value={formData.dateOfMarriage}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label className="block text-gray-700 font-bold mb-2 mt-4">First Witness Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="witnessOneName.firstName"
              value={formData.witnessOneName.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Middle Name"
              name="witnessOneName.middleName"
              value={formData.witnessOneName.middleName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="witnessOneName.lastName"
              value={formData.witnessOneName.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label className="block text-gray-700 font-bold mb-2 mt-4">Second Witness Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="witnessTwoName.firstName"
              value={formData.witnessTwoName.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Middle Name"
              name="witnessTwoName.middleName"
              value={formData.witnessTwoName.middleName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="witnessTwoName.lastName"
              value={formData.witnessTwoName.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label className="block text-gray-700 font-bold mb-2 mt-4">Certifier Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="certifierName.firstName"
              value={formData.certifierName.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Middle Name"
              name="certifierName.middleName"
              value={formData.certifierName.middleName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="certifierName.lastName"
              value={formData.certifierName.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />

          </div>
        )}

        {formData.type === "DIVORCE" && (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Male Spouse Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="maleSpouseName.firstName"
              value={formData.maleSpouseName.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Middle Name"
              name="maleSpouseName.middleName"
              value={formData.maleSpouseName.middleName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="maleSpouseName.lastName"
              value={formData.maleSpouseName.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label className="block text-gray-700 font-bold mb-2 mt-4">Female Spouse Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="femaleSpouseName.firstName"
              value={formData.femaleSpouseName.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Middle Name"
              name="femaleSpouseName.middleName"
              value={formData.femaleSpouseName.middleName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="femaleSpouseName.lastName"
              value={formData.femaleSpouseName.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label className="block text-gray-700 font-bold mb-2 mt-4">Certifier Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="certifierName.firstName"
              value={formData.certifierName.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Middle Name"
              name="certifierName.middleName"
              value={formData.certifierName.middleName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="certifierName.lastName"
              value={formData.certifierName.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label className="block text-gray-700 font-bold mb-2">Court Name</label>
            <input
              type="text"
              name="courtName"
              value={formData.courtName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label className="block text-gray-700 font-bold mb-2 mt-4">Date of Divorce</label>
            <input
              type="date"
              name="dateOfDivorce"
              value={formData.dateOfDivorce}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
>>>>>>> 2482df1 (Initial commit for a branch)
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

