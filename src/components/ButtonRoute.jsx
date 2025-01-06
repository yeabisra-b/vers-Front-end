const Button = ({ url, name }) => {
  return (
    <button
      onClick={() => (window.location.href = "/register")}
      className="p-6 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
    >
      Register New Event
    </button>
  );
};
export default Button;
