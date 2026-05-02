# Community Compass 🌍

Community Compass is a modern, full-stack web application designed to empower local communities. It allows users to securely connect with neighbors, report and resolve lost/found items, and organize community help requests and volunteer efforts.

## Features
- **Find & Lost Items**: Report lost valuables or found items, complete with descriptions, locations, and optional images.
- **Community Help**: Request assistance for local events, emergencies, or chores, and allow neighbors to volunteer.
- **Role-Based System**: Secure account registration and login for community members.
- **Beautiful UI**: A modern, responsive "Glassmorphism" dark-mode interface.
- **Automated Database**: The backend automatically initializes your MySQL tables upon startup.

---

## 🚀 How to Run the Project Locally

If you are a developer setting this up for the first time, follow these simple steps to get the project running on your local machine.

### Prerequisites
1. **Node.js**: Ensure Node.js is installed on your system.
2. **MySQL Server**: Ensure you have a local MySQL server running (e.g., via XAMPP, WAMP, or MySQL Workbench).

### Step 1: Configure the Database
1. Open the project folder in your code editor.
2. Navigate to `backend/.env`.
3. Update the `DB_PASSWORD` variable to match your local MySQL root password. 
   *(Note: If you are using a fresh XAMPP installation, the password is usually left completely blank: `DB_PASSWORD=`)*.

**You do NOT need to create any databases manually.** The backend will automatically create the `community_compass` database and all necessary tables the first time it starts!

### Step 2: Install Dependencies
Open a terminal in the **root folder** of the project and run the following shortcut command to install dependencies for the root, frontend, and backend simultaneously:
```bash
npm run install:all
```
*(If the shortcut above fails, manually run `npm install` inside the root folder, then `cd frontend && npm install`, and finally `cd ../backend && npm install`).*

### Step 3: Start the Servers
From the **root folder**, run:
```bash
npm run dev
```
This command uses `concurrently` to launch both the Express backend (Port 5000) and the React Vite frontend (Port 5173) at the exact same time.

### Step 4: Open the App
Once the terminal indicates the server is ready, open your web browser and navigate to:
```text
http://localhost:5173
```
You're all set! 🚀
