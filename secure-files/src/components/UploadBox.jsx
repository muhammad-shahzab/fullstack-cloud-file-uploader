import { useState } from "react";
import { uploadFileApi } from "../api/fileApi";

export default function UploadBox({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Select a file.");

    setLoading(true);
    try {
      const result = await uploadFileApi(file);

      const url = result?.file?.deliveryUrl || "";
      setUploadedUrl(url);

      if (onUploadSuccess) {
        onUploadSuccess(result.file);
      }

      alert("Upload Successful!");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert(err.message || "Upload Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100 transition-all cursor-pointer"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 
          ${
            loading
              ? "bg-gray-300 cursor-not-allowed text-gray-500"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-[0.98]"
          }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Uploading...
          </span>
        ) : (
          "Upload Now"
        )}
      </button>

      {uploadedUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg">
          <p className="text-green-800 text-sm font-semibold flex items-center gap-2">
            <span className="text-lg">✓</span> File Saved Successfully!
          </p>
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium underline decoration-2 underline-offset-4 break-all"
          >
            View Uploaded File
          </a>
        </div>
      )}
    </div>
  );
}