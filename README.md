# LovelyStay Backend Challenge

## Description

This project is a backend challenge that utilizes various technologies such as TypeORM for database migrations, pg-promise for database interaction, and other utilities like `dotenv` for environment variable management.

## Requirements

Before running this project, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 16.x or higher)
- [Docker](https://www.docker.com/) (if you want to run it with Docker)
- [Docker Compose](https://docs.docker.com/compose/) (for orchestrating containers)

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd lovelystay-backend-challenge
```

### 2. Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### 3. Environment Configuration

Ensure you have a `.env` file in the root directory of the project for any environment-specific variables (such as database credentials). The project uses the `dotenv` library to load environment variables.

You can use the sample `.env.example` file if it's available or create your own.

### 4. Running with Docker (Optional)

If you prefer to run the project in a containerized environment, you can use Docker.

Run the following command to start the Docker containers:

```bash
npm run docker:up
```

This will launch the project with Docker Compose in detached mode.

### 5. Running Migrations

```bash
npm run migration:run
```

This will run migrations in your database.

### 6. Running the Project Locally

To run the project locally, execute the following command:

```bash
npm start
```

This will use `ts-node` to execute the `src/main.ts` file.

## Available Scripts

Here are the available scripts in the project:

- `npm run migration:create`: Create a new migration.
- `npm run migration:run`: Run the migrations.
- `npm run docker:up`: Start the project in Docker containers.
- `npm start`: Start the project locally using `ts-node`.
