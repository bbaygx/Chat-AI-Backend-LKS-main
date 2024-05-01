# Project Backend-LKS-Networking

Project Backend-LKS-Networking is a backend application developed using Express.js, a popular web framework for Node.js. The application includes authentication functionality using Passport Local strategy, allowing users to securely log in and manage their accounts.

In addition to authentication, the project seamlessly integrates Prisma ORM, a modern database toolkit for Node.js and TypeScript. Prisma simplifies database access by providing an auto-generated and type-safe query builder. This ensures robust data management and enhances developer productivity.

Furthermore, the project utilizes Multer, a middleware for handling multipart/form-data, enabling file uploads and storage capabilities. With Multer, users can securely upload files to the server, facilitating various features such as profile picture uploads or document storage.

To enhance request logging and monitoring, the project integrates Morgan, an HTTP request logger middleware for Node.js. Morgan provides detailed logging of incoming requests, including request method, URL, status code, and response time. This aids in debugging, performance monitoring, and security analysis of the application.

Overall, Backend-LKS-Networking combines the power of Express.js with authentication, database management, file storage, and request logging functionalities to deliver a robust and scalable backend solution for networking projects.

## Getting Started

### Prerequisites

- <a href="https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-debian-10">Installing Node.js with version >= 16</a>
- <a href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git">Installing Git for Linux</a>
- <a href="https://www.geeksforgeeks.org/how-to-install-mysql-on-linux/">Installing MySQL for Linux</a>
- <a href="https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-debian-10">Install Docker for managed your application container (optional if you want to build in container) </a>
  when you build your application via docker `you can earn more point`

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/your_username/your_project.git
   ```
2. Navigate to the directory where the project is located:
   ```sh
   cd your_project
   ```
3. Install dependencies:

   ```sh
   npm install
   ```

## Usage

1. Before running the application, create a .env file. You can use nano or echo to insert the environment variables. For example, you can manually create the file using touch:

   ```sh
   touch .env
   ```

2. Register an account on the <a href="https://platform.openai.com/api-keys">Open AI</a> platform, create a new Api Key, and insert it into the .env file. <a href="https://help.socialintents.com/article/188-how-to-find-your-openai-api-key-for-chatgpt">How to get Open AI API Key</a>

3. Generate your secure `Secret`

   ```sh
   npm run secret

   //output : 319XHAKEL@038!SD
   ```

4. Here is an example .env file within this project. By default, the project will run on port 8080. You can customize your port settings with another port. For example:

   ```sh
   PORT="custom your port"
   SESSION_SECRET="generate secure session secret"
   OPENAI_APIKEY= "your Open AI API key"
   DB_NAME="your database name"
   DB_USER="your database username"
   DB_PASS="your database password"
   DB_HOST="your database host"

   DATABASE_URL="mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:3306/${DB_NAME}"
   ```

   make sure use a secure and best practice `SESSION_SECRET`, to regenerate the secret you can run the `npm run secret` command.

5. Deploying Migration SQL from backup files

   ```sh
   npm run db:deploy
   ```

6. Running Project in the preview mode

   ```sh
   npm run start
   ```

## Run Apps with PM2

1. Install PM2 library

   ```sh
   npm install -g pm2
   ```

2. Start Project PM2

   ```sh
   npm run start:prod
   ```

3. Stop Project PM2

   ```sh
   npm run stop:prod
   ```

4. Now your Project is running on PM2 without docker

   ```sh
   http://your-ip-address:port
   ```

## Run Apps with containers in docker

1. Build your Docker images

   ```sh
   docker build -t backendlks:latest .
   ```

2. Check your Docker images

   ```sh
   docker images ls
   ```

3. Run Docker containers in background mode (detached mode)
   ```sh
   docker run -d --env-file .env -p 5000:5000 <your_name_image_docker>
   ```
4. Test your Docker container in the terminal using curl:
   ```sh
   curl http://your_ip_docker:5000
   ```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

Distributed under the MIT License. See `LICENSE` for more information.
