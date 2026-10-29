import { useCallback, useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import Notice from "../components/Notice";
import SectionHeader from "../components/SectionHeader";
import { api } from "../lib/api";
import { EVENT_TYPES, fromEvent, labelFor, toRequest } from "../lib/events";
import { useSession } from "../lib/session";

export default function UpdateEventPage() {
  const session = useSession(["REGISTRAR", "ADMIN"]);
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [values, setValues] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const search = useCallback(async (type, name) => {
    try {
      setEvents(await api("/registrar/events", { query: { type, name } }));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    if (session) search("", "");
  }, [session, search]);

  if (!session) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSelectedEvent(null);
    search(searchType, searchName);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setValues(fromEvent(event));
    setError("");
    setSuccess("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const updated = await api(`/registrar/events/${selectedEvent.id}`, {
        method: "PUT",
        body: toRequest(selectedEvent.type, values),
      });
      setEvents((prev) => prev.map((ev) => (ev.id === updated.id ? updated : ev)));
      setSelectedEvent(null);
      setSuccess(`${updated.name} was updated and is pending review again.`);
    } catch (err) {
      setError(err.message);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AppLayout session={session} title="Update Events">
      <Notice error={error} success={success} />

      <form onSubmit={handleSearch} className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div>
          <label htmlFor="search-name" className="block text-lg font-medium text-black">
            Name
          </label>
          <input
            type="text"
            id="search-name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 text-black"
            placeholder="Child, deceased, or spouse name"
          />
        </div>
        <div>
          <label htmlFor="search-type" className="block text-lg font-medium text-black">
            Event Type
          </label>
          <select
            id="search-type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 text-black"
          >
            <option value="">All types</option>
            {EVENT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div>
          <SectionHeader title="Events" />
          <EventList events={events} selectedId={selectedEvent?.id} onSelect={handleSelectEvent} />
        </div>

        {selectedEvent && (
          <form onSubmit={handleUpdate} className="p-6 bg-white rounded-lg shadow space-y-6">
            <h2 className="text-xl font-semibold text-black">
              Edit {labelFor(EVENT_TYPES, selectedEvent.type)} #{selectedEvent.id}
            </h2>
            {selectedEvent.status === "REJECTED" && (
              <div className="p-4 bg-red-50 text-red-800 rounded-lg">
                Rejected by {selectedEvent.reviewedBy}: {selectedEvent.rejectionReason}
              </div>
            )}
            {selectedEvent.status === "APPROVED" && (
              <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg">
                This event is approved. Saving changes sends it back for review.
              </div>
            )}
            <EventForm
              type={selectedEvent.type}
              values={values}
              onChange={(name, value) => setValues((prev) => ({ ...prev, [name]: value }))}
            />
            <div className="flex gap-4">
              <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="bg-gray-300 text-black p-3 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </AppLayout>
  );
}
