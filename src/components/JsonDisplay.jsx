import React from "react";

const JsonDisplay = ({ data, maxHeight = "max-h-96" }) => {
  const jsonString =
    typeof data === "string" ? data : JSON.stringify(data, null, 2);

  const syntaxHighlight = (json) => {
    json = json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = "text-yellow-400"; // number
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "text-blue-400"; // key
          } else {
            cls = "text-green-400"; // string
          }
        } else if (/true|false/.test(match)) {
          cls = "text-purple-400"; // boolean
        } else if (/null/.test(match)) {
          cls = "text-gray-500"; // null
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
  };

  return (
    <div
      className={`bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-auto ${maxHeight} border border-gray-700`}
    >
      <pre
        className="text-gray-300 m-0"
        dangerouslySetInnerHTML={{ __html: syntaxHighlight(jsonString) }}
      />
    </div>
  );
};

export default JsonDisplay;
