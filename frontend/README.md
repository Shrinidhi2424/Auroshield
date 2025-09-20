# AuroShield AI - Frontend

A React-based safety platform frontend that provides incident reporting, emergency alerts, volunteer coordination, and safety mapping features.

## 🚀 Features

- **Firebase Authentication**: Email/password and Google Sign-In
- **Incident Reporting**: Text, voice, and photo evidence support
- **Panic Button**: Emergency alert system
- **Volunteer Dashboard**: Community response coordination
- **Safety Heatmap**: Real-time danger level visualization
- **Real-time Alerts**: Safety notifications and updates
- **Anonymous Reporting**: Privacy-focused incident reporting
- **Mobile-First Design**: Responsive UI optimized for mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **State Management**: Redux Toolkit
- **Routing**: Wouter
- **UI Components**: Shadcn/UI + Tailwind CSS
- **Authentication**: Firebase Auth
- **API Client**: Custom fetch-based client
- **Build Tool**: Vite
- **Styling**: Tailwind CSS

## 📋 Prerequisites

Before running the application, ensure you have:

- Node.js 18+ installed
- Firebase project set up
- Environment variables configured

## 🔧 Installation

1. **Clone the repository** (if applicable)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with:
   ```env
   # Firebase Configuration (Required)
   VITE_FIREBASE_API_KEY=your-firebase-api-key
   VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
   VITE_FIREBASE_APP_ID=your-firebase-app-id
   
   # Backend API Endpoints (Optional - defaults provided)
   VITE_API_BASE_URL=http://localhost:8000/api
   VITE_AI_SERVICE_URL=http://localhost:8001/api
   ```

## 🔥 Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Add a web app to your project

### 2. Configure Authentication

1. Navigate to **Authentication** → **Sign-in method**
2. Enable **Email/Password** authentication
3. Enable **Google** sign-in method
4. Add authorized domains:
   - `localhost` (for development)
   - Your production domain (when deploying)

### 3. Get Configuration Keys

1. Go to **Project Settings** → **General**
2. Scroll to **Your apps** section
3. Copy the following values to your `.env` file:
   - `apiKey` → `VITE_FIREBASE_API_KEY`
   - `projectId` → `VITE_FIREBASE_PROJECT_ID`
   - `appId` → `VITE_FIREBASE_APP_ID`

## 🚀 Development

Start the development server:

```bash
npm run dev
