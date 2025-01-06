const InputBox = ({ value, name, id, type, setFunc, fieldErrors }) => {
  return (
    <div>
      <label
        htmlFor={id || "first-name"}
        className="block text-sm font-medium text-gray-700"
      >
        {name || "First Name"}
      </label>
      <input
        id={id || "first-name"}
        type={type || "text"}
        value={value}
        onChange={(e) => setFunc(e.target.value)}
        className="w-full p-3 mt-1 border rounded-lg text-black"
      />
      {fieldErrors && (
        <p className="text-red-500 text-sm mt-1">{fieldErrors}</p>
      )}
    </div>
  );
};
export default InputBox;
