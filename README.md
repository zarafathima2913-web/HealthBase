# HealthBase 🏥

HealthBase is a modern, full-stack healthcare management platform featuring a stunning glassmorphic UI, real-time location services, and an integrated AI assistant. It provides a seamless experience for patients, doctors, and administrators to securely manage medical records and hospital telemetry.

## ✨ Key Features

### 🔐 Secure Authentication & Multi-Role Access
* **Role-Based Dashboards**: Distinct interfaces and permissions for `Admin`, `Doctor`, and `Patient` roles.
* **OTP Password Reset**: Secure "Forgot Password" flow utilizing a 6-digit One-Time Password.
* **JWT Authorization**: Encrypted tokens protect all backend API routes.

### 🤖 Global Gemini AI Assistant
* **Floating AI Widget**: A globally accessible AI chatbot powered by the official `@google/genai` SDK.
* **Voice-to-Text**: Click the microphone to speak naturally; the app uses the browser's native Web Speech API to transcribe your voice.
* **Smart Attachments**: Upload medical images or documents directly to the AI for analysis.

### 🗺️ Live Geolocation & Hospital Mapping
* **Real-Time Auto-Location**: Detects your exact coordinates and maps real, local hospitals within a 5km radius using the OpenStreetMap Overpass API.
* **Manual Geocoding**: Search for any city or zip code globally (powered by Nominatim) to find hospitals in that specific area.
* **Interactive Maps & Directions**: Features an embedded map view and one-click Google Maps directions to any nearby medical facility.

### 📊 System Telemetry & Admin Dashboard
* **Live System Logs**: Administrators can view real-time server health, failed login attempts, and API latency.
* **User Management**: Admins have full access to view, edit, and onboard user accounts.

### 💎 Premium UI/UX
* **Glassmorphism Design**: Sleek, transparent UI components with background blurring.
* **Framer Motion**: Smooth, professional micro-animations for page transitions, modals, and the AI chatbot.
* **Tailwind CSS**: Fully responsive styling that looks incredible on both mobile and desktop.

---

## 🚀 Tech Stack

**Frontend:**
* React (Vite)
* Tailwind CSS
* Framer Motion
* React Router DOM
* Web Speech API (Native)

**Backend:**
* Node.js & Express
* JSON Web Tokens (JWT) & bcryptjs
* Multer (File Uploads)
* Google GenAI SDK (`@google/genai`)
* Lightweight File-Based Database (`db.json`) for zero-configuration deployments!

---

## 🛠️ Installation & Setup

Because HealthBase uses a lightweight file-based JSON database for demo purposes, you do not need to install MongoDB or PostgreSQL! 

### 1. Clone & Install
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Variables
In the `backend` folder, create a `.env` file:
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_google_gemini_key # Optional: For real AI responses
```

### 3. Run the App
Start both servers (you will need two terminal windows):

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

The frontend will start at `http://localhost:5173`. 

---

## 👥 Demo Accounts
The database automatically seeds itself with the following accounts for easy testing:
* **Admin / Demo:** `admin@healthbase.com` / `mafshaan1705@gmail.com`
* **Password:** `password123`

You can use the **Quick Demo Login** buttons on the Login page to instantly access these accounts!
