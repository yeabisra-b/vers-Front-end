import React, { useState } from "react";
import InputField from "../components/InputField";
import SectionHeader from "../components/SectionHeader";

const UpdateMarriageDivorcePage = () => {
  // State definitions for search
  const [searchFirstName, setSearchFirstName] = useState(""); // For searching events
  const [searchEventType, setSearchEventType] = useState("marriage"); // Event type for search
  const [events, setEvents] = useState([]); // Store search results
  const [selectedEvent, setSelectedEvent] = useState(null); // Selected event for editing

  // Marriage event details
  const [marriageMaleFirstName, setMarriageMaleFirstName] = useState("");
  const [marriageMaleMiddleName, setMarriageMaleMiddleName] = useState("");
  const [marriageMaleLastName, setMarriageMaleLastName] = useState("");
  const [marriageFemaleFirstName, setMarriageFemaleFirstName] = useState("");
  const [marriageFemaleMiddleName, setMarriageFemaleMiddleName] = useState("");
  const [marriageFemaleLastName, setMarriageFemaleLastName] = useState("");
  const [marriageWitness1FirstName, setMarriageWitness1FirstName] =
    useState("");
  const [marriageWitness1MiddleName, setMarriageWitness1MiddleName] =
    useState("");
  const [marriageWitness1LastName, setMarriageWitness1LastName] = useState("");
  const [marriageWitness2FirstName, setMarriageWitness2FirstName] =
    useState("");
  const [marriageWitness2MiddleName, setMarriageWitness2MiddleName] =
    useState("");
  const [marriageWitness2LastName, setMarriageWitness2LastName] = useState("");
  const [marriageDate, setMarriageDate] = useState("");

  // Divorce event details
  const [divorceMaleFirstName, setDivorceMaleFirstName] = useState("");
  const [divorceMaleMiddleName, setDivorceMaleMiddleName] = useState("");
  const [divorceMaleLastName, setDivorceMaleLastName] = useState("");
  const [divorceFemaleFirstName, setDivorceFemaleFirstName] = useState("");
  const [divorceFemaleMiddleName, setDivorceFemaleMiddleName] = useState("");
  const [divorceFemaleLastName, setDivorceFemaleLastName] = useState("");
  const [divorceCourtName, setDivorceCourtName] = useState("");
  const [divorceDate, setDivorceDate] = useState("");

  const [eventType, setEventType] = useState("marriage");

  // Handle search
  const handleSearch = () => {
    const mockResults = [
      {
        id: 1,
        maleSpouseFirstName: "John",
        maleSpouseMiddleName: "Michael",
        maleSpouseLastName: "Doe",
        femaleSpouseFirstName: "Jane",
        femaleSpouseMiddleName: "Ann",
        femaleSpouseLastName: "Doe",
        witness1FirstName: "Tom",
        witness1MiddleName: "William",
        witness1LastName: "Smith",
        witness2FirstName: "Lucy",
        witness2MiddleName: "Marie",
        witness2LastName: "Johnson",
        date: "2025-01-01",
        eventType: "marriage",
      },
      {
        id: 2,
        maleSpouseFirstName: "Robert",
        maleSpouseMiddleName: "James",
        maleSpouseLastName: "Brown",
        femaleSpouseFirstName: "Emily",
        femaleSpouseMiddleName: "Rose",
        femaleSpouseLastName: "White",
        courtName: "City Court",
        date: "2024-12-20",
        eventType: "divorce",
      },
    ].filter(
      (event) =>
        event.eventType === searchEventType &&
        (event.maleSpouseFirstName
          .toLowerCase()
          .includes(searchFirstName.toLowerCase()) ||
          event.femaleSpouseFirstName
            .toLowerCase()
            .includes(searchFirstName.toLowerCase()))
    );

    setEvents(mockResults); // Set mock data as search results
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setEventType(event.eventType);

    if (event.eventType === "marriage") {
      setMarriageMaleFirstName(event.maleSpouseFirstName);
      setMarriageMaleMiddleName(event.maleSpouseMiddleName);
      setMarriageMaleLastName(event.maleSpouseLastName);
      setMarriageFemaleFirstName(event.femaleSpouseFirstName);
      setMarriageFemaleMiddleName(event.femaleSpouseMiddleName);
      setMarriageFemaleLastName(event.femaleSpouseLastName);
      setMarriageWitness1FirstName(event.witness1FirstName);
      setMarriageWitness1MiddleName(event.witness1MiddleName);
      setMarriageWitness1LastName(event.witness1LastName);
      setMarriageWitness2FirstName(event.witness2FirstName);
      setMarriageWitness2MiddleName(event.witness2MiddleName);
      setMarriageWitness2LastName(event.witness2LastName);
      setMarriageDate(event.date);
    } else if (event.eventType === "divorce") {
      setDivorceMaleFirstName(event.maleSpouseFirstName);
      setDivorceMaleMiddleName(event.maleSpouseMiddleName);
      setDivorceMaleLastName(event.maleSpouseLastName);
      setDivorceFemaleFirstName(event.femaleSpouseFirstName);
      setDivorceFemaleMiddleName(event.femaleSpouseMiddleName);
      setDivorceFemaleLastName(event.femaleSpouseLastName);
      setDivorceCourtName(event.courtName);
      setDivorceDate(event.date);
    }
  };

  const handleUpdate = () => {
    if (eventType === "marriage") {
      console.log("Updated Marriage Event:", {
        maleSpouse: {
          firstName: marriageMaleFirstName,
          middleName: marriageMaleMiddleName,
          lastName: marriageMaleLastName,
        },
        femaleSpouse: {
          firstName: marriageFemaleFirstName,
          middleName: marriageFemaleMiddleName,
          lastName: marriageFemaleLastName,
        },
        witness1: {
          firstName: marriageWitness1FirstName,
          middleName: marriageWitness1MiddleName,
          lastName: marriageWitness1LastName,
        },
        witness2: {
          firstName: marriageWitness2FirstName,
          middleName: marriageWitness2MiddleName,
          lastName: marriageWitness2LastName,
        },
        date: marriageDate,
      });
    } else if (eventType === "divorce") {
      console.log("Updated Divorce Event:", {
        maleSpouse: {
          firstName: divorceMaleFirstName,
          middleName: divorceMaleMiddleName,
          lastName: divorceMaleLastName,
        },
        femaleSpouse: {
          firstName: divorceFemaleFirstName,
          middleName: divorceFemaleMiddleName,
          lastName: divorceFemaleLastName,
        },
        courtName: divorceCourtName,
        date: divorceDate,
      });
    }
    alert("Event updated successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-black mb-4">
        Update Marriage or Divorce Event
      </h1>

      {/* Search Section */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-black">
          Search by Spouse First Name
        </label>
        <input
          type="text"
          value={searchFirstName}
          onChange={(e) => setSearchFirstName(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 text-black"
          placeholder="Enter First Name"
        />
        <label className="block text-lg font-medium text-black mt-4">
          Event Type
        </label>
        <select
          value={searchEventType}
          onChange={(e) => setSearchEventType(e.target.value)}
          className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-green-500 text-black"
        >
          <option value="marriage">Marriage</option>
          <option value="divorce">Divorce</option>
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
                <p className="text-lg font-medium text-black">
                  {event.maleSpouseFirstName} {event.maleSpouseMiddleName}{" "}
                  {event.maleSpouseLastName} & {event.femaleSpouseFirstName}{" "}
                  {event.femaleSpouseMiddleName} {event.femaleSpouseLastName}
                </p>
                <p className="text-gray-700">Event Type: {event.eventType}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Marriage Details */}
      {selectedEvent && eventType === "marriage" && (
        <>
          <SectionHeader title="Marriage Details" />

          <div className="grid grid-cols-3 gap-4">
            <InputField
              label="Male Spouse First Name"
              value={marriageMaleFirstName}
              onChange={(e) => setMarriageMaleFirstName(e.target.value)}
            />
            <InputField
              label="Male Spouse Middle Name"
              value={marriageMaleMiddleName}
              onChange={(e) => setMarriageMaleMiddleName(e.target.value)}
            />
            <InputField
              label="Male Spouse Last Name"
              value={marriageMaleLastName}
              onChange={(e) => setMarriageMaleLastName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <InputField
              label="Female Spouse First Name"
              value={marriageFemaleFirstName}
              onChange={(e) => setMarriageFemaleFirstName(e.target.value)}
            />
            <InputField
              label="Female Spouse Middle Name"
              value={marriageFemaleMiddleName}
              onChange={(e) => setMarriageFemaleMiddleName(e.target.value)}
            />
            <InputField
              label="Female Spouse Last Name"
              value={marriageFemaleLastName}
              onChange={(e) => setMarriageFemaleLastName(e.target.value)}
            />
          </div>

          <SectionHeader title="Witnesses" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <InputField
              label="Witness 1 First Name"
              value={marriageWitness1FirstName}
              onChange={(e) => setMarriageWitness1FirstName(e.target.value)}
            />
            <InputField
              label="Witness 1 Middle Name"
              value={marriageWitness1MiddleName}
              onChange={(e) => setMarriageWitness1MiddleName(e.target.value)}
            />
            <InputField
              label="Witness 1 Last Name"
              value={marriageWitness1LastName}
              onChange={(e) => setMarriageWitness1LastName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <InputField
              label="Witness 2 First Name"
              value={marriageWitness2FirstName}
              onChange={(e) => setMarriageWitness2FirstName(e.target.value)}
            />
            <InputField
              label="Witness 2 Middle Name"
              value={marriageWitness2MiddleName}
              onChange={(e) => setMarriageWitness2MiddleName(e.target.value)}
            />
            <InputField
              label="Witness 2 Last Name"
              value={marriageWitness2LastName}
              onChange={(e) => setMarriageWitness2LastName(e.target.value)}
            />
          </div>

          <InputField
            label="Date of Marriage"
            type="date"
            value={marriageDate}
            onChange={(e) => setMarriageDate(e.target.value)}
          />

          <button
            onClick={handleUpdate}
            className="mt-6 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Update Event
          </button>
        </>
      )}

      {/* Divorce Details */}
      {selectedEvent && eventType === "divorce" && (
        <>
          <SectionHeader title="Divorce Details" />

          <div className="grid grid-cols-3 gap-4">
            <InputField
              label="Male Spouse First Name"
              id="divorce-male-first-name"
              value={divorceMaleFirstName}
              onChange={(e) => setDivorceMaleFirstName(e.target.value)}
            />
            <InputField
              label="Male Spouse Middle Name"
              id="divorce-male-middle-name"
              value={divorceMaleMiddleName}
              onChange={(e) => setDivorceMaleMiddleName(e.target.value)}
            />
            <InputField
              label="Male Spouse Last Name"
              id="divorce-male-last-name"
              value={divorceMaleLastName}
              onChange={(e) => setDivorceMaleLastName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <InputField
              label="Female Spouse First Name"
              id="divorce-female-first-name"
              value={divorceFemaleFirstName}
              onChange={(e) => setDivorceFemaleFirstName(e.target.value)}
            />
            <InputField
              label="Female Spouse Middle Name"
              id="divorce-female-middle-name"
              value={divorceFemaleMiddleName}
              onChange={(e) => setDivorceFemaleMiddleName(e.target.value)}
            />
            <InputField
              label="Female Spouse Last Name"
              id="divorce-female-last-name"
              value={divorceFemaleLastName}
              onChange={(e) => setDivorceFemaleLastName(e.target.value)}
            />
          </div>

          <InputField
            label="Court Name"
            id="divorce-court-name"
            value={divorceCourtName}
            onChange={(e) => setDivorceCourtName(e.target.value)}
          />

          <InputField
            label="Date of Divorce"
            id="divorce-date"
            type="date"
            value={divorceDate}
            onChange={(e) => setDivorceDate(e.target.value)}
          />

          <button
            onClick={handleUpdate}
            className="mt-6 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Update Event
          </button>
        </>
      )}
    </div>
  );
};

export default UpdateMarriageDivorcePage;
