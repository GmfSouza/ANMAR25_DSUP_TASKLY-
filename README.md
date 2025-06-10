# TASKLY

Taskly is a simple RESTful API built with Node.js, Express, TypeORM, and MySQL. It allows you to manage tasks and notes, with features like creating, updating, deleting, and filtering tasks, as well as attaching notes to tasks. The API also supports pagination and filtering for better usability.

## Features

- Create, read, update, and delete (CRUD) tasks and notes.
- Filter tasks by `status`, `priority`, and `category`.
- Paginate task and note lists (`page` and `limit` query parameters).
- Attach notes to specific tasks and manage them separately.

## Prerequisites

Before you start, make sure you have the following installed on your machine:

- Node.js (version 16 or higher)
- npm (comes with Node.js)
- MySQL (version 5.7 or higher, if not using Docker)
- Git (to clone the repository)
- Docker and Docker Compose (optional, for running the app in containers)

## Getting Started

Follow these steps to set up and run the API on your local machine.

### 1. Clone the Repository

First, clone the repository to your local machine using Git:

```bash
git clone <repository-url>
cd ANMAR25_DSUP_TASKLY-
```

Replace `<repository-url>` with the actual URL of your repository.

### 2. Install Dependencies

The project uses several Node.js packages. Install them by running:

```bash
npm install
```

Here are the main dependencies required for the project:

- `express`: For building the RESTful API.
- `typeorm`: For database operations and migrations.
- `mysql2`: MySQL driver for Node.js.
- `zod`: For request validation.
- `dotenv`: For managing environment variables.
- `ts-node` and `typescript`: For running TypeScript code.

You can see the full list of dependencies in the `package.json` file.

### 3. Set Up the Database

You can set up the database in two ways: using a local MySQL installation or using Docker.

#### 3.1. Option 1: Local MySQL Installation

##### 3.1.1. Install MySQL

If you don't have MySQL installed, download and install it from the official website. Follow the installation instructions for your operating system.

##### 3.1.2. Create a Database

Log in to MySQL using the command line or a tool like phpMyAdmin:

```bash
mysql -u root -p
```

Enter your MySQL root password when prompted. Then, create a database for the project:

```sql
CREATE DATABASE taskapi;
```

##### 3.1.3. Configure Environment Variables

The API uses environment variables to connect to the database. Create a `.env` file in the root of the project by copying the example file:

```bash
cp .env.example .env
```

Edit the `.env` file with your MySQL credentials. It should look like this:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=taskapi
```

Make sure to replace `your_password` with your actual MySQL password.

#### 3.2. Option 2: Using Docker

If you prefer to use Docker, a `docker-compose.yml` file is provided to set up both the MySQL database and the API.

##### 3.2.1. Configure Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

The default values in `.env.example` are already set to work with the Docker Compose setup, so you shouldn't need to change them unless you want to customize the database credentials.

##### 3.2.2. Start the Containers

Run the following command to start the MySQL and API services:

```bash
docker-compose up -d
```

This will start the MySQL database (`tasklyapi_mysql`) and the API (`tasklyapi_app`) in the background.

### 4. Run Database Migrations

The project uses TypeORM to manage the database schema. Migrations are already set up to create the necessary tables (`tasks` and `notes`).

#### 4.1. Check Migration Configuration

The database connection is configured in `src/config/database.ts`. It uses the environment variables from the `.env` file to connect to MySQL. Ensure this file exists and looks like this:

```typescript
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
    synchronize: false,
    logging: false,
});
```

#### 4.2. Run Migrations

If you're using a local MySQL installation, run the following command:

```bash
npm run typeorm migration:run
```

If you're using Docker, run the migrations inside the API container:

```bash
docker exec -it tasklyapi_app npm run typeorm migration:run
```

This command uses the migrations defined in the `src/migrations/` directory to set up the database schema. You should see a confirmation that the migrations were applied successfully.

If you encounter any issues, double-check your `.env` file and ensure MySQL is running.

### 5. Start the API

#### 5.1. Local Installation

If you're not using Docker, start the API with:

```bash
npm run start
```

#### 5.2. Docker

If you're using Docker, the API is already running after `docker-compose up -d`. You can check the logs to confirm:

```bash
docker logs tasklyapi_app
```

You should see a message like:

```
Database connected successfully
Server running on port 3000
```

The API is now running at `http://localhost:3000`.

### 6. Test the API

You can test the API using tools like Postman or `curl`. Here are some example requests:

#### 6.1. Create a Task

```bash
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Task 1","description":"First task","status":"To-Do","priority":"High","category":"Work"}'
```

#### 6.2. Create a Note for a Task

```bash
curl -X POST http://localhost:3000/tasks/1/notes -H "Content-Type: application/json" -d '{"content":"This is a note"}'
```

#### 6.3. Get Tasks with Pagination and Filtering

```bash
curl "http://localhost:3000/tasks?status=To-Do&page=1&limit=2"
```

#### 6.4. Get Notes for a Task with Pagination

```bash
curl "http://localhost:3000/tasks/1/notes?page=1&limit=2"
```

#### 6.5. Test an Error Response (Task Not Found)

Try fetching a task that doesn't exist:

```bash
curl http://localhost:3000/tasks/999
```

**Expected Response**:

```json
{ "error": "task not found" }
```

### API Endpoints

#### Tasks

- `POST /tasks`: Create a new task.
- `GET /tasks`: List all tasks (supports `page`, `limit`, `status`, `priority`, and `category` query parameters for pagination and filtering).
- `GET /tasks/:id`: Get a specific task by ID.
- `GET /tasks/status/:status`: Get tasks by status (does not support pagination or additional filters).
- `PUT /tasks/:id`: Update a task.
- `DELETE /tasks/:id`: Delete a task.

#### Notes

- `POST /tasks/:taskId/notes`: Create a note for a task.
- `GET /tasks/:taskId/notes`: List notes for a task (supports `page` and `limit` query parameters).
- `GET /notes/:id`: Get a specific note by ID.
- `PUT /notes/:id`: Update a note.
- `DELETE /notes/:id`: Delete a note.

### Troubleshooting

- **Database Connection Error**: Ensure MySQL is running and your `.env` file has the correct credentials (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`). If using Docker, check the container logs with `docker logs tasklyapi_mysql`.
- **Migration Fails**: Check if the database `tasksapi` exists (or `notes_api` if using a local MySQL). Verify the migrations in `src/migrations/`. You can also try running `npm run typeorm migration:generate` to create new migrations if the schema has changed.
- **Port Conflict**: If port 3000 is in use, change the `PORT` in your `.env` file to another value (ex.: `PORT=3001`). If using Docker, also update the port mapping in `docker-compose.yml`.
- **Validation Errors**: If you get a `Validation failed` error, check the request body against the schema (`TaskSchema` or `NoteSchema`). For example, `title` and `content` are required fields.
