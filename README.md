# Fractal UI

## Development

### Prerequisites

[pnpm](https://pnpm.io/)

1. Install the project's dependencies:
```shell
pnpm install
```

2. Create an `.env` file in the root of the project and add a `DATABASE_URL` variable, i.e.:
```shell
DATABASE_URL="file:./dev.db"
```

3. Run Prisma's `migrate` command to bootstrap the SQLite database.
```shell
pnpm prisma migrate dev
```

4. Seed the database with some sample data (optional):
```shell
pnpm prisma db seed
```

5. Start the application in development mode:
```shell
pnpm run dev
```
