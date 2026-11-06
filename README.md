# Social Media App API

TypeScript and Express API backed by MongoDB. It includes the existing authentication and user modules, plus authenticated Post and Comment CRUD.

## Run locally

1. Use Node.js 20 or newer and MongoDB.
2. Copy `.env.development.example` to `.env.development` and fill in the values for your environment.
3. Run `npm install` once, then `npm run dev`.
4. Check `http://localhost:9000/health`.

The API uses bearer access tokens for the user, post, and comment routes. In Postman, set `baseUrl` and `accessToken`; create a post first and then use its saved `postId` for the comment requests.

## Post routes

| Method | Route | Behavior |
| --- | --- | --- |
| POST | `/api/v1/posts` | Create a post for the signed-in user (`content`) |
| GET | `/api/v1/posts` | List the signed-in user's posts |
| GET | `/api/v1/posts/:postId` | Retrieve a post by ID |
| PATCH | `/api/v1/posts/:postId` | Update the owner's post (`content`) |
| DELETE | `/api/v1/posts/:postId` | Delete the owner's post |

## Comment routes

| Method | Route | Behavior |
| --- | --- | --- |
| POST | `/api/v1/posts/:postId/comments` | Add a comment to a post (`content`) |
| GET | `/api/v1/posts/:postId/comments` | List comments for a post |
| GET | `/api/v1/comments/:commentId` | Retrieve a comment by ID |
| PATCH | `/api/v1/comments/:commentId` | Update the comment owner's comment (`content`) |
| DELETE | `/api/v1/comments/:commentId` | Delete if signed-in user owns the comment or its post |
