# TicketSystem API

## Overview
A high-performance backend infrastructure designed to automate event access control and student eligibility verification. Built using Node.js and Express, this system integrates Prisma ORM with MySQL to manage student records, recurring payment cycles, and secure ticket generation.

## Features
- Node.js & Express: Scalable RESTful API architecture
- Prisma ORM: Type-safe database management and migrations
- JSON Web Tokens (JWT): Secure, stateless authentication with cookie-based storage
- Node-Cron: Automated background jobs for real-time payment status synchronization
- Redis: Optimized data handling and caching capabilities
- Express-Rate-Limit: Integrated middleware to prevent brute-force attacks and API abuse
- Role-Based Access Control (RBAC): Granular permission layers for Admin and User roles

## Getting Started
### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Onyedika1234/ticket-system.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ticket-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Synchronize the database schema:
   ```bash
   npx prisma migrate dev
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Variables
Create a `.env` file in the root directory and include the following:
```env
PORT=3000
DATABASE_URL="mysql://username:password@localhost:3306/ticket_db"
JWT_SECRET="your_secure_random_string"
JWT_EXPIRES_IN="7d"
FEES=5000
ADMIN_PASSWORD="your_admin_setup_password"
```

## API Documentation
### Base URL
`http://localhost:3000/v1`

### Endpoints

#### POST /auth/signup
**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "department": "SCIENCE",
  "programme": "UTME"
}
```
*Valid Departments: SCIENCE, ARTS, COMMERCIAL*
*Valid Programmes: WAEC, NECO, GCE, UTME, POST_UTME, JUPEB*

**Response**:
```json
{
  "success": true,
  "message": "Account created Successfully",
  "user": {
    "id": "uuid-string",
    "name": "John Doe",
    "email": "john@example.com",
    "department": "SCIENCE",
    "programme": "UTME"
  }
}
```

**Errors**:
- 400: Email already in use / Input all credentials
- 429: Unprocessable entities

#### POST /auth/login
**Request**:
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "User logged in Successfully"
}
```

**Errors**:
- 404: User not found
- 400: Invalid Credentials

#### POST /auth/logout
**Request**:
No payload required (Clears auth cookie).

**Response**:
204 No Content

#### GET /user/profile
**Request**:
Requires authentication cookie.

**Response**:
```json
{
  "success": true,
  "profile": {
    "name": "John Doe",
    "email": "john@example.com",
    "department": "SCIENCE",
    "programme": "UTME",
    "role": "USER"
  }
}
```

#### PATCH /user/update_role
**Request**:
```json
{
  "password": "your_admin_setup_password"
}
```

**Response**:
```json
{
  "success": true,
  "message": "You are now an admin"
}
```

#### GET /students
**Request**:
Requires Admin privileges.

**Response**:
```json
{
  "success": true,
  "students": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "department": "SCIENCE",
      "programme": "UTME"
    }
  ]
}
```

#### POST /payments/:studentId
**Request**:
```json
{
  "amount": 15000
}
```

**Response**:
```json
{
  "message": "Payment record created successfully",
  "payment": {
    "id": "uuid",
    "userId": "student-uuid",
    "amount": 15000,
    "startDate": "2023-10-01T...",
    "endDate": "2024-01-01T...",
    "duration": 90
  }
}
```

#### GET /ticket
**Request**:
Requires authenticated user with `PAID` status.

**Response**:
```json
{
  "status": "success",
  "ticket": {
    "id": "ticket-uuid",
    "name": "John Doe",
    "programme": "UTME",
    "department": "SCIENCE",
    "createdAt": "2023-10-01T..."
  }
}
```

**Errors**:
- 403: Forbidden: Payment required
- 403: Forbidden: Users only (Admins cannot generate tickets)

## Technologies Used
| Technology | Purpose | Link |
| :--- | :--- | :--- |
| Node.js | Runtime Environment | [Link](https://nodejs.org/) |
| Express | Web Framework | [Link](https://expressjs.com/) |
| Prisma | ORM | [Link](https://www.prisma.io/) |
| MySQL | Database | [Link](https://www.mysql.com/) |
| Redis | Caching | [Link](https://redis.io/) |
| JWT | Authentication | [Link](https://jwt.io/) |

## Contributing
- 🛠️ Fork the repository and create your branch.
- 🧹 Follow the established code style and DTO patterns.
- 🧪 Ensure all database migrations are documented.
- 📝 Submit a pull request with a detailed description of changes.

## Author Info
- **LinkedIn**: [Onyedika - Placeholder](https://linkedin.com/in/)
- **Twitter**: [@Onyedika_Placeholder](https://twitter.com/)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)