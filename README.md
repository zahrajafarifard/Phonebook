# Phonebook

Phonebook is a full-stack contact management application with a React frontend and an Express/MySQL backend. It includes user authentication, company and role management, and member contact records.

## Author

Zahra Jafarifard

## Tech Stack

- Frontend: React, Redux Toolkit, React Router, Tailwind CSS
- Backend: Node.js, Express, Sequelize
- Database: MySQL
- Authentication: JSON Web Tokens

## Project Structure

```text
Phonebook/
+-- back-end/     # Express API, Sequelize models, routes, controllers
`-- front-end/    # React client application
```

Each project folder includes its own README with setup details and project-specific documentation.

## Getting Started

### Backend

```bash
cd back-end
npm install
cp .env.example .env
npm run dev
```

### Frontend

```bash
cd front-end
npm install
cp .env.example .env
npm start
```

## Environment Variables

Backend variables are documented in `back-end/.env.example`.

Frontend variables are documented in `front-end/.env.example`.

## Available Scripts

### Backend

- `npm start` - run the API server
- `npm run dev` - run the API server with Nodemon

### Frontend

- `npm start` - run the React development server
- `npm run build` - create a production build
- `npm test` - run the test suite

## Notes

Environment files, logs, dependencies, and build artifacts are intentionally excluded from version control.
