import React from "react";

const About = () => {
  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg mb-4 text-black">
        Welcome to the{" "}
        <strong>Electronic Vital Events Registration Program</strong> for the
        Federal Democratic Republic of Ethiopia (FDRE). Our mission is to
        revolutionize the way vital life events are recorded, managed, and
        utilized across Ethiopia by leveraging the power of technology.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-black">
        Our Purpose
      </h2>
      <p className="text-lg mb-4 text-black">
        The registration of vital events, including births, deaths, marriages,
        divorces, and adoptions, is essential for personal identity, governance,
        and public planning. Historically, manual paper-based systems have led
        to inefficiencies, data loss, and delays. Our program addresses these
        challenges with a centralized, automated solution focused on accuracy,
        security, and ease of use.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-black">
        What We Do
      </h2>
      <ul className="list-disc list-inside space-y-2 text-lg text-black">
        <li>
          Provide comprehensive event registration with mandatory fields to
          ensure data completeness.
        </li>
        <li>
          Maintain a centralized database for secure and accessible data
          management.
        </li>
        <li>
          Enable role-based access control and encryption for system security.
        </li>
        <li>Simplify certificate issuance for registered events.</li>
        <li>
          Generate detailed statistical reports for government planning and
          policymaking.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-black">
        Why It Matters
      </h2>
      <p className="text-lg mb-4 text-black">
        Our system benefits Ethiopian citizens by providing legal documentation,
        accurate population statistics, and reliable records for legal and
        policy-related matters. For government institutions, it enhances
        planning and decision-making by ensuring data integrity and
        accessibility.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-black">
        Our Vision
      </h2>
      <p className="text-lg mb-4 text-black">
        We envision Ethiopia leading the way in digital civil registration,
        ensuring every citizen’s rights and identity are recognized through
        reliable, secure, and efficient data systems.
      </p>

      <p className="text-lg mt-8 text-black">
        Thank you for joining us in building a better-connected Ethiopia.
      </p>
    </div>
  );
};

export default About;
