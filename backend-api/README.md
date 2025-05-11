
```markdown
# Backend API Documentation

## Project Structure

```

## Installation

```bash
npm install
```

## Starting the Server

```bash
npm start
```

Server will run on: `http://localhost:3000`

## API Endpoints

### 1. Save User

**Request Method**: POST  
**URL**: `http://localhost:3000/api/user/`  
**Payload**:
```json
{
    "name": "Tushar sarin",
    "age": 23,
    "mobile": "8710704094",
    "email": "tusharsarin23@gmail.com",
    "interest": [
        "hockey",
        "music",
        "coding"
    ]
}
```

### 2. Fetch All Users

**Request Method**: GET  
**URL**: `http://localhost:3000/api/users`

### 3. Fetch User by ID

**Request Method**: GET  
**URL**: `http://localhost:3000/api/user/1`

### 4. Update User

**Request Method**: PUT  
**URL**: `http://localhost:3000/api/user/1`  
**Payload**:
```json
{
    "name": "Tushar Sarin",
    "age": 24,
    "mobile": "7610704094",
    "email": "tusharsarin478@gmail.com",
    "interest": [
        "hockey",
        "music",
        "coding"
    ]
}
```

### 5. Delete User

**Request Method**: DELETE  
**URL**: `http://localhost:3000/api/user/1`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=your_database_port
```

## Dependencies

All dependencies will be installed automatically when running `npm install`. The main dependencies include:

- Express.js
- PostgreSQL client
- Body-parser
- Dotenv
- Validator libraries

