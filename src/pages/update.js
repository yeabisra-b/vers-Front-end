import React, { useState } from "react";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import SectionHeader from "../components/SectionHeader";

const UpdateEventPage = () => {
  // State definitions for search
  const [searchFirstName, setSearchFirstName] = useState(""); // For searching events
  const [searchEventType, setSearchEventType] = useState("birth"); // For searching by event type
  const [events, setEvents] = useState([]); // To store search results
  const [selectedEvent, setSelectedEvent] = useState(null); // Selected event for editing

  // Birth event details
  // -------------------
  const [birthFirstName, setBirthFirstName] = useState("");
  const [birthMiddleName, setBirthMiddleName] = useState("");
  const [birthLastName, setBirthLastName] = useState("");
  const [birthGender, setBirthGender] = useState("");
  const [birthMotherFirstName, setBirthMotherFirstName] = useState("");
  const [birthMotherMiddleName, setBirthMotherMiddleName] = useState("");
  const [birthMotherLastName, setBirthMotherLastName] = useState("");
  const [birthRegion, setBirthRegion] = useState("");
  const [birthZone, setBirthZone] = useState("");
  const [birthWoreda, setBirthWoreda] = useState("");
  const [birthPhoneNumber, setBirthPhoneNumber] = useState("");
  const [birthWeight, setBirthWeight] = useState("");
  const [birthDateOfBirth, setBirthDateOfBirth] = useState("");

  // Death event details
  // -------------------
  const [deathFirstName, setDeathFirstName] = useState("");
  const [deathMiddleName, setDeathMiddleName] = useState("");
  const [deathLastName, setDeathLastName] = useState("");
  const [deathGender, setDeathGender] = useState("");
  const [deathCauseOfDeath, setDeathCauseOfDeath] = useState("");
  const [deathPhysicianFirstName, setDeathPhysicianFirstName] = useState("");
  const [deathPhysicianMiddleName, setDeathPhysicianMiddleName] = useState("");
  const [deathPhysicianLastName, setDeathPhysicianLastName] = useState("");
  const [deathRegion, setDeathRegion] = useState("");
  const [deathZone, setDeathZone] = useState("");
  const [deathWoreda, setDeathWoreda] = useState("");
  const [deathDateOfDeath, setDeathDateOfDeath] = useState("");

  // Event type (e.g., "birth", "death", etc.)
  const [eventType, setEventType] = useState("birth");
  // Handle search
  const handleSearch = () => {
    // Example search logic: Simulate API call to fetch events by first name and type
    const mockResults = [
      {
        id: 1,
        firstName: "John",
        middleName: "Michael",
        lastName: "Doe",
        gender: "male",
        motherFirstName: "Jane",
        motherMiddleName: "Ann",
        motherLastName: "Doe",
        region: "Region 1",
        zone: "Zone A",
        woreda: "Woreda 3",
        phoneNumber: "123-456-7890",
        birthWeight: "3.5kg",
        dateOfBirth: "2025-01-01",
        eventType: "birth",
      },
      {
        id: 2,
        firstName: "Emily",
        middleName: "Rose",
        lastName: "Smith",
        gender: "female",
        causeOfDeath: "Heart Attack",
        physicianFirstName: "Dr. Alan",
        physicianMiddleName: "Patrick",
        physicianLastName: "Johnson",
        region: "Region 2",
        zone: "Zone B",
        woreda: "Woreda 5",
        dateOfDeath: "2024-12-20",
        eventType: "death",
      },
      {
        id: 3,
        firstName: "Robert",
        middleName: "James",
        lastName: "Brown",
        gender: "male",
        causeOfDeath: "Car Accident",
        physicianFirstName: "Dr. Sarah",
        physicianMiddleName: "Elizabeth",
        physicianLastName: "Taylor",
        region: "Region 3",
        zone: "Zone C",
        woreda: "Woreda 7",
        dateOfDeath: "2023-06-15",
        eventType: "death",
      },
    ].filter(
      (event) =>
        event.eventType === searchEventType &&
        event.firstName.toLowerCase().includes(searchFirstName.toLowerCase())
    );
  
    setEvents(mockResults); // Set mock data as search results
  };

  // Handle selecting an event
const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setEventType(event.eventType);
  
    if (event.eventType === "birth") {
      // Populate fields with selected event data for birth
      setBirthFirstName(event.firstName);
      setBirthMiddleName(event.middleName);
      setBirthLastName(event.lastName);
      setBirthGender(event.gender);
      setBirthMotherFirstName(event.motherFirstName);
      setBirthMotherMiddleName(event.motherMiddleName);
      setBirthMotherLastName(event.motherLastName);
      setBirthRegion(event.region);
      setBirthZone(event.zone);
      setBirthWoreda(event.woreda);
      setBirthPhoneNumber(event.phoneNumber);
      setBirthWeight(event.birthWeight);
      setBirthDateOfBirth(event.dateOfBirth);
    } else if (event.eventType === "death") {
      // Populate fields with selected event data for death
      setDeathFirstName(event.firstName);
      setDeathMiddleName(event.middleName);
      setDeathLastName(event.lastName);
      setDeathGender(event.gender);
      setDeathCauseOfDeath(event.causeOfDeath);
      setDeathPhysicianFirstName(event.physicianFirstName);
      setDeathPhysicianMiddleName(event.physicianMiddleName);
      setDeathPhysicianLastName(event.physicianLastName);
      setDeathRegion(event.region);
      setDeathZone(event.zone);
      setDeathWoreda(event.woreda);
      setDeathDateOfDeath(event.dateOfDeath);
    }
  };
  // Handle updating the event
  const handleUpdate = () => {
    if (eventType === "birth") {
      console.log("Updated Birth Event:", {
        firstName: birthFirstName,
        middleName: birthMiddleName,
        lastName: birthLastName,
        gender: birthGender,
        motherFirstName: birthMotherFirstName,
        motherMiddleName: birthMotherMiddleName,
        motherLastName: birthMotherLastName,
        region: birthRegion,
        zone: birthZone,
        woreda: birthWoreda,
        phoneNumber: birthPhoneNumber,
        birthWeight: birthWeight,
        dateOfBirth: birthDateOfBirth,
      });
    } else if (eventType === "death") {
      console.log("Updated Death Event:", {
        firstName: deathFirstName,
        middleName: deathMiddleName,
        lastName: deathLastName,
        gender: deathGender,
        causeOfDeath: deathCauseOfDeath,
        physicianFirstName: deathPhysicianFirstName,
        physicianMiddleName: deathPhysicianMiddleName,
        physicianLastName: deathPhysicianLastName,
        region: deathRegion,
        zone: deathZone,
        woreda: deathWoreda,
        dateOfDeath: deathDateOfDeath,
      });
    }
    alert("Event updated successfully!");
  };
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
    <h1 className="text-2xl font-bold text-black mb-4">Update Event</h1>

    {/* Search Section */}
    <div className="mb-6">
      <label
        htmlFor="search-name"
        className="block text-lg font-medium text-black"
      >
        Search by First Name
      </label>
      <input
        type="text"
        id="search-name"
        value={searchFirstName}
        onChange={(e) => setSearchFirstName(e.target.value)}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 text-black"
        placeholder="Enter First Name"
      />
      <label
        htmlFor="search-event-type"
        className="block text-lg font-medium text-black mt-4"
      >
        Event Type
      </label>
      <select
        id="search-event-type"
        value={searchEventType}
        onChange={(e) => setSearchEventType(e.target.value)}
        className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-green-500 text-black"
      >
        <option value="birth">Birth</option>
        <option value="death">Death</option>
      </select>
      <button
        onClick={handleSearch}
        className="mt-4 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
      >
        Search
      </button>
    </div>

      {/* Search Results */}
      {events.length > 0 && (
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-black">Search Results</h2>
        <ul className="mt-2 space-y-2">
          {events.map((event) => (
            <li
              key={event.id}
              className="p-4 bg-white border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
              onClick={() => handleSelectEvent(event)}
            >
              <div>
                <p className="text-lg font-medium text-black">
                  {event.firstName} {event.middleName} {event.lastName}
                </p>
                {event.eventType === "death" && (
                  <p className="text-gray-700">
                    Cause of Death: {event.causeOfDeath}
                  </p>
                )}
                {event.eventType === "birth" && (
                  <p className="text-gray-700">
                    Birth Weight: {event.birthWeight}
                  </p>
                )}
                <p className="text-gray-700">
                  Event Type: {event.eventType}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}

      {/* Event Details */}
      {selectedEvent && eventType === "birth" && (
        <>
          <SectionHeader title="Birth Details" />

          <div className="grid grid-cols-3 gap-4">
            <InputField
              label="First Name"
              id="birth-first-name"
              value={birthFirstName}
              onChange={(e) => setBirthFirstName(e.target.value)}
              required
            />
            <InputField
              label="Middle Name"
              id="birth-middle-name"
              value={birthMiddleName}
              onChange={(e) => setBirthMiddleName(e.target.value)}
              required
            />
            <InputField
              label="Last Name"
              id="birth-last-name"
              value={birthLastName}
              onChange={(e) => setBirthLastName(e.target.value)}
              required
            />
          </div>

          <SectionHeader title="Mother's Details" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <InputField
              label="Mother's First Name"
              id="birth-mother-first-name"
              value={birthMotherFirstName}
              onChange={(e) => setBirthMotherFirstName(e.target.value)}
            />
            <InputField
              label="Mother's Middle Name"
              id="birth-mother-middle-name"
              value={birthMotherMiddleName}
              onChange={(e) => setBirthMotherMiddleName(e.target.value)}
            />
            <InputField
              label="Mother's Last Name"
              id="birth-mother-last-name"
              value={birthMotherLastName}
              onChange={(e) => setBirthMotherLastName(e.target.value)}
            />
          </div>

          <SectionHeader title="Birthplace" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <SelectField
              label="Gender"
              id="birth-gender"
              value={birthGender}
              onChange={(e) => setBirthGender(e.target.value)}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
            />
            <InputField
              label="Region"
              id="birth-region"
              value={birthRegion}
              onChange={(e) => setBirthRegion(e.target.value)}
            />
            <InputField
              label="Zone"
              id="birth-zone"
              value={birthZone}
              onChange={(e) => setBirthZone(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <InputField
              label="Woreda"
              id="birth-woreda"
              value={birthWoreda}
              onChange={(e) => setBirthWoreda(e.target.value)}
            />
          </div>

          <InputField
            label="Phone Number"
            id="birth-phone-number"
            value={birthPhoneNumber}
            onChange={(e) => setBirthPhoneNumber(e.target.value)}
          />

          <InputField
            label="Birth Weight"
            id="birth-weight"
            value={birthWeight}
            onChange={(e) => setBirthWeight(e.target.value)}
          />

          <InputField
            label="Date of Birth"
            id="birth-date-of-birth"
            type="date"
            value={birthDateOfBirth}
            onChange={(e) => setBirthDateOfBirth(e.target.value)}
          />

          <button
            onClick={handleUpdate}
            className="mt-6 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Update Event
          </button>
        </>
      )}

      {/* Add similar sections for other event types like "death", "marriage", etc. */}
      {selectedEvent && eventType === "death" && (
        <>
          <SectionHeader title="Death Details" />

          <div className="grid grid-cols-3 gap-4">
            <InputField
              label="First Name"
              id="death-first-name"
              value={deathFirstName}
              onChange={(e) => setDeathFirstName(e.target.value)}
              required
            />
            <InputField
              label="Middle Name"
              id="death-middle-name"
              value={deathMiddleName}
              onChange={(e) => setDeathMiddleName(e.target.value)}
            />
            <InputField
              label="Last Name"
              id="death-last-name"
              value={deathLastName}
              onChange={(e) => setDeathLastName(e.target.value)}
              required
            />
          </div>

          <SelectField
            label="Gender"
            id="death-gender"
            value={deathGender}
            onChange={(e) => setDeathGender(e.target.value)}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />

          <InputField
            label="Cause of Death"
            id="death-cause-of-death"
            value={deathCauseOfDeath}
            onChange={(e) => setDeathCauseOfDeath(e.target.value)}
          />

          <SectionHeader title="Physician Details" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <InputField
              label="Physician's First Name"
              id="death-physician-first-name"
              value={deathPhysicianFirstName}
              onChange={(e) => setDeathPhysicianFirstName(e.target.value)}
            />
            <InputField
              label="Physician's Middle Name"
              id="death-physician-middle-name"
              value={deathPhysicianMiddleName}
              onChange={(e) => setDeathPhysicianMiddleName(e.target.value)}
            />
            <InputField
              label="Physician's Last Name"
              id="death-physician-last-name"
              value={deathPhysicianLastName}
              onChange={(e) => setDeathPhysicianLastName(e.target.value)}
            />
          </div>

          <SectionHeader title="Place of Death" />
          <div className="grid grid-cols-3 gap-4 mt-4">
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
              className="text-black"
              value={deathWoreda}
              onChange={(e) => setDeathWoreda(e.target.value)}
            />
          </div>

          <InputField
            label="Date of Death"
            id="death-date-of-death"
            type="date"
            className="text-black"
            value={deathDateOfDeath}
            onChange={(e) => setDeathDateOfDeath(e.target.value)}
          />

          <button
            onClick={handleUpdate}
            className="mt-6 bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
          >
            Update Event
          </button>
        </>
      )}
    </div>
  );
};

export default UpdateEventPage;
