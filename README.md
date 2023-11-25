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
Example: DATABASE_URL="mongodb+srv://user-db@cluster0.2boounk.mongodb.net/collection-name?retryWrites=true&w=majority"

**JWT_SECRET**
Example: JWT_SECRET="secret-key for jwt token"

**ADMIN_KEY**
Example: ADMIN_KEY="Key When ADMIN Role Register"

**GMAIL_ACC**
Example: GMAIL_ACC="your email for mailing, for example, if the user forgot his password, send him a new one"

**GMAIL_PASS**
Example: GMAIL_PASS="password from your mail"

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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
