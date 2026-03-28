import React, { useState } from "react";
import UploadBox from "./components/UploadBox";
import FileList from "./components/FileList";
import { getAllFilesApi } from "./api/fileApi";

export default function App() {
  const [files, setFiles] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchSavedFiles = async () => {
    setFetching(true);
    try {
      const result = await getAllFilesApi();
      setFiles(result.files || []);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to fetch files");
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Cloud Uploader
        </h2>

        <div className="space-y-4">
          <UploadBox
            onUploadSuccess={(newFile) => {
              setFiles((prev) => [newFile, ...prev]);
            }}
          />

          <button
            onClick={fetchSavedFiles}
            disabled={fetching}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              fetching
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
            }`}
          >
            {fetching ? "Fetching..." : "Fetch Saved URLs"}
          </button>

          <FileList files={files} />
        </div>
      </div>
    </div>
  );
}