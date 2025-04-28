## Core Features

### 1. Authentication System
- User registration and login
- JWT-based authentication
- Password hashing using bcryptjs
- Cookie-based token management

### 2. User Management
- User profile management
- User preferences
- Account settings

### 3. Subscription Management
- Create and manage subscriptions
- Track subscription status
- Subscription renewal handling
- Payment tracking

### 4. Workflow Management
- Automated workflow processing
- Task scheduling
- Event handling

## API Endpoints

### Authentication Routes (`/api/v1/auth`)
- POST `/register` - User registration
- POST `/login` - User login
- POST `/logout` - User logout

### User Routes (`/api/v1/users`)
- GET `/profile` - Get user profile
- PUT `/profile` - Update user profile
- DELETE `/profile` - Delete user account

### Subscription Routes (`/api/v1/subscriptions`)
- GET `/` - List all subscriptions
- POST `/` - Create new subscription
- GET `/:id` - Get subscription details
- PUT `/:id` - Update subscription
- DELETE `/:id` - Delete subscription

### Workflow Routes (`/api/v1/workflows`)
- GET `/` - List workflows
- POST `/` - Create workflow
- PUT `/:id` - Update workflow
- DELETE `/:id` - Delete workflow

## Security Features
1. Rate limiting with Arcjet
2. Secure password hashing
3. JWT-based authentication
4. Cookie security
5. Input validation and sanitization

## Development Setup

### Prerequisites
- Node.js (Latest LTS version)
- MongoDB instance
- npm or yarn package manager

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application
- Development mode:
  ```bash
  npm run dev
  ```
- Production mode:
  ```bash
  npm start
  ```

## Dependencies
### Production Dependencies
- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: JWT authentication
- bcryptjs: Password hashing
- cookie-parser: Cookie handling
- nodemailer: Email services
- @arcjet/node: Rate limiting
- @upstash/workflow: Workflow management
- dayjs: Date handling

### Development Dependencies
- eslint: Code linting
- nodemon: Development server
- globals: Global variables

## Error Handling
The application implements a centralized error handling middleware that processes all errors and returns appropriate HTTP responses with meaningful error messages.

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is private and proprietary.

## Version
Current version: 0.0.0
