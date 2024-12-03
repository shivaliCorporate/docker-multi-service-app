# Multi-Service Dockerized Application with Angular & Mock Backend

This project demonstrates how to set up a multi-service application with Docker, which includes:

- **Angular frontend** app
- **Mock backend** using **JSON Server**
- Dockerized services for easy deployment and management

## Project Structure

The project is structured as follows:

```
docker-multi-service-app/ # Angular App
│
├── mock-backend/         # Mock backend files (JSON Server)
│   ├── server.js         # Mock backend setup using JSON Server
│   ├── db.json           # Fake database (JSON file)
├── docker-compose.yml    # Docker Compose file to run multi-container setup
├── Dockerfile            # Dockerfile for Angular app
└── README.md             # Project documentation
```

---

## Getting Started

### Step 1: Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/docker-multi-service-app.git
cd docker-multi-service-app
```

---

### Step 2: Build the Docker Images

#### Build the Mock Backend Image

Navigate to the `mock-backend` directory and build the Docker image for the mock backend:

```bash
cd mock-backend
docker build -t your-dockerhub-username/mock-backend .
```

#### Build the Angular App Image

Navigate to the `angular-app` directory and build the Docker image for the Angular app:

```bash
cd ../angular-app
docker build -t your-dockerhub-username/angular-app .
```

---

### Step 3: Run the Application Using Docker Compose

#### Create/Update `docker-compose.yml`

The `docker-compose.yml` file is used to define and configure both services (Angular frontend and Mock Backend) as separate containers.

Here’s the configuration:

```yaml
version: "3.8"

services:
  docker-multi-service-app:
    build: .
    ports:
      - "8090:80" # Exposes Angular app at http://localhost:8080
    depends_on:
      - mock-backend
      - redis
    environment:
      - API_URL=http://localhost:3000 # Angular app will call the backend here

  mock-backend:
    build: ./mock-backend
    ports:
      - "3000:3000" # Exposes the mock backend API at http://localhost:3000
    environment:
      - REDIS_HOST=redis
      - REDIS_PORT=6379

  redis:
    image: redis:7
    ports:
      - "6379:6379"
```

This configuration:

- Defines the `mock-backend` and `angular-app` services.
- Builds the services from local directories (`./mock-backend` and `./angular-app`).
- Exposes ports `3000` for the mock backend and `4200` for the Angular frontend.
- Ensures that the `angular-app` starts only after the `mock-backend` is up.

#### Start the Application

With Docker Compose configured, you can now start both services by running:

```bash
docker-compose up --build
```

This command will:

1. Build both Docker images for the Angular app and the mock backend.
2. Start the containers for both services.

Once the containers are running, the Angular app will be accessible at [http://localhost:4200](http://localhost:4200) and the mock backend API at [http://localhost:3000](http://localhost:3000).

---

### Step 4: Access the Application

#### Frontend (Angular App)

Once the containers are running, access the Angular app by navigating to [http://localhost:4200](http://localhost:4200).

#### Mock Backend (JSON Server)

The mock backend, which serves fake data from a JSON file, will be available at [http://localhost:3000](http://localhost:3000). For example:

- Access the tasks endpoint: [http://localhost:3000/tasks](http://localhost:3000/tasks)

---

### Step 5: Push Docker Images to Docker Hub (Optional)

If you want to upload your Docker images to Docker Hub for public access or deployment:

1. **Tag the images**:

   ```bash
   docker tag angular-app:latest your-dockerhub-username/angular-app:latest
   docker tag mock-backend:latest your-dockerhub-username/mock-backend:latest
   ```

2. **Push the images**:
   ```bash
   docker push your-dockerhub-username/angular-app:latest
   docker push your-dockerhub-username/mock-backend:latest
   ```

Replace `your-dockerhub-username` with your actual Docker Hub username.

---

### Step 6: Stopping the Services

To stop the running services, you can press `CTRL+C` or run:

```bash
docker-compose down
```

This will stop and remove the containers but keep the images intact.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Conclusion

This setup allows you to quickly run a multi-service application with Docker, which includes:

- A Dockerized Angular frontend.
- A mock backend using JSON Server.

Both services communicate with each other through Docker's custom network, and Docker Compose simplifies managing and orchestrating them together. Let me know if you have any further questions or need assistance!
