# 🚀 Fullstack Cloud File Gallery (upload preview and download plugin)

A **scalable and production-ready file upload system** built with React, Node.js, MongoDB, and Cloudinary.
This application supports uploading, storing, and retrieving **all file types** (images, PDFs, documents, archives, etc.) with proper handling and optimized delivery.

---

## ✨ Features

* 📤 Upload any file type (Images, PDFs, Docs, ZIP, etc.)
* ☁️ Cloudinary integration with automatic file type detection
* 🗄 MongoDB storage for file metadata
* 🔗 Secure and optimized delivery URLs
* 📂 Fetch and display all uploaded files
* 🖼 Image preview support
* 📄 PDF & document handling with proper delivery
* ⚡ Clean and modular backend architecture
* 🎯 Production-ready structure

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Multer (file handling middleware)

### Cloud Storage

* Cloudinary

---

## 📁 Project Structure

```bash
backend/
├── src/
│   ├── config/        # DB & Cloudinary config
│   ├── controllers/   # Business logic
│   ├── middleware/    # Multer setup
│   ├── models/        # MongoDB schema
│   ├── routes/        # API routes
│   └── utils/         # Helper functions
├── app.js
└── server.js

secure-files/ (frontend)
├── src/
│   ├── api/
│   ├── components/
│   └── App.jsx
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/fullstack-cloud-file-uploader.git
cd fullstack-cloud-file-uploader
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

FRONTEND_URL=http://localhost:5173
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd secure-files
npm install
npm run dev
```

---

## 🔗 API Endpoints

### Upload File

```
POST /api/files/upload
```

### Get All Files

```
GET /api/files
```

---

## 📦 File Object Example

```json
{
  "originalName": "document.pdf",
  "mimeType": "application/pdf",
  "size": 123456,
  "deliveryUrl": "https://res.cloudinary.com/.../upload/...",
  "cloudinary": {
    "publicId": "uploads/xyz",
    "resourceType": "image",
    "format": "pdf"
  }
}
```

---

## ⚠️ Important Notes

* Enable **PDF & ZIP delivery** in Cloudinary security settings
* Use `deliveryUrl` for accessing files (not raw URLs)
* Default upload limit: **100MB**
* PDFs may be treated as image resources for preview support

---

## 🚀 Future Improvements

* 🔐 Authentication (JWT)
* 🗑 File delete functionality
* 📊 Upload progress indicator
* 📂 File filtering & search
* ☁️ Deployment (Vercel + Render)
* 👥 User-based file management

---

## 👨‍💻 Author

**Muhammad Shahzaib**

---

## ⭐ Support

If you find this project helpful, please give it a ⭐ on GitHub.

---
