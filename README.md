# Help Desk Support Ticket System
[Deployment](https://hifi-coding-challenge.vercel.app/)

## Project Overview

This is a basic help desk support ticket management system built with Next.js (frontend) and Express.js (backend). The application allows users to submit support tickets and support staff to manage these tickets through an admin panel.

## Features

- **User Features:**
  - Submit support tickets with name, email, and problem description
  - Receive confirmation when tickets are submitted

- **Admin Features:**
  - View all tickets with filtering by status
  - View detailed information for each ticket
  - Update ticket status ("new", "in progress", "resolved")
  - Respond to tickets and view conversation history

## Tech Stack

- **Frontend:**
  - Next.js
  - TypeScript
  - Tailwind CSS
  - React Hooks for state management

- **Backend:**
  - Express.js
  - TypeScript
  - MongoDB (using Mongoose)
  - RESTful API architecture

## Project Structure

### Backend (`help-desk-backend`)

```
help-desk-backend/
├── src/
│   ├── config/        (Database configuration)
│   ├── controllers/   (Request handlers)
│   ├── middleware/    (Error handling middleware)
│   ├── models/        (Database schemas)
│   ├── routes/        (API routes)
│   ├── utils/         (Helper functions)
│   ├── types/         (TypeScript type definitions)
│   ├── app.ts         (Express application setup)
│   └── server.ts      (Server entry point)
├── .env               (Environment variables)
├── package.json       (Project dependencies)
└── tsconfig.json      (TypeScript configuration)
```

### Frontend (`help-desk-frontend`)

```
help-desk-frontend/
├── src/
│   ├── app/           (Next.js app directory)
│   │   ├── page.tsx            (User ticket submission page)
│   │   ├── admin/              (Admin pages)
│   │   │   ├── page.tsx        (Admin dashboard)
│   │   │   └── ticket/[id]/    (Ticket detail page)
│   │   └── api/                (API routes for proxying)
│   ├── components/    (Reusable components)
│   │   └── Layout.tsx          (Page layout component)
│   └── utils/         (Utility functions)
│       └── api.ts              (API client functions)
├── package.json       (Project dependencies)
└── tsconfig.json      (TypeScript configuration)
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Docker container)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd help-desk-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with:
   ```
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/help-desk
   NODE_ENV=development
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. The API should be running at http://localhost:4000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd help-desk-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. The application should be running at http://localhost:3000

## API Endpoints

### Tickets

- `GET /api/tickets` - Get all tickets (with optional status filter)
- `POST /api/tickets` - Create a new ticket
- `GET /api/tickets/:id` - Get a specific ticket
- `PUT /api/tickets/:id` - Update ticket status

### Responses

- `GET /api/tickets/:id/responses` - Get all responses for a ticket
- `POST /api/tickets/:id/responses` - Add a response to a ticket

## Deployment

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variables (MONGODB_URI, NODE_ENV)

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Import your project on Vercel
3. Set environment variables if needed
4. Deploy

## Usage

### User Flow

1. Go to the homepage
2. Fill in the form with name, email, and description
3. Submit the ticket
4. Receive confirmation

### Admin Flow

1. Go to `/admin`
2. View all tickets
3. Filter tickets by status if needed
4. Click on a ticket to view details
5. Update ticket status
6. Add responses to the ticket

## Development Notes

- The backend uses MongoDB for data storage
- Authentication is not implemented (would be a good next step)
- Email sending is simulated with console.log statements
- The frontend communicates directly with the backend API
- Next.js API routes are set up as proxies (useful for deployment)

## Troubleshooting

- If you encounter a MongoDB connection error, make sure MongoDB is running
- If you see CORS errors, check the CORS configuration in the backend
- If the frontend can't connect to the backend, verify API_BASE_URL in `api.ts`

## Next Steps

- Add authentication for admin access
- Implement actual email notifications
- Add file attachment support for tickets
- Create user dashboard for ticket tracking
- Add pagination for tickets and responses​​​​​​​​​​​​​​​​# Help Desk Support Ticket System
