# E-Commerce Order Management Backend

Minimal, production-ready REST API for managing products and orders.
Built with Node.js, Express.js, PostgreSQL (Neon DB compatible).

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Open `.env` and set your `DATABASE_URL`:
```
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
PORT=5000
ALLOWED_ORIGIN=https://your-frontend.vercel.app
```

### 3. Run the SQL schema
Open your Neon DB SQL editor (or any PostgreSQL client) and run the contents of `database.sql`.
This creates the `products` and `orders` tables and inserts sample data.

### 4. Start the server
```bash
npm start
```

Server runs at: `http://localhost:5000`

---

## API Reference

### Health Check
| Method | Endpoint  | Description        |
|--------|-----------|--------------------|
| GET    | /health   | Server health check |

---

### Products

| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| GET    | /api/products      | Get all products     |
| GET    | /api/products/:id  | Get single product   |

#### Example Response — GET /api/products
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "description": "...",
      "price": "4999.00",
      "image": "https://...",
      "stock": 50,
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Orders

| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| POST   | /api/orders      | Create a new order      |
| GET    | /api/orders      | Get all orders (admin)  |
| GET    | /api/orders/:id  | Get single order        |
| PATCH  | /api/orders/:id  | Update order status     |

#### POST /api/orders — Request Body
```json
{
  "product_id": 1,
  "customer_name": "Rahim Uddin",
  "phone": "01712345678",
  "address": "123 Mirpur Road, Dhaka",
  "quantity": 2
}
```

#### PATCH /api/orders/:id — Request Body
```json
{
  "status": "confirmed"
}
```
Valid statuses: `pending` | `confirmed` | `delivered`

---

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                  # PostgreSQL pool (Neon SSL)
│   ├── controllers/
│   │   ├── product.controller.js  # Product business logic
│   │   └── order.controller.js    # Order business logic
│   ├── routes/
│   │   ├── product.routes.js      # Product route definitions
│   │   └── order.routes.js        # Order route definitions
│   └── app.js                     # Express app, CORS, middleware
├── server.js                      # Entry point
├── package.json
├── .env.example
├── .gitignore
├── database.sql                   # Schema + seed data
└── README.md
```

---

## Notes

- **Stock management** — placing an order atomically deducts stock via a DB transaction.
- **No authentication** — admin routes (`GET /api/orders`) are open by design (MVP scope).
- **CORS** — configured for `localhost:3000`, `localhost:5173`, and your `ALLOWED_ORIGIN` env var.
- **SSL** — `rejectUnauthorized: false` is set for Neon DB compatibility.
