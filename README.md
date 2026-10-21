# File Upload App

A RESTful API for file upload and media management, built with Node.js, Express.js, and MongoDB. The application provides user authentication and protected endpoints for managing uploaded files.

## 🚀 Features

- **User Authentication:** Register, login, and logout.
- **JWT Authentication:** Protect file management endpoints.
- **File Upload:** Upload files using Multer middleware.
- **File Management:** Retrieve all files, get a file by ID, update file information, and delete files.
- **User Ownership:** Associate uploaded files with their owners.
- **File Metadata:** Store file name, path, size, and type.
- **Visibility Control:** Support public/private file status.
- **Soft Delete Support:** Track deleted files using an `isDeleted` flag.
- **MongoDB Integration:** Store user and file data using Mongoose.
- **Environment Configuration:** Manage configuration through environment variables.

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- JSON Web Token (JWT)
- bcryptjs
- dotenv

## 📁 Project Structure

```text
file-upload-app/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authcontroller.js
│   │   └── filecontroller.js
│   ├── Middleware/
│   │   ├── authencation.middleware.js
│   │   └── multer.middleware.js
│   ├── models/
│   │   └── File.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── file.routes.js
│   └── app.js
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/fahdkhodair/file-upload-app.git
cd file-upload-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/file-sharing-app
JWT_SECRET=your_secure_secret
```

Replace the example values with your own configuration. Make sure MongoDB is running and the environment variable names match those used in your source code.

### 4. Run the application

Development mode:

```bash
npm run dev
```

Production start:

```bash
npm start
```

The server will run on:

```text
http://localhost:3000
```

## 📡 API Endpoints

### Authentication

Base URL: `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Log in a user |
| POST | `/logout` | Log out a user |

### File Management

Base URL: `/api/files`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/upload` | Upload a file |
| GET | `/` | Retrieve all files |
| GET | `/:id` | Retrieve a file by ID |
| PUT | `/:id` | Update file information |
| DELETE | `/:id` | Delete a file |

**Note:** File management routes require authentication. Send the access token using the authentication format implemented by the application.

## 🔐 Security

- Password hashing with bcryptjs.
- JWT-based authentication.
- Protected file management routes.
- Environment variables for sensitive configuration.
- File ownership association.

## 🧪 Testing

You can test the API using Postman:

1. Register a new account.
2. Log in to obtain the authentication token.
3. Include the token in requests to protected endpoints.
4. Upload a file using `multipart/form-data`.
5. Test file retrieval, updating, and deletion.

## 👨‍💻 Author

**Fahd Khodair**

- GitHub: [@fahdkhodair](https://github.com/fahdkhodair)
- Project Repository: [file-upload-app](https://github.com/fahdkhodair/file-upload-app)

---

Built as part of my journey in Backend Development with Node.js and Express.js.
