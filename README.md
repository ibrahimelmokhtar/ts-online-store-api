<!-- Project title -->
# Online Store API

<!-- Describe your project in brief -->
Build a Storefront Backend - Advanced Web Development egFWD - Second Project

This project was structured from scratch, with ONLY a REQUIREMENTS.md file.

# Table of contents

- [Online Store API](#online-store-api)
- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Development](#development)
  - [Architecture](#architecture)
  - [API Endpoints](#api-endpoints)
- [Installed NPM Packages](#installed-npm-packages)
  - [Production Packages](#production-packages)
  - [Development Packages](#development-packages)

# Installation

[(Back to top)](#table-of-contents)

To use this project, you need to follow the commands below:

# Development

[(Back to top)](#table-of-contents)
This section will explain **how the code works** and **how everything is put together.**

## Architecture

[(Back to top)](#table-of-contents)

This project has the structure shown below:

```ts
├─── docs/
    ├─── REQUIREMENTS.md
├─── spec/
    ├─── support/
        ├─── jasmine.json
├─── src/
    ├─── config/
        ├─── server.config.ts
    ├─── controllers/
        ├───
    ├─── helpers/
        ├─── reporter.ts
    ├─── middlewares/
        ├───
    ├─── models/
        ├───
    ├─── routes/
        ├─── __tests__/
            ├─── index.spec.ts
            ├─── orders.spec.ts
            ├─── products.spec.ts
            ├─── users.spec.ts
        ├─── api/
            ├─── orders.route.ts
            ├─── products.route.ts
            ├─── users.route.ts
        ├─── index.ts
    ├─── schemas/
        ├───
    ├─── types/
        ├─── __tests__/
            ├─── order.type.spec.ts
            ├─── product.type.spec.ts
            ├─── user.type.spec.ts
        ├─── order.type.ts
        ├─── product.type.ts
        ├─── user.type.ts
    ├─── server.ts
├─── .eslintrc
├─── .gitignore
├─── .prettierrc
├─── example.env
├─── package.json
├─── README.md
├─── tsconfig.json
```

## API Endpoints

[(Back to top)](#table-of-contents)

This API has **FOUR** endpoints using the `GET` method as explained below:

# Installed NPM Packages

[(Back to top)](#table-of-contents)

These packages are required to run this project smoothly without any errors.

## Production Packages

These packages can be found in the `"dependencies"` object inside the `package.json` file.

- [cors](https://www.npmjs.com/package/cors) - Node.js CORS middleware.
- [db-migrate](https://www.npmjs.com/package/db-migrate) - Database migration framework for node.js.
- [db-migrate-pg](https://www.npmjs.com/package/db-migrate-pg) - A postgresql driver for db-migrate.
- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from .env file.
- [express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework.
- [helmet](https://www.npmjs.com/package/helmet) - Help secure Express/Connect apps with various HTTP headers.
- [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js.
- [pg](https://www.npmjs.com/package/pg) - PostgreSQL client.

## Development Packages

These packages can be found in the `"devDependencies"` object inside the `package.json` file.

- [@types/express](https://www.npmjs.com/package/@types/express) - TypeScript definitions for Express.
- [@types/jasmine](https://www.npmjs.com/package/@types/jasmine) - TypeScript definitions for Jasmine.
- [@types/morgan](https://www.npmjs.com/package/@types/morgan) - TypeScript definitions for morgan.
- [@types/supertest](https://www.npmjs.com/package/@types/supertest) - TypeScript definitions for SuperTest.
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) - An ESLint custom parser which leverages TypeScript ESTree.
- [eslint](https://www.npmjs.com/package/eslint) - An AST-based pattern checker for JavaScript.
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) - Turns off all rules that are unnecessary or might conflict with Prettier.
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier) - Runs prettier as an eslint rule.
- [jasmine](https://www.npmjs.com/package/jasmine) - CLI for Jasmine, a simple JavaScript testing framework for browsers and Node.
- [jasmine-spec-reporter](https://www.npmjs.com/package/jasmine-spec-reporter) - Spec reporter for jasmine behavior-driven development framework.
- [prettier](https://www.npmjs.com/package/prettier) - Prettier is an opinionated code formatter.
- [supertest](https://www.npmjs.com/package/supertest) - SuperAgent driven library for testing HTTP servers.
- [tsc-watch](https://www.npmjs.com/package/tsc-watch) - The TypeScript compiler with onSuccess command.
- [typescript](https://www.npmjs.com/package/typescript) - TypeScript is a language for application scale JavaScript development.
