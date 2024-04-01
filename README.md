# RSS Articles

## Description
Provide a brief description of your application.

## Prerequisites
List any prerequisites required to run your application. This might include:
- Node.js
- npm or yarn
- MongoDB
- Docker (if applicable)

## Installation
Include instructions for installing your application. This might include steps like:

1. Clone the repository:
```bash
git clone <this-repository-url>
```
## Configuration
All environmental variables are in .env files (for demonstration)


## Running React App in Development Mode

Navigate to the project directory:
```bash
cd ./ui
```
Install dependencies:
```bash
npm install
```
Running the React App
To run the React App in development mode, use the following command:

```bash
npm run start
```

This command starts the React App in watch mode, allowing it to automatically restart whenever changes are made to the source code.

Accessing the client
Once the server is running, you can access it at the specified port. Open your web browser and navigate to:

```arduino
http://localhost:3000
```

## Running NestJS Server in Development Mode

Navigate to the project directory:
```bash
cd ./server
```
Install dependencies:
```bash
npm install
```
Running the NestJS Server
To run the NestJS server in development mode, use the following command:

```bash
npm run start:dev
```

This command starts the NestJS server in watch mode, allowing it to automatically restart whenever changes are made to the source code.

Accessing the Server
Once the server is running, you can access it at the specified port. Open your web browser and navigate to:

```arduino
http://localhost:3002
```

Authentication
Authentication is required for certain endpoints and is handled by the AuthGuard and AdminGuard guards.

Endpoints
GET /articles
- Description: Retrieves a list of articles.
- Parameters:
    - page (optional): Page number for pagination (default: 1).
    - limit (optional): Number of items per page (default: 10).
    - sort (optional): Sorting order ('desc' or 'asc', default: 'desc').
    - search (optional): Search query to filter articles (default: '').
Authentication: Requires authentication using AuthGuard.
Response:
```json
{
  "list": [
    {
      // ArticleDto object
    },
    {
      // ArticleDto object
    }
  ],
  "totalCount": 100 // Total number of articles
}
```

GET /articles/:id
- Description: Retrieves a single article by ID.
- Parameters:   
    - id: ID of the article.
Authentication: Requires authentication using both AuthGuard and AdminGuard.
Response:
```json
{
  // ArticleDto object
}
```

POST /articles
- Description: Creates a new article.
- Body:
    - createArticleDto: Data required to create the article (CreateArticleDto).
Authentication: Requires authentication using both AuthGuard and AdminGuard.
Response:
```json
{
  // ArticleDto object
}
```

PUT /articles/:id
- Description: Updates an existing article.
- Parameters:
    - id: ID of the article to update.
- Body:
    - updateArticleDto: Data to update the article (UpdateArticleDto).
Authentication: Requires authentication using both AuthGuard and AdminGuard.
Response:
```json
{
  // ArticleDto object
}
```

DELETE /articles/:id
- Description: Deletes an article by ID.
- Parameters:
    - id: ID of the article to delete.
Authentication: Requires authentication using both AuthGuard and AdminGuard.
Response:
```json
{
  // ArticleDto object
}
```
POST /auth/login
- Description: Authenticates a user and generates a JWT token.
- Method: POST
- Body:
    - loginUser: User credentials (UserDto).
- Response:
    - Status Code: 200 (OK)
    - Body:
    ```json
    {
    "accessToken": "JWT_TOKEN"
    }
    ```
Authentication: No authentication required.

POST /users/register
- Description: Registers a new user.
- Body:
    - createUserDto: User data to create a new user (UserDto).
- Response:
    - Body:
    ```json
    {
    "id": "USER_ID",
    "username": "USERNAME",
    "email": "EMAIL",
    "isAdmin": false,
    "accessToken": "JWT_TOKEN"
    }
    ```
Authentication: No authentication required.

GET /users/profile
- Description: Retrieves the profile of the authenticated user.
- Response:
    - Body:
    ```json
    {
    "id": "USER_ID",
    "username": "USERNAME",
    "email": "EMAIL",
    "isAdmin": false
    }
    ```
Authentication: Requires authentication using AuthGuard.

