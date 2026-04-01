// import { useState } from "react";
// import { uploadFileApi } from "../api/fileApi";

// export default function UploadBox({ onUploadSuccess }) {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [uploadedUrl, setUploadedUrl] = useState("");

//   const handleUpload = async () => {
//     if (!file) return alert("Select a file.");

//     setLoading(true);
//     try {
//       const result = await uploadFileApi(file);

//       const url = result?.file?.deliveryUrl || "";
//       setUploadedUrl(url);

//       if (onUploadSuccess) {
//         onUploadSuccess(result.file);
//       }

//       alert("Upload Successful!");
//       setFile(null);
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Upload Failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <input
//         type="file"
//         onChange={(e) => setFile(e.target.files?.[0] || null)}
//         className="block w-full text-sm text-gray-500
//           file:mr-4 file:py-2 file:px-4
//           file:rounded-full file:border-0
//           file:text-sm file:font-semibold
//           file:bg-blue-50 file:text-blue-700
//           hover:file:bg-blue-100 transition-all cursor-pointer"
//       />

//       <button
//         onClick={handleUpload}
//         disabled={loading}
//         className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 
//           ${
//             loading
//               ? "bg-gray-300 cursor-not-allowed text-gray-500"
//               : "bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-[0.98]"
//           }`}
//       >
//         {loading ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//                 fill="none"
//               />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               />
//             </svg>
//             Uploading...
//           </span>
//         ) : (
//           "Upload Now"
//         )}
//       </button>

//       {uploadedUrl && (
//         <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg">
//           <p className="text-green-800 text-sm font-semibold flex items-center gap-2">
//             <span className="text-lg">✓</span> File Saved Successfully!
//           </p>
//           <a
//             href={uploadedUrl}
//             target="_blank"
//             rel="noreferrer"
//             className="mt-2 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium underline decoration-2 underline-offset-4 break-all"
//           >
//             View Uploaded File
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState } from "react";
import { uploadFileApi } from "../api/fileApi";

export default function UploadBox({ onUploadSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const result = await uploadFileApi(file);
      
      // LOGICAL FIX: Ensure we are passing the correct file object back to App.js
      // result?.file contains the deliveryUrl and metadata from Cloudinary/Backend
      if (onUploadSuccess && result?.file) {
        onUploadSuccess(result.file);
        // Optional: clear the input so the same file can be uploaded twice if needed
        e.target.value = null; 
      }
    } catch (err) {
      console.error("Upload Terminal Error:", err);
      alert("SYSTEM ERROR: Failed to index asset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <label className={`
      relative group cursor-pointer flex flex-col items-center justify-center w-full h-56 
      border border-stone-800 bg-black transition-all duration-500
      hover:border-amber-500/50 hover:bg-stone-900/30
      ${loading ? "opacity-50 pointer-events-none cursor-wait" : "cursor-pointer"}
    `}>
      {/* BUG FIX: Added handleUpload back to the onChange event */}
      <input 
        type="file" 
        className="hidden" 
        onChange={handleUpload} 
        disabled={loading} 
      />
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-stone-800 group-hover:border-amber-500 transition-colors" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-stone-800 group-hover:border-amber-500 transition-colors" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-stone-800 group-hover:border-amber-500 transition-colors" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-stone-800 group-hover:border-amber-500 transition-colors" />

      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent animate-spin" />
          <div className="text-amber-500 font-black text-[10px] tracking-[0.4em] animate-pulse">
            ENCRYPTING & INDEXING...
          </div>
        </div>
      ) : (
        <>
          <div className="relative mb-4">
            <svg className="w-10 h-10 text-stone-700 group-hover:text-amber-500 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeWidth="1" d="M12 4v16m8-8H4" />
            </svg>
            {/* Subtle glow behind the icon on hover */}
            <div className="absolute inset-0 bg-amber-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-500 group-hover:text-stone-100 transition-colors">
            Initialize Upload
          </span>
          <span className="text-[8px] font-bold text-stone-700 mt-2 uppercase tracking-widest group-hover:text-amber-500/50">
            Select Asset Node
          </span>
        </>
      )}
    </label>
  );
}