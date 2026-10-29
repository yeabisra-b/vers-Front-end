import { useCallback, useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import EventList, { StatusBadge } from "../components/EventList";
import Notice from "../components/Notice";
import SectionHeader from "../components/SectionHeader";
import { api } from "../lib/api";
import { EVENT_TYPES, STATUSES, describeEvent, labelFor } from "../lib/events";
import { useSession } from "../lib/session";

export default function ReviewEventsPage() {
  const session = useSession(["OFFICIAL", "ADMIN"]);
  const [filters, setFilters] = useState({ status: "PENDING", type: "", name: "" });
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = useCallback(async (query) => {
    try {
      setEvents(await api("/official/events", { query }));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    if (session) load({ status: "PENDING" });
  }, [session, load]);

  if (!session) return null;

  const handleFilter = (e) => {
    e.preventDefault();
    setSelectedEvent(null);
    setError("");
    setSuccess("");
    load(filters);
  };

  const select = (event) => {
    setSelectedEvent(event);
    setRejectReason("");
    setError("");
    setSuccess("");
  };

  const review = async (action) => {
    setError("");
    setSuccess("");
    try {
      const updated = await api(`/official/events/${selectedEvent.id}/${action}`, {
        method: "POST",
        body: action === "reject" ? { reason: rejectReason } : undefined,
      });
      // Drop it from the list if it no longer matches the status filter
      setEvents((prev) =>
        prev
          .map((ev) => (ev.id === updated.id ? updated : ev))
          .filter((ev) => !filters.status || ev.status === filters.status)
      );
      setSelectedEvent(null);
      setSuccess(`${updated.name} was ${updated.status.toLowerCase()}.`);
    } catch (err) {
      setError(err.message);
    }
  };

  const ownEvent = selectedEvent?.registrar === session.username;

  return (
    <AppLayout session={session} title="Review Events">
      <Notice error={error} success={success} />

      <form onSubmit={handleFilter} className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
        <div>
          <label htmlFor="filter-status" className="block text-lg font-medium text-black">
            Status
          </label>
          <select
            id="filter-status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full p-3 border rounded-lg text-black"
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter-type" className="block text-lg font-medium text-black">
            Event Type
          </label>
          <select
            id="filter-type"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="w-full p-3 border rounded-lg text-black"
          >
            <option value="">All types</option>
            {EVENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter-name" className="block text-lg font-medium text-black">
            Name
          </label>
          <input
            id="filter-name"
            type="text"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="w-full p-3 border rounded-lg text-black"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
          Filter
        </button>
      </form>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div>
          <SectionHeader title="Events" />
          <EventList events={events} selectedId={selectedEvent?.id} onSelect={select} />
        </div>

        {selectedEvent && (
          <div className="p-6 bg-white rounded-lg shadow space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-black m-0">
                {labelFor(EVENT_TYPES, selectedEvent.type)} #{selectedEvent.id}
              </h2>
              <StatusBadge status={selectedEvent.status} />
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
              {describeEvent(selectedEvent).map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-sm text-gray-500">{label}</dt>
                  <dd className="text-black m-0">{value}</dd>
                </div>
              ))}
              <div>
                <dt className="text-sm text-gray-500">Registered</dt>
                <dd className="text-black m-0">
                  {selectedEvent.dateOfRegistration} by {selectedEvent.registrar}
                </dd>
              </div>
              {selectedEvent.reviewedBy && (
                <div>
                  <dt className="text-sm text-gray-500">Reviewed</dt>
                  <dd className="text-black m-0">
                    {selectedEvent.reviewedAt.slice(0, 10)} by {selectedEvent.reviewedBy}
                  </dd>
                </div>
              )}
              {selectedEvent.rejectionReason && (
                <div className="col-span-2">
                  <dt className="text-sm text-gray-500">Rejection Reason</dt>
                  <dd className="text-black m-0">{selectedEvent.rejectionReason}</dd>
                </div>
              )}
            </dl>

            {selectedEvent.status === "PENDING" && ownEvent && (
              <p className="text-gray-700">
                You registered this event, so someone else has to review it.
              </p>
            )}
            {selectedEvent.status === "PENDING" && !ownEvent && (
              <div className="space-y-3 pt-4 border-t">
                <button
                  onClick={() => review("approve")}
                  className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                >
                  Approve
                </button>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Reason for rejection (required to reject)"
                  className="w-full p-3 border rounded-lg text-black"
                  rows={2}
                />
                <button
                  onClick={() => review("reject")}
                  disabled={!rejectReason.trim()}
                  className="w-full p-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
