import React, { useState, useEffect } from "react";
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

  // Fetch events from local storage
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];

    // Filter events to include only 'marriage' or 'divorce'
    const filteredEvents = storedEvents.filter(
      (event) => event.eventType === "marriage" || event.eventType === "divorce"
    );

    console.log(filteredEvents);

    setEvents(filteredEvents); // Set only marriage or divorce events
  }, []);

  // Handle search
  const handleSearch = () => {
    const searchResults = events.filter(
      (event) =>
        event.eventType === searchEventType &&
        (event.maleSpouseFirstName
          .toLowerCase()
          .includes(searchFirstName.toLowerCase()) ||
          event.femaleSpouseFirstName
            .toLowerCase()
            .includes(searchFirstName.toLowerCase()))
    );
    setEvents(searchResults); // Set filtered events as search results
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setEventType(event.eventType);

    if (event.eventType === "marriage") {
      setMarriageMaleFirstName(event.maleSpouseName.firstName);
      setMarriageMaleMiddleName(event.maleSpouseName.middleName);
      setMarriageMaleLastName(event.maleSpouseName.lastName);
      setMarriageFemaleFirstName(event.femaleSpouseName.firstName);
      setMarriageFemaleMiddleName(event.femaleSpouseName.middleName);
      setMarriageFemaleLastName(event.femaleSpouseName.lastName);
      setMarriageWitness1FirstName(event.witnesses[0].firstName);
      setMarriageWitness1MiddleName(event.witnesses[0].middleName);
      setMarriageWitness1LastName(event.witnesses[0].lastName);
      setMarriageWitness2FirstName(event.witnesses[1].firstName);
      setMarriageWitness2MiddleName(event.witnesses[1].middleName);
      setMarriageWitness2LastName(event.witnesses[1].lastName);
      setMarriageDate(event.dateOfMarriage);
    } else if (event.eventType === "divorce") {
      setDivorceMaleFirstName(event.maleSpouseName.firstName);
      setDivorceMaleMiddleName(event.maleSpouseName.middleName);
      setDivorceMaleLastName(event.maleSpouseName.lastName);
      setDivorceFemaleFirstName(event.femaleSpouseName.firstName);
      setDivorceFemaleMiddleName(event.femaleSpouseName.middleName);
      setDivorceFemaleLastName(event.femaleSpouseName.lastName);
      setDivorceCourtName(event.courtName);
      setDivorceDate(event.dateOfDivorce);
    }
  };

  const handleUpdate = () => {
    let updatedEvents = [...events];
    
    if (eventType === "marriage") {
      updatedEvents = updatedEvents.map((event) =>
        event.id === selectedEvent.id
          ? {
              ...event,
              maleSpouseName: {
                firstName: marriageMaleFirstName,
                middleName: marriageMaleMiddleName,
                lastName: marriageMaleLastName,
              },
              femaleSpouseName: {
                firstName: marriageFemaleFirstName,
                middleName: marriageFemaleMiddleName,
                lastName: marriageFemaleLastName,
              },
              witnesses: [
                {
                  firstName: marriageWitness1FirstName,
                  middleName: marriageWitness1MiddleName,
                  lastName: marriageWitness1LastName,
                },
                {
                  firstName: marriageWitness2FirstName,
                  middleName: marriageWitness2MiddleName,
                  lastName: marriageWitness2LastName,
                },
              ],
              dateOfMarriage: marriageDate,
              eventType: "marriage",
            }
          : event
      );
    } else if (eventType === "divorce") {
      updatedEvents = updatedEvents.map((event) =>
        event.id === selectedEvent.id
          ? {
              ...event,
              maleSpouseName: {
                firstName: divorceMaleFirstName,
                middleName: divorceMaleMiddleName,
                lastName: divorceMaleLastName,
              },
              femaleSpouseName: {
                firstName: divorceFemaleFirstName,
                middleName: divorceFemaleMiddleName,
                lastName: divorceFemaleLastName,
              },
              courtName: divorceCourtName,
              dateOfDivorce: divorceDate,
              eventType: "divorce",
            }
          : event
      );
    }
    
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents)); // Save updated events back to local storage
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
                {event.eventType === "marriage" ? (
                    <p className="text-lg font-medium text-black">
                      {event.maleSpouseName.firstName} {event.maleSpouseName.middleName}{" "}
                      {event.maleSpouseName.lastName} & {event.femaleSpouseName.firstName}{" "}
                      {event.femaleSpouseName.middleName} {event.femaleSpouseName.lastName}
                    </p>
                ) : (
                    <p className="text-lg font-medium text-black">
                      {event.maleSpouseName.firstName} {event.maleSpouseName.middleName}{" "}
                      {event.maleSpouseName.lastName} & {event.femaleSpouseName.firstName}{" "}
                      {event.femaleSpouseName.middleName} {event.femaleSpouseName.lastName}
                    </p>
                )}

                <p className="text-gray-700">Event Type: {event.eventType}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Event Details */}
      {selectedEvent && (
        <div>
          <SectionHeader title="Event Details" />
          <form className="space-y-6">
            {eventType === "marriage" && (
              <div>
                <InputField
                  label="Male First Name"
                  value={marriageMaleFirstName}
                  onChange={(e) => setMarriageMaleFirstName(e.target.value)}
                />
                <InputField
                  label="Male Middle Name"
                  value={marriageMaleMiddleName}
                  onChange={(e) => setMarriageMaleMiddleName(e.target.value)}
                />
                <InputField
                  label="Male Last Name"
                  value={marriageMaleLastName}
                  onChange={(e) => setMarriageMaleLastName(e.target.value)}
                />
                <InputField
                  label="Female First Name"
                  value={marriageFemaleFirstName}
                  onChange={(e) => setMarriageFemaleFirstName(e.target.value)}
                />
                <InputField
                  label="Female Middle Name"
                  value={marriageFemaleMiddleName}
                  onChange={(e) => setMarriageFemaleMiddleName(e.target.value)}
                />
                <InputField
                  label="Female Last Name"
                  value={marriageFemaleLastName}
                  onChange={(e) => setMarriageFemaleLastName(e.target.value)}
                />
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
                <InputField
                  label="Marriage Date"
                  value={marriageDate}
                  onChange={(e) => setMarriageDate(e.target.value)}
                />
              </div>
            )}
            {eventType === "divorce" && (
              <div>
                <InputField
                  label="Male First Name"
                  value={divorceMaleFirstName}
                  onChange={(e) => setDivorceMaleFirstName(e.target.value)}
                />
                <InputField
                  label="Male Middle Name"
                  value={divorceMaleMiddleName}
                  onChange={(e) => setDivorceMaleMiddleName(e.target.value)}
                />
                <InputField
                  label="Male Last Name"
                  value={divorceMaleLastName}
                  onChange={(e) => setDivorceMaleLastName(e.target.value)}
                />
                <InputField
                  label="Female First Name"
                  value={divorceFemaleFirstName}
                  onChange={(e) => setDivorceFemaleFirstName(e.target.value)}
                />
                <InputField
                  label="Female Middle Name"
                  value={divorceFemaleMiddleName}
                  onChange={(e) => setDivorceFemaleMiddleName(e.target.value)}
                />
                <InputField
                  label="Female Last Name"
                  value={divorceFemaleLastName}
                  onChange={(e) => setDivorceFemaleLastName(e.target.value)}
                />
                <InputField
                  label="Court Name"
                  value={divorceCourtName}
                  onChange={(e) => setDivorceCourtName(e.target.value)}
                />
                <InputField
                  label="Divorce Date"
                  value={divorceDate}
                  onChange={(e) => setDivorceDate(e.target.value)}
                />
              </div>
            )}
          </form>
          <button
            onClick={handleUpdate}
            className="mt-6 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
          >
            Update Event
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateMarriageDivorcePage;
