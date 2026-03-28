export default function FileList({ files }) {
  if (!files.length) {
    return (
      <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200 text-center text-gray-500 text-sm">
        No url found
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      {files.map((file) => (
        <div
          key={file._id}
          className="p-3 border border-gray-200 rounded-lg flex items-center justify-between gap-3"
        >
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-800 truncate">
              {file.originalName}
            </p>
            <p className="text-xs text-gray-500 truncate">{file.mimeType}</p>

            <a
              href={file.deliveryUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-blue-600 hover:text-blue-800 text-sm underline break-all"
            >
              {file.deliveryUrl}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}