import React from "react";
import { EVENT_TYPES, STATUSES, labelFor } from "../lib/events";

const STATUS_STYLES = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

export const StatusBadge = ({ status }) => (
  <span className={`px-2 py-1 rounded text-sm font-medium ${STATUS_STYLES[status]}`}>
    {labelFor(STATUSES, status)}
  </span>
);

/** Clickable list of events; the selected one is highlighted. */
const EventList = ({ events, selectedId, onSelect }) => {
  if (events.length === 0) {
    return <p className="text-gray-700">No events found.</p>;
  }
  return (
    <ul className="space-y-2 list-none p-0">
      {events.map((event) => (
        <li
          key={event.id}
          onClick={() => onSelect(event)}
          className={`m-0 p-4 bg-white border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 ${
            event.id === selectedId ? "ring-2 ring-blue-500" : ""
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-lg font-medium text-black m-0">{event.name}</p>
              <p className="text-gray-700 text-sm m-0">
                {labelFor(EVENT_TYPES, event.type)} · {event.location.region} · registered{" "}
                {event.dateOfRegistration} by {event.registrar}
              </p>
            </div>
            <StatusBadge status={event.status} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
