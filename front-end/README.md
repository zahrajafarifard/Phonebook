# Phonebook Frontend

The frontend project is the React client for the Phonebook application. It provides the user interface for authentication, viewing and managing phonebook contacts, and working with related company and post data.

## Author

Zahra Jafarifard

## Tech Stack

- React
- React Router
- Redux Toolkit
- React Redux
- Redux Persist
- React Hook Form
- Tailwind CSS
- Create React App

## Main Responsibilities

- Render the phonebook user interface
- Manage client-side routing and layouts
- Store application state with Redux
- Persist selected state across browser sessions
- Submit forms and fetch API data from the backend
- Organize reusable shared request helpers

## Folder Structure

```text
front-end/
+-- public/       # Static public assets
+-- src/          # React source code
+-- src/assets/   # Images, SVGs, and fonts
+-- src/components/ # Feature components and pages
+-- src/shared/   # Shared fetch and submit helpers
+-- src/store/    # Redux actions and reducer
+-- package.json  # Frontend dependencies and scripts
`-- tailwind.config.js
```

## Getting Started

```bash
npm install
cp .env.example .env
npm start
```

## Environment Variables

Create a `.env` file from `.env.example` and configure the backend API URL:

```text
REACT_APP_URL=http://localhost:4000
```

## Available Scripts

- `npm start` - run the React development server
- `npm run build` - create a production build
- `npm test` - run the test suite
- `npm run eject` - expose Create React App configuration

## Notes

The real `.env` file is excluded from Git so local and production API URLs can be managed safely.

