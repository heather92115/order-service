# Mts - Prisma and Postgres Documentation

## Set up

Create database:
```sh
docker-compose -p treatment-service up -d postgres-12x
psql -U postgres -h localhost -c 'CREATE DATABASE medication_treatment_service;' -p 5434
```


## Creating a Migration

The instructions for creating migration scripts is based on [Prisma's documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate/get-started).

1. Modify [Prisma's schema](../prisma/schema.prisma)
2. Run `npm run db:newmigration` to auto-generate the needed SQL
3. Run `npm run db:migrate` to deploy the new migration to the database.
   1. If you need to regenarate the prisma models run `npx prisma migrate dev`


## Refreshing database

There are two methods for resetting the database. Just know both of the methods will completely reset all data in the database

### Reset with connection queries

1. Close all connections to the database
2. `psql -U postgres -h localhost -c 'DROP DATABASE order_service;' -p 5434 `
3. `psql -U postgres -h localhost -c 'CREATE DATABASE order_service;' -p 5434`
4. `yarn setup`

### Resetting with prisma

`yarn reset:db`

This will reset the database with seed information. Seed information comes from [Prisma Seed data](../prisma/seed.ts)

More on Seeding later

`yarn reset:db:force`

This command will reset the database without seed information as this will create a blank database without running the seed command

## Prisma Migration Naming Conventions

- [Adhering to Prisma's Naming Conventions](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/use-custom-model-and-field-names)
- [Model Naming Conventions](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#naming-conventions)

