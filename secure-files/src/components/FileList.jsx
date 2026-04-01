// export default function FileList({ files }) {
//   if (!files.length) {
//     return (
//       <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200 text-center text-gray-500 text-sm">
//         No url found
//       </div>
//     );
//   }

//   return (
//     <div className="mt-6 space-y-3">
//       {files.map((file) => (
//         <div
//           key={file._id}
//           className="p-3 border border-gray-200 rounded-lg flex items-center justify-between gap-3"
//         >
//           <div className="min-w-0 flex-1">
//             <p className="text-sm font-medium text-gray-800 truncate">
//               {file.originalName}
//             </p>
//             <p className="text-xs text-gray-500 truncate">{file.mimeType}</p>

//             <a
//               href={file.deliveryUrl}
//               target="_blank"
//               rel="noreferrer"
//               className="mt-1 inline-block text-blue-600 hover:text-blue-800 text-sm underline break-all"
//             >
//               {file.deliveryUrl}
//             </a>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import MediaItem from "./MediaItem";

export default function FileList({ files }) {
  if (!files.length) {
    return (
      <div className="flex flex-col items-center justify-center py-32 border border-stone-800 bg-black/40">
        <p className="text-amber-500 text-[11px] font-black uppercase tracking-[0.5em]">System Offline: 0 Records</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {files.map((file) => (
        <div 
          key={file._id} 
          className="group relative bg-[#0a0a0a] border border-stone-800 overflow-hidden hover:border-amber-500 transition-all duration-500 flex flex-col shadow-2xl"
        >
          {/* Media Container - Sharp Frame */}
          <div className="relative aspect-square m-2 overflow-hidden border border-stone-900 bg-black">
            <MediaItem file={file} />
            
            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-6">
              <a 
                href={file.deliveryUrl} 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 bg-amber-500 text-black flex items-center justify-center hover:bg-white transition-all transform translate-y-4 group-hover:translate-y-0 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
              <button 
                onClick={() => navigator.clipboard.writeText(file.deliveryUrl)}
                className="w-12 h-12 bg-stone-800 text-white flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all transform translate-y-4 group-hover:translate-y-0 delay-75"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </button>
            </div>
          </div>

          {/* Info Footer - Brighter Typography */}
          <div className="px-6 pb-6 pt-3 font-mono">
            <h3 className="text-[12px] font-bold text-white truncate mb-4 tracking-normal uppercase">
              {file.originalName}
            </h3>
            
            <div className="flex items-center justify-between border-t border-stone-800/50 pt-4">
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-sm">
                {file.mimeType?.split('/')[1] || "RAW"}
              </span>
              
              <span className="text-[10px] text-stone-300 font-bold uppercase tracking-tighter">
                {file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "---"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}