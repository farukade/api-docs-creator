import { useEffect, useState } from "react";
import { useApp } from "../App";

const UpdateTokenModal = ({ onClose }) => {
  const { actions } = useApp();
  const [loading, setLoading] = useState(false);
  const [viewToken, setViewToken] = useState(false);
  const [formData, setFormData] = useState({ token: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      window.localStorage.setItem("api-docs-creator-token", formData.token);
      actions.addToast({ message: "Token updated", type: "success" });
      actions.setToken(formData.token);
      onClose();
    } catch (error) {
      actions.addToast({ message: "Invalid JSON in request", type: "error" });
    }

    setLoading(false);
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const savedToken = window.localStorage.getItem("api-docs-creator-token");
    if (savedToken) {
      setFormData({ token: savedToken });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Token</label>
        <input
          type={viewToken ? "text" : "password"}
          value={formData.token}
          onChange={(e) => updateFormData("token", e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={viewToken}
              onChange={() => setViewToken(!viewToken)}
              className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
            />
            <span className="ml-2 text-sm text-gray-300">View Token</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
        >
          Close
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Request"}
        </button>
      </div>
    </form>
  );
};

export default UpdateTokenModal;
