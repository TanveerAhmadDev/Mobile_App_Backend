# User Routes

These are the available **User Authentication API routes** in the backend.

| Route       | Method | Description                             |
| ----------- | ------ | --------------------------------------- |
| `/register` | `POST` | Register a new user                     |
| `/login`    | `POST` | Login an existing user                  |
| `/logout`   | `POST` | Logout the currently authenticated user |

## Base URL

```text
backendURL
```

## API Endpoints

### 1. Register User

```http
POST backendURL/register
```

**Method:** `POST`

Used to create a new user account.

---

### 2. Login User

```http
POST backendURL/login
```

**Method:** `POST`

Used to authenticate an existing user.

---

### 3. Logout User

```http
POST backendURL/logout
```

**Method:** `POST`

Used to log out the currently authenticated user.


# Request Routes

These are the available **Request Management API routes** in the backend.

| Route         | Method   | Middleware   | Description                |
| ------------- | -------- | ------------ | -------------------------- |
| `/`           | `POST`   | `verfiyUser` | Create a new request       |
| `/:requestId` | `PATCH`  | `verfiyUser` | Update an existing request |
| `/:requestId` | `GET`    | `verfiyUser` | Get a specific request     |
| `/`           | `GET`    | `verfiyUser` | Get all requests           |
| `/:requestId` | `DELETE` | `verfiyUser` | Delete a request           |

## API Endpoints

### 1. Create Request

```http
POST backendURL/
```

**Method:** `POST`
**Authentication:** Required (`verfiyUser`)

Creates a new request for the authenticated user.

---

### 2. Update Request

```http
PATCH backendURL/:requestId
```

**Method:** `PATCH`
**Authentication:** Required (`verfiyUser`)

Updates an existing request using its `requestId`.

---

### 3. Get Request

```http
GET backendURL/:requestId
```

**Method:** `GET`
**Authentication:** Required (`verfiyUser`)

Retrieves a specific request using its `requestId`.

---

### 4. Get All Requests

```http
GET backendURL/
```

**Method:** `GET`
**Authentication:** Required (`verfiyUser`)

Retrieves the requests available to the authenticated user.

---

### 5. Delete Request

```http
DELETE backendURL/:requestId
```

**Method:** `DELETE`
**Authentication:** Required (`verfiyUser`)

Deletes an existing request using its `requestId`.
