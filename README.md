<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Endpoints

- Register New User
- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Content-Type:** `application/json`

```json
{
	"email": "your-email",
	"name": "your-name",
	"role": "USER or ADMIN",
	"password": "your-password"
}
```

---

- Login User
- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Content-Type:** `application/json`

```json
{
	"email": "your-email",
	"password": "your-password"
}
```

---

- Refresh Token
- **URL:** `/api/auth/login/access-token`
- **Method:** `POST`
- **Content-Type:** `application/json`

```json
{
	"refreshToken": "your-refresh-token"
}
```

---

- Forgot Password
- **URL:** `/api/auth/forgot-password`
- **Method:** `POST`
- **Content-Type:** `application/json`

```json
{
	"email": "your-email"
}
```

---

- Logout
- **URL:** `/api/auth/logout`
- **Method:** `POST`

---

- Get All Tasks
- **URL:** `/api/tasks`
- **Method:** `GET`

---

- Create Task
- **URL:** `/api/tasks`
- **Method:** `POST`
- **Content-Type:** `application/json`

```json
{
	"title": "task-title",
	"description": "task-description",
	"status": "NEW | IN_PROGRESS | PENDING | DONE",
	"userId": "user-id"
}
```

---

- Update Task
- **URL:** `/api/tasks/user-id`
- **Method:** `PUT`
- **Content-Type:** `application/json`

```json
{
	"title": "task-title",
	"description": "task-description",
	"userId": "user-id"
}
```

---

- Update Task Status
- **URL:** `/api/tasks/user-id/status`
- **Method:** `PATCH`
- **Content-Type:** `application/json`

```json
{
	"status": "NEW | IN_PROGRESS | PENDING | DONE"
}
```

---

- Delete Task
- **URL:** `/api/tasks/task-id`
- **Method:** `DELETE`

---

- Filter Tasks
- **URL:** `/api/tasks/filter?status=DONE | NEW | IN_PROGRESS`
- **Method:** `GET`
- **Content-Type:** `application/json`

---

- Get All User
- **URL:** `/api/users`
- **Method:** `GET`

---

- Get Uer
- **URL:** `/api/users/profile/user-id`
- **Method:** `GET`

---

- Update User
- **URL:** `/api/users/profile/user-id`
- **Method:** `PUT`
- **Content-Type:** `application/json`

```json
{
	"email": "user-email",
	"name": "user-name",
	"avatarPath": "user-photo"
}
```

---

- Get User Tasks
- **URL:** `/api/tasks/user-id`
- **Method:** `GET`
- **Content-Type:** `application/json`

---

- Update Task Order For User List
- **URL:** `/api/users/profile/user-id/tasks`
- **Method:** `PATCH`
- **Content-Type:** `application/json`

```json
{
	"tasks": "must be array old tasks reformat to new order but still the same tasks"
}
```

---

- Update User Password
- **URL:** `/api/users/profile/user-id/password`
- **Method:** `PATCH`
- **Content-Type:** `application/json`

```json
{
	"oldPassword": "old-user-password",
	"newPassword": "new-user-password"
}
```

## Environment Variables

**DATABASE_URL**
Database for connect.

```env
Example: DATABASE_URL="mongodb+srv://user-db@cluster0.2boounk.mongodb.net/collection-name?retryWrites=true&w=majority"
```

**PORT**
If you need this you can change it. Default 3333.

**JWT_SECRET**
Secret Key For JWT Token.

```env
Example: JWT_SECRET="secret-key"
```

**ADMIN_KEY**
Admin Key For Register Admin.

```env
Example: ADMIN_KEY="Key When ADMIN Role Register"
```

**GMAIL_ACC**
Your email for mailing, for example, if the user forgot his password, send him a new one.

```env
Example: GMAIL_ACC="your-email"
```

**GMAIL_PASS**
Password for your mail.

```env
Example: GMAIL_PASS="password from your mail"
```

**CLIENT_URL**
Client url for cors.

```env
Example: GMAIL_PASS="http://localhost:5173"
```

## Description

The Task Manager API is a powerful and user-friendly application built with Nest JS, featuring various technologies to streamline task management.

## Key Features

- **JWT Token Authentication:** Secure your API with JSON Web Tokens for reliable user authentication and authorization.
- **Prisma:** Leverage Prisma as the database toolkit to interact seamlessly with your database, ensuring data integrity and efficiency.
- **Passport & Passport JWT:** Implement Passport for easy authentication and Passport JWT for handling JSON Web Tokens, making user authentication a breeze.
- **Class Validator:** Utilize Class Validator to ensure the integrity of incoming data, validating and sanitizing user inputs effectively.
- **Mailer & Nodemailer:** Enable email notifications and communication using Mailer and Nodemailer, enhancing user engagement and interaction.

## Database Flexibility

For example, this API is configured with a MongoDB database. However, thanks to Prisma, you have the flexibility to seamlessly switch to any other database without altering the code. Whether you prefer PostgreSQL, MySQL, or another database system, Prisma simplifies the process.

Whether you're a developer looking to understand these technologies better or a user aiming for a straightforward yet powerful task management experience, the Task Manager API provides a robust solution.

Explore the documentation to get started and make the most of the features offered by this Nest JS-powered API.

---

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Stay in touch

- Author - [Oleg Gvozd](https://www.facebook.com/profile.php?id=100003291303734)
- Website - [LinkedIn](https://www.linkedin.com/in/oleg-gvozd-20a16116a/)
- Instagram - [@gvozd_oleg](https://www.instagram.com/gvozd_oleg/)
