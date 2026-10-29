import { useState } from "react";
import AppLayout from "../components/AppLayout";
import EventForm from "../components/EventForm";
import Notice from "../components/Notice";
import { api } from "../lib/api";
import { EVENT_TYPES, emptyValues, labelFor, toRequest } from "../lib/events";
import { useSession } from "../lib/session";

export default function RegisterEventPage() {
  const session = useSession(["REGISTRAR", "ADMIN"]);
  const [eventType, setEventType] = useState("BIRTH");
  const [values, setValues] = useState(emptyValues("BIRTH"));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  if (!session) return null;

  const changeType = (type) => {
    setEventType(type);
    setValues(emptyValues(type));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const event = await api("/registrar/register-event", {
        method: "POST",
        body: toRequest(eventType, values),
      });
      setSuccess(
        `${labelFor(EVENT_TYPES, event.type)} of ${event.name} registered (#${event.id}). It is pending review.`
      );
      setValues(emptyValues(eventType));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AppLayout session={session} title="Register Vital Event">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl space-y-6 p-6 rounded-lg shadow-lg bg-white"
      >
        <Notice error={error} success={success} />

        <div>
          <label htmlFor="event-type" className="block text-xl font-semibold text-gray-800">
            Event Type
          </label>
          <select
            id="event-type"
            value={eventType}
            onChange={(e) => changeType(e.target.value)}
            className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-green-500 text-black"
          >
            {EVENT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <EventForm
          type={eventType}
          values={values}
          onChange={(name, value) => setValues((prev) => ({ ...prev, [name]: value }))}
        />

        <button
          type="submit"
          disabled={saving}
          className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-60"
        >
          {saving ? "Registering..." : "Register Event"}
        </button>
      </form>
    </AppLayout>
  );
}
