// import React from "react";

// const MediaItem = ({ file }) => {
//   const type = file.mimeType || "";

//   // 1. IMAGE RENDERER - Brighter default opacity
//   if (type.startsWith("image/")) {
//     return (
//       <img
//         src={file.deliveryUrl}
//         alt={file.originalName}
//         className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 select-none"
//       />
//     );
//   }

//   // 2. VIDEO RENDERER - Fixed Distortion & Brighter Accents
//   if (type.startsWith("video/")) {
//     return (
//       <div className="relative w-full h-full bg-[#050505] flex items-center justify-center overflow-hidden">
//         {/* Using object-contain to prevent stretching/distortion */}
//         <video className="w-full h-full object-contain opacity-50 group-hover:opacity-80 transition-opacity">
//           <source src={file.deliveryUrl} type={type} />
//         </video>
        
//         {/* Play Icon - Centered via absolute inset-0 flex */}
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//           <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/40 flex items-center justify-center group-hover:scale-110 group-hover:border-amber-500 transition-all duration-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
//             <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-amber-500 border-b-[10px] border-b-transparent ml-1" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // 3. PDF / DOCUMENT RENDERER - High Contrast
//   if (type.includes("pdf")) {
//     return (
//       <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900 text-stone-100 transition-all group-hover:bg-stone-800">
//         <svg className="w-14 h-14 mb-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="square" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//         </svg>
//         <span className="text-[10px] font-black tracking-[0.3em] uppercase text-amber-500/80 group-hover:text-amber-500">Document.Pdf</span>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full h-full flex flex-col items-center justify-center bg-black text-stone-400">
//       <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="square" strokeWidth="1" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
//       </svg>
//     </div>
//   );
// };

// export default MediaItem;


import React from "react";

const MediaItem = ({ file }) => {
  const type = file.mimeType || "";

  // 1. IMAGE RENDERER - Full Color Fix
  if (type.startsWith("image/")) {
    return (
      <img
        src={file.deliveryUrl}
        alt={file.originalName}
        // Removed 'grayscale' and 'group-hover:grayscale-0'
        // I also bumped default opacity to 100 for maximum brightness.
        className="w-full h-full object-cover opacity-100 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 select-none"
      />
    );
  }

  // 2. VIDEO RENDERER - No Changes (Already working)
  if (type.startsWith("video/")) {
    return (
      <div className="relative w-full h-full bg-[#050505] flex items-center justify-center overflow-hidden">
        <video className="w-full h-full object-contain opacity-50 group-hover:opacity-80 transition-opacity">
          <source src={file.deliveryUrl} type={type} />
        </video>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/40 flex items-center justify-center group-hover:scale-110 group-hover:border-amber-500 transition-all duration-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-amber-500 border-b-[10px] border-b-transparent ml-1" />
          </div>
        </div>
      </div>
    );
  }

  // 3. PDF / DOCUMENT RENDERER - No Changes (Already working)
  if (type.includes("pdf")) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900 text-stone-100 transition-all group-hover:bg-stone-800">
        <svg className="w-14 h-14 mb-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-amber-500/80 group-hover:text-amber-500">Document.Node</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black text-stone-400">
      <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="square" strokeWidth="1" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
      </svg>
    </div>
  );
};

export default MediaItem;