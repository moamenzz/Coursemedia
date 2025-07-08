# Coursemedia

<div align="center">
<img src="/client/assets/readme-cover.png" alt="Demo Screenshot">
  
  <!-- Tech Stack -->
  
  <div>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="react" />
    <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="tailwind" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="vite" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express.js" />
    <img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="stripe" />
    <img src="https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white" alt="sentry" />
    <img src="https://img.shields.io/badge/Zod-EF4444?style=for-the-badge&logo=zod&logoColor=white" alt="zod" />
    <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="cloudinary" />
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="axios" />
    <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white" alt="zustand" />
  </div>
</div>

<br />
<br />

[![Status](https://img.shields.io/badge/Status-InProgress-yellow)]()
[![License](https://img.shields.io/badge/License-MIT-lightgrey)]()
[![Live Demo](https://img.shields.io/badge/Live-Demo-orange)](https://coursemedia.vercel.app)

---

## 📖 Description

Coursemedia is a full-featured Learning Management System (LMS) built with a modern full-stack architecture. It empowers instructors to sign up, create, publish, and manage their own courses, while providing students with access to a diverse library of educational content. Students can browse, purchase, and track their progress through a personalized "My Learning" dashboard, as well as rate and review completed courses to help others in the community.

The platform integrates Stripe for secure and reliable payment processing, with webhooks in place to monitor and respond to every transaction in real time. Error tracking and performance monitoring are handled by Sentry, ensuring any issues encountered in production are promptly reported for quick resolution.

Coursemedia features a custom-built, high-quality video player with full support for adjustable playback speed, video quality selection, and volume controls—offering a seamless and professional viewing experience.

Instructors are provided with their own dashboard to upload, update, or delete courses, manage content, respond to student reviews, and even feature standout courses for more visibility. This application combines robust functionality with a clean, user-focused design to create an all-in-one platform for online learning and teaching.

---

## 🚀 Features

- 🔒 Authentication & OAuth 
- 📦 Full-Stack Application with Instructor Management Dashboard & User Interface
- 💸 Secure Payment with Stripe 
- 📼 Curriculum Uploading to Cloudinary 
- 🌐 Fully responsive UI
- ⚙️ Deployment via Render + Vercel  
- 🛒 Full Cart Functionality 
- 🌠 Wishlist & My Learning

Features In Progress: 

- 💬 Socket.IO Messaging between Instructor & Student
- 🧔 Personal Profile & User management
- 🔔 Notifications Functionality
- 🌐 Captions & Subtitles 
  
---

## 🧠 What I Learned

This project challenged and taught me:

- ✅ Payment with Stripe & Stripe Webhooks
- ✅ Uploading directly to Cloudinary  
- ✅ Handling Forms & Storing curriculum lectures without causing Performance Issues
  
---

## 🔧 Technologies Used

| Frontend | Backend | Database | Other |
|----------|---------|----------|-------|
| React    | Node.js (Express.js) | MongoDB (Mongoose)  | JWT, Axios, Vite, Socket.io, Cloudinary, Stripe, etc.|

---

## 🖥️ Live Demo

🌐 [Click here to view the app](https://coursemedia.vercel.app)

---

## 🧪 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/moamenzz/Coursemedia.git

# Navigate to project folder
cd coursemedia

# Install dependencies for both frontend and backend
cd client && npm install
cd ../server && npm install

# Add .env files in both folders as per .env.example 

# Run the project
npm run dev
```

## 🤫 .env.example

client .env:

```
CLOUDINARY_API_KEY=
VITE_STRIPE_PUBLISHABLE_KEY=
VITE_BACKEND_API=
VITE_GITHUB_OAUTH_URL=
VITE_GOOGLE_OAUTH_URL=
VITE_SENTRY_DSN=
```

server .env:

```
NODE_ENV=
APPLICATION_NAME=
CLIENT_URL=
PORT=
MONGODB_URI=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
RESEND_SECRET=
NODEMAILER_APP_PASSWORD=
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
SENDER_DOMAIN=
SESSION_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
```

# ©️ Credits 

The Dashboard Design of this project was inspired by Sangam Mukherjee on YouTube. 

Front-End design was found on Figma. 
