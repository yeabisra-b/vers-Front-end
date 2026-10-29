import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import Notice from "../components/Notice";
import SelectField from "../components/SelectField";
import { api } from "../lib/api";
import { EVENT_TYPES, GENDERS, STATUSES, labelFor } from "../lib/events";
import { useSession } from "../lib/session";

const EMPTY_FILTERS = { type: "", status: "", gender: "", region: "", registrationYear: "" };

const any = (label) => [{ label, value: "" }];

/** One breakdown (e.g. events per type) as rows with proportional bars. */
const Breakdown = ({ title, counts, labels }) => {
  const entries = Object.entries(counts);
  const max = Math.max(1, ...entries.map(([, count]) => count));
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-black mb-3">{title}</h3>
      {entries.length === 0 ? (
        <p className="text-gray-500 m-0">No data.</p>
      ) : (
        <table className="w-full">
          <tbody>
            {entries.map(([key, count]) => (
              <tr key={key}>
                <td className="py-1 pr-3 text-gray-700 whitespace-nowrap">
                  {labels ? labelFor(labels, key) : key}
                </td>
                <td className="py-1 w-full">
                  <div className="h-3 bg-blue-500 rounded" style={{ width: `${(count / max) * 100}%` }} />
                </td>
                <td className="py-1 pl-3 text-right font-semibold text-black">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default function GenerateReportsPage() {
  const session = useSession(["OFFICIAL", "ADMIN"]);
  const [options, setOptions] = useState(null);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session) return;
    api("/official/reports/filters")
      .then(setOptions)
      .catch((err) => setError(err.message));
  }, [session]);

  if (!session) return null;

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setReport(await api("/official/reports", { query: filters }));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AppLayout session={session} title="Generate Reports">
      <Notice error={error} />
      <form onSubmit={handleGenerateReport} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-gray-700 mb-4">
          Every filter is optional. The gender filter only counts births and deaths.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <SelectField
            label="Event Type"
            id="type"
            name="type"
            value={filters.type}
            onChange={handleChange}
            options={[...any("Any"), ...EVENT_TYPES]}
          />
          <SelectField
            label="Status"
            id="status"
            name="status"
            value={filters.status}
            onChange={handleChange}
            options={[...any("Any"), ...STATUSES]}
          />
          <SelectField
            label="Gender"
            id="gender"
            name="gender"
            value={filters.gender}
            onChange={handleChange}
            options={[...any("Any"), ...GENDERS]}
          />
          <SelectField
            label="Region"
            id="region"
            name="region"
            value={filters.region}
            onChange={handleChange}
            options={[
              ...any("Any"),
              ...(options?.regions || []).map((r) => ({ label: r, value: r })),
            ]}
          />
          <SelectField
            label="Registration Year"
            id="registrationYear"
            name="registrationYear"
            value={filters.registrationYear}
            onChange={handleChange}
            options={[
              ...any("Any"),
              ...(options?.registrationYears || []).map((y) => ({ label: `${y}`, value: `${y}` })),
            ]}
          />
        </div>
        <div className="flex gap-4 mt-6">
          <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">
            Generate Report
          </button>
          <button
            type="button"
            onClick={() => {
              setFilters(EMPTY_FILTERS);
              setReport(null);
            }}
            className="bg-gray-300 text-black py-2 px-6 rounded-lg hover:bg-gray-400"
          >
            Clear
          </button>
        </div>
      </form>

      {report && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-500 m-0">Total events</p>
              <p className="text-4xl font-bold text-black m-0">{report.totalEvents}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-500 m-0">Average birth weight</p>
              <p className="text-4xl font-bold text-black m-0">
                {report.averageBirthWeight == null ? "—" : `${report.averageBirthWeight} kg`}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Breakdown title="By Event Type" counts={report.byType} labels={EVENT_TYPES} />
            <Breakdown title="By Status" counts={report.byStatus} labels={STATUSES} />
            <Breakdown title="By Gender (births and deaths)" counts={report.byGender} labels={GENDERS} />
            <Breakdown title="By Region" counts={report.byRegion} />
            <Breakdown title="By Registration Month" counts={report.byMonth} />
          </div>
        </div>
      )}
    </AppLayout>
  );
}
