# ShikshaSahayak

## Introduction

The Crowdfunding Platform is a web-based solution designed to assist students at Masai School in Bangalore who face financial challenges in their education. This platform provides a space for students to create fundraising projects and allows donors to contribute to these causes, fostering educational equity and support within the student community.
## Deplolyed App
Frontend: https://shikshasahayak-l0px.onrender.com
<br>
Backend: https://shikshasahayak.onrender.com
## Directory Structure
```
ShikshaSahayak
backend/
│
├── config/
│ └── db.js
│
├── controllers/
│ ├── fund.js
│ └── login.js
│ |__
├── middlewares/
│ ├── auth.js
│ └── sample.js
│
├── Models/
│ ├── Fund.js
│ └── LoginModel.js
│
├── routes/
│ ├── donations.js
│ └── geminiRoute.js
| |__ Login.js
| |__ otpRouter.js
| |__ payment.js
| |__postProject.js
| |__projectRoutes.js
| |__userData.js
│
├── server.js
├── .gitignore
└── package.json
frontend/
│
├── Logo/
│ └── ShikshaSahayak.jpg
│
├── src/
│ ├── Components/
│ │ ├── Footer.jsx
│ │ ├── Heading.jsx
│ │ ├── Navbar.jsx
│ │ └── ProductCardPage.jsx
│ │
│ ├── Pages/
│ │ ├── Dashboard.jsx
│ │ ├── DetailedProject.jsx
│ │ ├── HomePage.jsx
│ │ └── LandingPage.jsx
│ │
│ ├── PrivateRoutes/
│ │ └── PrivateRoutes.jsx
│ │
│ ├── Styles/
│ │ ├── Footer.css
│ │ └── detailedProject.css
│ │
│ ├── App.css
│ ├── App.jsx
│ ├── index.css
│ ├── index.html
│ ├── main.jsx
│ ├── .eslintrc.cjs
│ ├── .gitignore
│ ├── package.json
│ └── README.md
│
```

## Features

-1. User Authentication
Secure Registration and Login: Implements encryption with bcrypt and JWT for secure user authentication.
-2. AI-Powered Chatbot
Interactive Assistance: Provides real-time support and answers to user queries through an AI-powered chatbot.
-3. Responsive Design
Seamless Experience: Ensures the platform is fully functional and visually appealing across all devices and screen sizes.
-4. User Profile Management
Profile Creation and Management: Allows users to create, view, and update their profiles with personal information and project details.
-5. CRUD Operations
Admin Controls: Enables administrators to perform Create, Read, Update, and Delete operations on user data and project information.
-6. OTP Verification
Password Recovery: Uses One-Time Password (OTP) for secure password resets and verifications.
-7. Payment Integration
Seamless Donations: Integrates payment gateways to allow users to donate funds directly from their cards.
-8. Self-Fundraising Option
Student Fundraising: Provides students with tools to set up and manage their own fundraising campaigns.

## API Endpoints

- To get all the projects
- https://shikshasahayak.onrender.com/projects

- To get userdata (email, password, name, id) #token req
- https://shikshasahayak.onrender.com/user

- To update password #token required
- https://shikshasahayak.onrender.com/user/changePassword/

- to update project fields #token required
- https://shikshasahayak.onrender.com/project/update 
- POST /login - login in a user
- POST /register - create a user account
- POST/logout -logout a user account
- POST/send-otp -to send the otp
- POST/order and POST/verfy - to the payment integration
- POST/Prompt- Chatbot

## Technology Stack

#### Front-end:

- React for dynamic user interfaces.
- Redux for state management.
- Chakra UI for component styling.
- Axios for handling HTTP requests.

#### Back-end:

- Node.js with Express for RESTful API services.
- MongoDB for flexible data storage.
- JWT for secure user authentication.
