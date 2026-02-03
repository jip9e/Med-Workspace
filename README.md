# 🗡️ Med-Workspace Pro Max

A next-generation, browser-based medical workstation designed for medical students and clinical environments. Built with a focus on privacy, hygiene, and ergonomics.

![Version](https://img.shields.io/badge/version-V3_PRO_MAX-5DA5A5)
![Tech](https://img.shields.io/badge/Tech-React_19_+_Three.js_+_MediaPipe-blue)

## 🌟 Key Features

### 1. 🦴 Holo-Anatomy (AR Visualization)
Real-time 3D anatomical visualization that responds to your body.
- **Gesture Control:** Rotate, zoom, and manipulate 3D models hands-free using webcam-based hand tracking.
- **Holographic Glow:** Optimized lighting and "breathing" shaders for a futuristic, medical-grade aesthetic.

### 2. 🧼 Sterile Nav (Touchless Scrolling)
Navigate documentation and clinical notes without touching your device.
- **Index Point:** Scroll Up.
- **Palm Down:** Scroll Down.
- **Zero-Touch:** Perfect for lab environments or when wearing medical gloves.

### 3. 🧠 Burnout Monitor (AI Biometrics)
Active well-being monitoring to prevent digital strain during long study sessions.
- **Posture Correction:** Alerts you when slouching or improper neck angles are detected.
- **Blink Rate Tracking:** Calculates blinks per minute using FaceMesh to prevent eye dryness.
- **Health Overlays:** Non-intrusive clinical alerts when health thresholds are breached.

### 4. 🎙️ Medical Dictation
Hands-free note-taking integrated directly into the workspace.
- **Voice Triggers:** Say "Start Note" to begin and "Save Note" to archive.
- **Export:** One-click export of clinical observations to `.txt` files.

### 5. 📱 iPad-First Ergonomics
- **Bento Grid Layout:** Hyper-clean, modular dashboard.
- **OLED Optimized:** True black (#000000) theme to maximize battery and eliminate eye strain.
- **Touch Targets:** Standardized 44px targets following Apple's Human Interface Guidelines.

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **3D Engine:** Three.js (React Three Fiber)
- **AI Engines:** Google MediaPipe (@mediapipe/tasks-vision)
- **Styling:** Tailwind CSS (Clinical Dark Theme)
- **Icons:** Lucide React
- **Voice:** Web Speech API

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jip9e/Med-Workspace.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  **Open in Browser:** Navigate to `http://localhost:5173` and allow camera access.

---
**Privacy Note:** All AI processing happens locally in your browser. No camera data or voice recordings are ever sent to a server.

*Developed with 🗡️ by KNIGHTOS for Seinse.*
