import React from "react";

/** An error or success banner; renders nothing without a message. */
const Notice = ({ error, success }) => {
  if (error) {
    return <div className="p-4 mb-4 text-red-800 bg-red-100 rounded-lg">{error}</div>;
  }
  if (success) {
    return <div className="p-4 mb-4 text-green-800 bg-green-100 rounded-lg">{success}</div>;
  }
  return null;
};

export default Notice;
