const BASE_URL = "http://localhost:5000/api/files";

export async function uploadFileApi(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Upload failed");
  }

  return data;
}

export async function getAllFilesApi() {
  const res = await fetch(BASE_URL);

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch files");
  }

  return data;
}