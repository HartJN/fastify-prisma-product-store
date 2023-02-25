# Products Backend (Fastify, Prisma)

This is a TypeScript-based web server for managing products with user authentication. It uses Fastify as the web server, Prisma as the database ORM, Zod for request and response validation, and Swagger for API documentation.

## Tech Stack

- Fastify - Web server
- Prisma - Database ORM
- Zod - Request and response validation
- Swagger - API docs
- TypeScript

## Features

- Create a user
- Login
- List users
- Create a product
- List products
- Authentication
- Request & response validation
- Swagger docs

## Installation and Usage

1. Clone the repository:

```bash
git clone https://github.com/HartJN/fastify-prisma-product-store.git
```

2. Create a .env file and add your PostgreSQL database URL:

```bash
DATABASE_URL=your-postgresql-database-url
```

3. Install dependencies:

```bash
yarn
```

4. Run the server:

```bash
yarn dev
```

The server will be hosted at http://localhost:3000.

## Testing

The project uses Node Tap as the test framework, fastify.inject to inject HTTP requests, Faker-js to generate test data, and ts-mock-imports to mock imports.

To run the tests, use:

```bash
yarn test
```

## API Documentation

The project uses Swagger for API documentation. To access the Swagger UI, go to `http://localhost:3000/docs` in your web browser.
