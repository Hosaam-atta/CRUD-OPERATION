# Courses & Users REST API

A Node.js and Express API for managing courses and user accounts, with MongoDB persistence through Mongoose. The repository includes course CRUD handlers, registration and login, JWT middleware, role checks, and an image-upload route.

## Technology

Node.js · Express 5 · MongoDB · Mongoose · JSON Web Token · bcryptjs · Multer · express-validator

The active controllers use MongoDB. `database/dp.js` and commented controller examples contain PostgreSQL experiments; PostgreSQL is not required for the current API.

## Run locally

Install Node.js and have a local or hosted MongoDB database available.

```bash
git clone https://github.com/Hosaam-atta/CRUD-OPERATION.git
cd CRUD-OPERATION
npm ci
```

Create a local `.env` file:

```dotenv
MONGOO_URL=mongodb://127.0.0.1:27017/courses_api
TOKEN_SECRIT_KEY=replace-with-a-long-random-secret
```

These variable names match the implementation. Keep `.env` outside version control.

```bash
npm start
```

The server listens at `http://localhost:3000`. `npm start` uses Nodemon; `node index.js` runs without the watcher.

## Routes

| Method | Route | Purpose / current access |
| --- | --- | --- |
| GET | `/api/Courses?limit=10&page=1` | List courses |
| GET | `/api/Courses/:CourseId` | Read one course |
| POST | `/api/Courses` | Create a course; JWT and manager role required |
| PATCH | `/api/Courses/:CourseId` | Update a course |
| DELETE | `/api/Courses/:CourseId` | Delete a course; JWT and admin or manager role required |
| POST | `/api/users/register` | Register; accepts multipart field `avatar` |
| POST | `/api/users/login` | Log in with email and password |
| GET | `/api/users?limit=10&page=1` | List users; JWT required |
| GET | `/upload/:filename` | Serve an uploaded file |

For protected requests, send the raw JWT in the `Authorization` header; the current middleware does not strip a `Bearer` prefix. Tokens expire after 60 seconds. Course payloads contain `title` and `price`; registration uses `firstName`, `lastName`, `email`, and `password`. The manager role string in code is `manger`.

```bash
curl 'http://localhost:3000/api/Courses?limit=10&page=1'
```

## Structure

```text
Controller/     Course and user request handlers
Router/         Express routes and upload configuration
models/         Mongoose course and user schemas
middlewares/    JWT, roles, validation rules, async error wrapper
utils/          Status constants, roles, JWT generation
database/       PostgreSQL connection experiment
upload/         Local upload storage
index.js        Application entry point
```

## Implementation notes

This repository is a development API. Course PATCH currently has no authorization middleware. Registration accepts a role from the request, and user responses need field filtering before public use. Course creation references `validationResult` without importing it and checks validation after saving. Avatar files are accepted by the route, but the controller does not store their path on the user record. Review these behaviors before exposing the API publicly.

`npm test` is currently a placeholder, not an automated test suite.
