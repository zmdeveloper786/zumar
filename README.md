# Zumar Law Firm

A full-stack web application for managing legal services and client interactions.

## Features

- User authentication (Local & Google OAuth)
- Password reset functionality
- Service management
- Client dashboard
- Responsive design

## Tech Stack

- Frontend: React.js with Vite
- Backend: Node.js & Express
- Database: MongoDB
- Authentication: JWT & Passport
- Styling: Tailwind CSS

## Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd ZumarLawFirm
```

2. Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables
- Create .env files in both client and server directories
- Add necessary environment variables

4. Run the application
```bash
# Run server
cd server
npm start

# Run client
cd ../client
npm run dev
```

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
