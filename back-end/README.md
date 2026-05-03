# Phonebook Backend

The backend project provides the REST API for the Phonebook application. It manages authentication, users, companies, posts, rules, and member contact records.

## Author

Zahra Jafarifard

## Tech Stack

- Node.js
- Express
- Sequelize
- MySQL
- JSON Web Tokens
- bcryptjs
- Multer
- dotenv

## Main Responsibilities

- Connect to a MySQL database through Sequelize
- Define data models for users, members, companies, posts, and rules
- Expose API routes for application resources
- Handle user login and token-based authentication
- Manage server configuration through environment variables

## Folder Structure

```text
back-end/
+-- controller/   # Request handlers and business logic
+-- model/        # Sequelize database models and connection setup
+-- routes/       # Express route definitions
+-- shared/       # Shared middleware and helpers
+-- index.js      # Application entry point
`-- package.json  # Backend dependencies and scripts
```

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

Create a `.env` file from `.env.example` and configure these values:

```text
PORT=4000
DB_NAME=phoneBook
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=replace-with-a-secure-secret
```

## Available Scripts

- `npm start` - run the server with Node
- `npm run dev` - run the server with Nodemon

## Notes

The real `.env` file and runtime logs are excluded from Git to keep credentials and local output out of the repository.

