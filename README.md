# AI Code Reviewer

This project is a full-stack web application that allows users to submit code and receive AI-powered code reviews. The backend uses Google Gemini AI to analyze and review code, while the frontend provides a modern, user-friendly interface for code submission and review display.

## Features
- Submit code for instant AI review
- Detailed, constructive feedback with suggestions and improvements
- Modern React frontend with syntax highlighting and Markdown rendering
- Secure backend with environment variable support

## Tech Stack
- **Frontend:** React (Vite), PrismJS, Axios, React Markdown
- **Backend:** Node.js, Express, Google Generative AI (Gemini)
- **Deployment:** Render (backend), Vercel (frontend)

## Getting Started

### Prerequisites
- Node.js and npm installed
- Google Gemini API key (for backend)

### Backend Setup
1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Start the backend server:
   ```sh
   node server.js
   ```

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and set your backend URL:
   ```env
   VITE_BACKEND_URL=http://localhost:4000
   ```
   (Replace with your Render backend URL after deployment)
4. Start the frontend dev server:
   ```sh
   npm run dev
   ```

## Deployment
- **Backend:** Deploy to Render. Set the `GEMINI_API_KEY` in the Render dashboard.
- **Frontend:** Deploy to Vercel. Set the `VITE_BACKEND_URL` in the Vercel dashboard to your Render backend public URL.

## About Section Description
AI Code Reviewer is a web application that leverages Google Gemini AI to provide instant, high-quality code reviews. Users can submit code and receive detailed, constructive feedback, including suggestions for improvements, best practices, and error detection. The platform is designed for developers seeking quick, expert-level code analysis and learning opportunities.

---

Feel free to use or modify this project for your own code review needs!
