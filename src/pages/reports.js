import { useState } from "react";
import SelectField from "../components/SelectField";

export default function GenerateReportsPage() {
  const [filters, setFilters] = useState({
    gender: "",
    maritalStatus: "",
    ageRange: "",
    registrationYear: "",
  });

  const [reportResults, setReportResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    // Automatically generate the report when filters are updated
    handleGenerateReport(updatedFilters);
  };

  const handleGenerateReport = async (currentFilters = filters) => {
    // Simulating an API call with dummy data
    const simulatedResponse = {
      totalWomen: 1200,
      totalMen: 1300,
      totalDivorced: 200,
      totalMarried: 1800,
    };

    // Simulating dynamic filtering logic based on filters
    let filteredData = { ...simulatedResponse };

    if (currentFilters.gender === "female") {
      filteredData = { totalWomen: simulatedResponse.totalWomen };
    }
    if (currentFilters.gender === "male") {
      filteredData = { totalMen: simulatedResponse.totalMen };
    }
    if (currentFilters.maritalStatus === "divorced") {
      filteredData = { totalDivorced: simulatedResponse.totalDivorced };
    }
    if (currentFilters.maritalStatus === "married") {
      filteredData = { totalMarried: simulatedResponse.totalMarried };
    }
    if (currentFilters.registrationYear) {
      filteredData.registrationYear = currentFilters.registrationYear; // Just a placeholder for logic
    }

    setReportResults(filteredData);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Generate Reports</h2>
        <p className="text-gray-700 mb-4">
          Select parameters below to generate specific reports.
        </p>

        {/* Filters Section */}
        <div className="space-y-4">
          {/* Gender Filter */}
          <SelectField
            label="Gender"
            id="gender"
            value={filters.gender}
            onChange={(e) =>
              handleChange({
                target: { name: "gender", value: e.target.value },
              })
            }
            options={[
              { label: "Any", value: "" },
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
          />

          {/* Marital Status Filter */}
          <SelectField
            label="Marital Status"
            id="maritalStatus"
            value={filters.maritalStatus}
            onChange={(e) =>
              handleChange({
                target: { name: "maritalStatus", value: e.target.value },
              })
            }
            options={[
              { label: "Any", value: "" },
              { label: "Single", value: "single" },
              { label: "Married", value: "married" },
              { label: "Divorced", value: "divorced" },
            ]}
          />

          {/* Age Range Filter */}
          <SelectField
            label="Age Range"
            id="ageRange"
            value={filters.ageRange}
            onChange={(e) =>
              handleChange({
                target: { name: "ageRange", value: e.target.value },
              })
            }
            options={[
              { label: "Any", value: "" },
              { label: "0-18", value: "0-18" },
              { label: "18-25", value: "18-25" },
              { label: "26-35", value: "26-35" },
              { label: "36-50", value: "36-50" },
              { label: "51+", value: "51+" },
            ]}
          />

          {/* Registration Year Filter */}
          <SelectField
            label="Registration Year"
            id="registrationYear"
            value={filters.registrationYear || ""}
            onChange={(e) =>
              handleChange({
                target: { name: "registrationYear", value: e.target.value },
              })
            }
            options={[
              { label: "Select Year", value: "" }, // Default option
              ...Array.from({ length: 100 }, (_, i) => {
                const year = new Date().getFullYear() - i; // Generate past 100 years
                return { label: `${year}`, value: `${year}` };
              }),
            ]}
          />
        </div>

        {/* Report Results */}
        {reportResults && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Report Results</h3>
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              {Object.entries(reportResults).map(([key, value]) => (
                <p key={key} className="text-gray-700">
                  <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
                  {value}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
