# Player Shifts Management

This is a project for managing player shifts, consisting of a backend built with Node.js and TypeScript, and a frontend built with React and Next.js.

## Project Structure

## Prerequisites

- Docker
- Docker Compose
- Node.js
- Yarn

## Setup

1. **Clone the repository**:
    ```sh
    git clone git@github.com:aashisr/player-shifts-management.git
    cd player-shifts-management
    ```

2. **Set up environment variables**:
	```
	cp .env.example .env
	cd backend
	cp .env.example .env
	```
## Running the Project

1. **Build and start the services**:
    ```sh
    docker-compose up -d
    ```

2. **Access the frontend**:
    - Open your browser and navigate to `http://localhost:3000`

3. **Access the backend**:
    - The backend server will be running on `http://localhost:5000`