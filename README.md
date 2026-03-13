# Real-Time Collaboration Chat Application

A real-time chat application where multiple users can communicate instantly in a shared chat room without refreshing the page.  
This project demonstrates real-time communication using WebSocket technology with **Socket.IO**.
---

## Project Overview

The goal of this project is to build a **Real-Time Collaboration Application** that allows users to join a chat room, send messages, and see live updates instantly.

The application supports multiple users communicating simultaneously with live notifications and dashboard updates.
---

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- Socket.IO

### Database
- MongoDB

---

## Features

- Real-time chat messaging
- Multiple users in the same chat room
- User join and leave notifications
- Active users list
- Live dashboard showing:
  - Active users
  - Total messages
  - Connection status
- Typing indicator
- Emoji support
- MongoDB message storage
---

## Project Structure
RealTimeCollaborationApp
│
├── backend
│ ├── models
│ │ └── Message.js
│ ├── server.js
│ ├── users.js
│ ├── package.json
│ └── package-lock.json
│
├── frontend
│ ├── index.html
│ ├── chat.html
│ ├── script.js
│ └── style.css
│
└── README.md
---

## How to Run the Project

### 1 Install Dependencies

Navigate to the backend folder and install required packages.

npm install

### 2 Start the Server

node server.js

Server will run on:

http://localhost:5000

### 3 Open the Application

Open the **index.html** file in your browser.

Enter:

- Username
- Room name

Then click **Join Chat**.
---
## Testing the Application
To test real-time communication:
1. Open the application in multiple browser tabs.
2. Join the same chat room with different usernames.
3. Send messages from different users.
4. Verify that messages appear instantly without refreshing the page.

## Author

**Suraj Lakkas**

Software Engineering Assignment – Real-Time Collaboration Application
