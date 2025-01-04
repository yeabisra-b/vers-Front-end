import { useState } from "react";
import { useRouter } from "next/router";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import SectionHeader from "../components/SectionHeader";

export default function RegisterPage() {
  const router = useRouter();

  const [eventType, setEventType] = useState("birth");
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
    { firstName: "", middleName: "", lastName: "" },
  ]);

  const [dateOfMarriage, setDateOfMarriage] = useState("");

  // Function to update witness data
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

  const handleWitnessChange = (index, field, value) => {
    const updatedWitnesses = [...witnesses];
    updatedWitnesses[index][field] = value;
    setWitnesses(updatedWitnesses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      eventType,
      firstName,
      middleName,
      lastName,
      gender,
    };

    if (eventType === "birth") {
      eventData.motherName = {
        firstName: motherFirstName,
        middleName: motherMiddleName,
        lastName: motherLastName,
      };
      eventData.birthWeight = birthWeight;
      eventData.dateOfBirth = dateOfBirth;
    } else if (eventType === "death") {
      eventData.causeOfDeath = causeOfDeath;
      eventData.declaredBy = {
        firstName: declaredFirstName,
        middleName: declaredMiddleName,
        lastName: declaredLastName,
      };
      eventData.dateOfDeath = dateOfDeath;
    } else if (eventType === "marriage") {
      eventData.maleSpouseName = maleSpouseName;
      eventData.femaleSpouseName = femaleSpouseName;
      eventData.witnesses = witnesses;
      eventData.dateOfMarriage = dateOfMarriage;
    } else if (eventType === "divorce") {
      eventData.maleSpouseName = divorceMaleSpouseName;
      eventData.femaleSpouseName = divorceFemaleSpouseName;
      eventData.courtName = courtName;
      eventData.dateOfDivorce = dateOfDivorce;
    }

    console.log("Registering event:", eventData);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-green-600">
      <h1 className="text-4xl font-bold text-white mb-6">
        Register Vital Event
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-6 p-6 rounded-lg shadow-lg bg-white"
      >
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

        {eventType === "birth" && (
          <>
            <SectionHeader title="Birth Details" />

            <div className="grid grid-cols-3 gap-4">
              <InputField
                label="First Name"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <InputField
                label="Middle Name"
                id="middle-name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
              <InputField
                label="Last Name"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <SelectField
              label="Gender"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />

            <SectionHeader title="Mother's Information" />
            <div className="grid grid-cols-3 gap-4">
              <InputField
                label="First Name"
                id="mother-first-name"
                value={motherFirstName}
                onChange={(e) => setMotherFirstName(e.target.value)}
              />
              <InputField
                label="Middle Name"
                id="mother-middle-name"
                value={motherMiddleName}
                onChange={(e) => setMotherMiddleName(e.target.value)}
              />
              <InputField
                label="Last Name"
                id="mother-last-name"
                value={motherLastName}
                onChange={(e) => setMotherLastName(e.target.value)}
              />
            </div>

            <SectionHeader title="Birthplace" />
            <div className="grid grid-cols-3 gap-4">
              <InputField
                label="Region"
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
              <InputField
                label="Zone"
                id="zone"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
              />
              <InputField
                label="Woreda"
                id="woreda"
                value={woreda}
                onChange={(e) => setWoreda(e.target.value)}
              />
            </div>

            <InputField
              label="Phone Number"
              id="phone-number"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <SectionHeader title="Additional Birth Details" />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Birth Weight"
                id="birth-weight"
                value={birthWeight}
                onChange={(e) => setBirthWeight(e.target.value)}
              />
              <InputField
                label="Date of Birth"
                id="date-of-birth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
          </>
        )}

        {/* for Death */}
        {eventType === "death" && (
          <>
            <SectionHeader title="Death Details" />

            <div className="grid grid-cols-3 gap-4">
              <InputField
                label="First Name"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <InputField
                label="Middle Name"
                id="middle-name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
              <InputField
                label="Last Name"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <SelectField
              label="Gender"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />

            <InputField
              label="Cause of Death"
              id="cause-of-death"
              value={causeOfDeath}
              onChange={(e) => setCauseOfDeath(e.target.value)}
            />

            <SectionHeader title="Physician Information" />
            <div className="grid grid-cols-3 gap-4">
              <InputField
                label="First Name"
                id="declared-first-name"
                value={declaredFirstName}
                onChange={(e) => setDeclaredFirstName(e.target.value)}
              />
              <InputField
                label="Middle Name"
                id="declared-middle-name"
                value={declaredMiddleName}
                onChange={(e) => setDeclaredMiddleName(e.target.value)}
              />
              <InputField
                label="Last Name"
                id="declared-last-name"
                value={declaredLastName}
                onChange={(e) => setDeclaredLastName(e.target.value)}
              />
            </div>

            <SectionHeader title="Place of Death" />
            <div className="grid grid-cols-3 gap-4">
              <InputField
                label="Region"
                id="death-region"
                value={deathRegion}
                onChange={(e) => setDeathRegion(e.target.value)}
              />
              <InputField
                label="Zone"
                id="death-zone"
                value={deathZone}
                onChange={(e) => setDeathZone(e.target.value)}
              />
              <InputField
                label="Woreda"
                id="death-woreda"
                value={deathWoreda}
                onChange={(e) => setDeathWoreda(e.target.value)}
              />
            </div>
            <InputField
              label="Specific Place (e.g., Home, Hospital)"
              id="death-specific-place"
              value={deathSpecificPlace}
              onChange={(e) => setDeathSpecificPlace(e.target.value)}
            />

            <InputField
              label="Date of Death"
              id="date-of-death"
              type="date"
              value={dateOfDeath}
              onChange={(e) => setDateOfDeath(e.target.value)}
            />
          </>
        )}

        {/* for marriage */}
        {eventType === "marriage" && (
          <>
            <SectionHeader title="Marriage Details" />

            {/* Male Spouse Details */}
            <SectionHeader title="Male Spouse Details" />
            <div className="grid grid-cols-3 gap-4">
              <InputField
                label="First Name"
                id="male-first-name"
                value={maleSpouseName.firstName}
                onChange={(e) =>
                  setMaleSpouseName({
                    ...maleSpouseName,
                    firstName: e.target.value,
                  })
                }
              />
              <InputField
                label="Middle Name"
                id="male-middle-name"
                value={maleSpouseName.middleName}
                onChange={(e) =>
                  setMaleSpouseName({
                    ...maleSpouseName,
                    middleName: e.target.value,
                  })
                }
              />
              <InputField
                label="Last Name"
                id="male-last-name"
                value={maleSpouseName.lastName}
                onChange={(e) =>
                  setMaleSpouseName({
                    ...maleSpouseName,
                    lastName: e.target.value,
                  })
                }
              />
            </div>

            {/* Female Spouse Details */}
            <SectionHeader title="Female Spouse Details" />
            <div className="grid grid-cols-3 gap-4">
              <InputField
                label="First Name"
                id="female-first-name"
                value={femaleSpouseName.firstName}
                onChange={(e) =>
                  setFemaleSpouseName({
                    ...femaleSpouseName,
                    firstName: e.target.value,
                  })
                }
              />
              <InputField
                label="Middle Name"
                id="female-middle-name"
                value={femaleSpouseName.middleName}
                onChange={(e) =>
                  setFemaleSpouseName({
                    ...femaleSpouseName,
                    middleName: e.target.value,
                  })
                }
              />
              <InputField
                label="Last Name"
                id="female-last-name"
                value={femaleSpouseName.lastName}
                onChange={(e) =>
                  setFemaleSpouseName({
                    ...femaleSpouseName,
                    lastName: e.target.value,
                  })
                }
              />
            </div>

            {/* Witnesses' Details */}
            <SectionHeader title="Witnesses' Information" />
            {[1, 2].map((witness, index) => (
              <div key={index} className="grid grid-cols-3 gap-4">
                <InputField
                  label={`Witness ${witness} First Name`}
                  id={`witness-${witness}-first-name`}
                  value={witnesses[index]?.firstName || ""}
                  onChange={(e) =>
                    updateWitness(index, "firstName", e.target.value)
                  }
                />
                <InputField
                  label={`Witness ${witness} Middle Name`}
                  id={`witness-${witness}-middle-name`}
                  value={witnesses[index]?.middleName || ""}
                  onChange={(e) =>
                    updateWitness(index, "middleName", e.target.value)
                  }
                />
                <InputField
                  label={`Witness ${witness} Last Name`}
                  id={`witness-${witness}-last-name`}
                  value={witnesses[index]?.lastName || ""}
                  onChange={(e) =>
                    updateWitness(index, "lastName", e.target.value)
                  }
                />
              </div>
            ))}

            {/* Date of Marriage */}
            <InputField
              label="Date of Marriage"
              id="date-of-marriage"
              type="date"
              value={dateOfMarriage}
              onChange={(e) => setDateOfMarriage(e.target.value)}
            />
          </>
        )}

        {/* for divorce */}
        {eventType === "divorce" && (
          <>
            <SectionHeader title="Divorce Details" />

            {/* Male Spouse Details */}
            <SectionHeader title="Male Spouse Details" />
            <div className="grid grid-cols-3 gap-4">
              <InputField
                label="First Name"
                id="male-first-name"
                value={maleSpouseName.firstName}
                onChange={(e) =>
                  setMaleSpouseName({
                    ...maleSpouseName,
                    firstName: e.target.value,
                  })
                }
              />
              <InputField
                label="Middle Name"
                id="male-middle-name"
                value={maleSpouseName.middleName}
                onChange={(e) =>
                  setMaleSpouseName({
                    ...maleSpouseName,
                    middleName: e.target.value,
                  })
                }
              />
              <InputField
                label="Last Name"
                id="male-last-name"
                value={maleSpouseName.lastName}
                onChange={(e) =>
                  setMaleSpouseName({
                    ...maleSpouseName,
                    lastName: e.target.value,
                  })
                }
              />
            </div>

            {/* Female Spouse Details */}
            <SectionHeader title="Female Spouse Details" />
            <div className="grid grid-cols-3 gap-4">
              <InputField
                label="First Name"
                id="female-first-name"
                value={femaleSpouseName.firstName}
                onChange={(e) =>
                  setFemaleSpouseName({
                    ...femaleSpouseName,
                    firstName: e.target.value,
                  })
                }
              />
              <InputField
                label="Middle Name"
                id="female-middle-name"
                value={femaleSpouseName.middleName}
                onChange={(e) =>
                  setFemaleSpouseName({
                    ...femaleSpouseName,
                    middleName: e.target.value,
                  })
                }
              />
              <InputField
                label="Last Name"
                id="female-last-name"
                value={femaleSpouseName.lastName}
                onChange={(e) =>
                  setFemaleSpouseName({
                    ...femaleSpouseName,
                    lastName: e.target.value,
                  })
                }
              />
            </div>

            {/* Court Name */}
            <InputField
              label="Court Name"
              id="court-name"
              value={courtName}
              onChange={(e) => setCourtName(e.target.value)}
            />

            {/* Date of Divorce */}
            <InputField
              label="Date of Divorce"
              id="date-of-divorce"
              type="date"
              value={dateOfDivorce}
              onChange={(e) => setDateOfDivorce(e.target.value)}
            />
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
