

```markdown
# FullStack CRUD Application with Next.js and Express

This is a Dockerized FullStack application featuring:
- Frontend: Next.js (App Router) with TypeScript
- Backend: Express.js with TypeScript
- Database: PostgreSQL
- RESTful API endpoints
- Complete CRUD operations for User management
```
## Prerequisites

- Docker Desktop installed ([Download Docker](https://www.docker.com/products/docker-desktop))
- Node.js v16 or higher ([Download Node.js](https://nodejs.org/))
- PostgreSQL client (optional for database inspection)

## Installation

### Using Docker (Recommended)

```bash
# Clone the repository
git clone <your-repository-url>
cd <repository-folder>

# Build and start all containers
docker-compose up --build
```

### Without Docker (Development Only)

```bash
# Backend setup
cd backend
npm install
npm run build

# Frontend setup
cd ../frontend
npm install
```

## Running the Application

### With Docker (Production)

```bash
# Start all services in detached mode
docker-compose up -d

# Stop all services
docker-compose down
```

### Development Mode

```bash
# Backend (with hot-reload)
cd backend
npm run dev

# Frontend (in separate terminal)
cd ../frontend
npm run dev
```

## Access the Application

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000/api
- API Documentation:
  - `GET /api/users` - List all users
  - `GET /api/user/:id` - Get single user
  - `POST /api/user` - Create new user
  - `PUT /api/user/:id` - Update user
  - `DELETE /api/user/:id` - Delete user

## Docker Commands Cheatsheet

```bash
# Build specific service
docker-compose build backend
docker-compose build frontend

# View running containers
docker ps

# View logs
docker-compose logs -f backend

# Access database (PostgreSQL)
docker-compose exec db psql -U postgres userdb

# Rebuild and restart backend
docker-compose up -d --no-deps --build backend
```

## Project Structure

```
.
├── backend/               # Express.js API
│   ├── src/               # TypeScript source
│   ├── Dockerfile         # Backend container config
│   └── package.json
├── frontend/              # Next.js App
│   ├── src/app/           # App Router
│   ├── Dockerfile         # Frontend container config
│   └── package.json
├── docker-compose.yml     # Multi-container setup
└── README.md
```

## Environment Variables

Create `.env` files as needed:

**backend/.env**
```
# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=root
DB_NAME=postgres


# App Configuration
PORT=3000
NODE_ENV=development

```

**frontend/.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Troubleshooting

1. **Port Conflicts**:
   - Ensure ports 3000 (backend) and 3001 (frontend) are available

2. **Database Issues**:
   ```bash
   docker-compose down -v  # Removes volumes
   docker-compose up --build
   ```

3. **CORS Errors**:
   - Verify backend CORS configuration matches frontend URL

4. **Container Cleanup**:
   ```bash
   docker system prune -a
   ```

## Development Workflow

1. Make code changes
2. Frontend auto-reloads on changes
3. For backend changes in dev mode:
   ```bash
   docker-compose restart backend
   ```

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd ../frontend
npm test
```
