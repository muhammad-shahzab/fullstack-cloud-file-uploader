// import React, { useState } from "react";
// import UploadBox from "./components/UploadBox";
// import FileList from "./components/FileList";
// import { getAllFilesApi } from "./api/fileApi";

// export default function App() {
//   const [files, setFiles] = useState([]);
//   const [fetching, setFetching] = useState(false);

//   const fetchSavedFiles = async () => {
//     setFetching(true);
//     try {
//       const result = await getAllFilesApi();
//       setFiles(result.files || []);
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Failed to fetch files");
//     } finally {
//       setFetching(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Cloud Uploader
//         </h2>

//         <div className="space-y-4">
//           <UploadBox
//             onUploadSuccess={(newFile) => {
//               setFiles((prev) => [newFile, ...prev]);
//             }}
//           />

//           <button
//             onClick={fetchSavedFiles}
//             disabled={fetching}
//             className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
//               fetching
//                 ? "bg-gray-300 cursor-not-allowed text-gray-500"
//                 : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
//             }`}
//           >
//             {fetching ? "Fetching..." : "Fetch Saved URLs"}
//           </button>

//           <FileList files={files} />
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
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
    } catch (err) { console.error(err); } 
    finally { setFetching(false); }
  };

  useEffect(() => { fetchSavedFiles(); }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-stone-200 font-mono selection:bg-amber-500/30">
      {/* Stealth Nav */}
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-2xl border-b border-stone-900">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-amber-500 rounded-sm rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)]">
              <div className="-rotate-45 font-black text-black text-xs">V</div>
            </div>
            <span className="text-lg font-black tracking-[0.3em] uppercase">Terminal<span className="text-amber-500">.Vault</span></span>
          </div>

          <button 
            onClick={fetchSavedFiles}
            className="group flex items-center gap-3 text-[10px] font-black tracking-widest text-stone-500 hover:text-amber-500 transition-all"
          >
            <span className="w-8 h-[1px] bg-stone-800 group-hover:bg-amber-500 transition-all"></span>
            {fetching ? "RECALIBRATING..." : "REFRESH SYSTEM"}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Controls - Left Column */}
          <aside className="lg:col-span-4 space-y-12">
            <div>
              <h2 className="text-xs font-black text-amber-500 uppercase tracking-[0.5em] mb-6 flex items-center gap-3">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
                Input Terminal
              </h2>
              <UploadBox onUploadSuccess={(newFile) => setFiles((prev) => [newFile, ...prev])} />
            </div>

            <div className="p-8 border border-stone-900 rounded-lg bg-gradient-to-br from-stone-900/50 to-transparent">
               <h4 className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-4">Node Capacity</h4>
               <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className={`h-6 w-full rounded-sm ${i < 7 ? 'bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'bg-stone-800'}`} />
                  ))}
               </div>
               <p className="mt-4 text-[9px] font-bold text-stone-600 uppercase tracking-tighter text-right">70% Volume Indexed</p>
            </div>
          </aside>

          {/* Grid - Right Column */}
          <div className="lg:col-span-8">
            <div className="flex items-baseline justify-between mb-12 border-b border-stone-900 pb-6">
              <h2 className="text-3xl font-black tracking-tighter text-white">Stored Assets</h2>
              <span className="text-[10px] font-bold text-stone-600 uppercase">{files.length} Records Found</span>
            </div>
            <FileList files={files} />
          </div>
        </div>
      </main>
    </div>
  );
}