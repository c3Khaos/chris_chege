import React from "react";

function Resume() {
  return (
    <div className="flex justify-center items-center  space-x-6">
      <a
        href="/chris_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Preview Resume
      </a>

      <a
        href="/chris_Resume.pdf"
        download="Chege_Resume.pdf"
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Download Resume
      </a>
    </div>
  );
}

export default Resume;
