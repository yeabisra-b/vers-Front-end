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
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateReport = () => {
    // Dummy data for simulation
    const simulatedResponse = {
      totalPopulation: 5,
      totalWomen: 2,
      totalMen: 3,
      totalMarried: 1,
      totalMarriedWomen: 1,
      totalMarriedMen: 1,
      totalSingle: 1,
      totalSingleWomen: 0,
      totalSingleMen: 1,
      totalDivorced: 2,
      totalDivorcedWomen: 1,
      totalDivorcedMen: 1,
      ageRangeDistribution: {
        "0-18": 4,
        "18-25": 0,
        "26-35": 0,
        "36-50": 1,
        "51+": 0,
      },
      registrationYears: {
        2025: 5,
        2024: 0,
        2023: 0,
        2022: 0,
        2021: 0,
      },
    };

    // Filtering logic
    let filteredData = {};

    if (filters.gender) {
      if (filters.gender === "female") {
        filteredData.totalWomen = simulatedResponse.totalWomen;
        filteredData.totalMarriedWomen = simulatedResponse.totalMarriedWomen;
        filteredData.totalSingleWomen = simulatedResponse.totalSingleWomen;
        filteredData.totalDivorcedWomen = simulatedResponse.totalDivorcedWomen;
      } else if (filters.gender === "male") {
        filteredData.totalMen = simulatedResponse.totalMen;
        filteredData.totalMarriedMen = simulatedResponse.totalMarriedMen;
        filteredData.totalSingleMen = simulatedResponse.totalSingleMen;
        filteredData.totalDivorcedMen = simulatedResponse.totalDivorcedMen;
      }
    } else {
      // Include total population data if no gender filter
      filteredData.totalPopulation = simulatedResponse.totalPopulation;
    }

    if (filters.maritalStatus) {
      if (filters.maritalStatus === "married") {
        filteredData.totalMarried = simulatedResponse.totalMarried;
      } else if (filters.maritalStatus === "single") {
        filteredData.totalSingle = simulatedResponse.totalSingle;
      } else if (filters.maritalStatus === "divorced") {
        filteredData.totalDivorced = simulatedResponse.totalDivorced;
      }
    }

    if (filters.ageRange) {
      filteredData.ageRangeDistribution = {
        [filters.ageRange]: simulatedResponse.ageRangeDistribution[filters.ageRange],
      };
    }

    if (filters.registrationYear) {
      filteredData.registrationYears = {
        [filters.registrationYear]: simulatedResponse.registrationYears[filters.registrationYear],
      };
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
              { label: "Select Year", value: "" },
              ...Array.from({ length: 100 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return { label: `${year}`, value: `${year}` };
              }),
            ]}
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerateReport}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-700"
        >
          Generate Report
        </button>

        {/* Report Results */}
        {reportResults && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Report Results</h3>
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              {Object.entries(reportResults).map(([key, value]) =>
                typeof value === "object" ? (
                  <div key={key}>
                    <p className="text-gray-800 font-semibold">{key.replace(/([A-Z])/g, " $1")}</p>
                    <ul className="ml-4">
                      {Object.entries(value).map(([subKey, subValue]) => (
                        <li key={subKey} className="text-gray-700">
                          <strong>{subKey.replace(/([A-Z])/g, " $1")}: </strong>
                          {subValue}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p key={key} className="text-gray-700">
                    <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
                    {value}
                  </p>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
