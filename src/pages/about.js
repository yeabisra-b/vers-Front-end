export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">
        About the Vital Events System
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        The Vital Events Registration System is designed to record and manage
        significant life events, such as births, deaths, marriages, and
        divorces. This system ensures that individuals have a formal record of
        these events for legal, statistical, and personal purposes.
      </p>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-6">
        <li>Secure and reliable registration of vital events.</li>
        <li>Easy search and retrieval of records.</li>
        <li>Compliant with legal and government standards.</li>
      </ul>
      <p className="text-gray-700 mb-6">
        Our system is built with the latest technologies to provide a
        user-friendly and efficient experience for all users.
      </p>
      <p className="text-center">
        <a
          href="/login"
          className="text-blue-500 underline hover:text-blue-700 transition duration-200"
        >
          Back to Login
        </a>
      </p>
    </div>
  );
}
