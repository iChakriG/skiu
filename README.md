# Skiu E-commerce Platform

A modern e-commerce platform built with Next.js, TypeScript, Tailwind CSS, and Supabase PostgreSQL. Designed with clean architecture principles and optimized for mobile app integration.

## 🚀 Features

- **Clean Architecture**: Separation of concerns with domain, application, infrastructure, and presentation layers
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern, responsive UI styling
- **Supabase PostgreSQL**: Scalable database with Row Level Security
- **RESTful API**: Mobile-friendly API endpoints
- **Vercel Ready**: Optimized for deployment on Vercel

## 📁 Project Structure

| Folder | Purpose |
|--------|--------|
| **app/** | Next.js app: pages, layout, **API routes** (products, cart, orders) |
| **domain/** | Entities (Product, Order, Cart, User) and repository **interfaces** |
| **application/** | **Use cases** (GetProducts, AddToCart, CreateOrder, etc.) |
| **infrastructure/** | Supabase client and repository **implementations** |
| **lib/** | Shared utilities |
| **mobile/** | React Native (Expo) app — see [mobile/README.md](mobile/README.md) |
| **supabase/** | SQL migrations |

Full map and “where to find…” guide: **[STRUCTURE.md](STRUCTURE.md)**.

## 🛠️ Setup

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd skiu
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

4. Set up the database:
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the migration file: `supabase/migrations/001_initial_schema.sql`

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### React Native (Expo) mobile app

A mobile app in the `mobile/` folder consumes these APIs for products, cart, and orders.

```bash
cd mobile
npm install
cp .env.example .env
# Set EXPO_PUBLIC_API_URL in .env (use your machine IP for physical devices)
npm start
```

See [mobile/README.md](mobile/README.md) for setup, User ID (cart/orders), and scripts.

## 📱 API Endpoints

### Products

- `GET /api/products` - Get all products (supports query params: `category`, `minPrice`, `maxPrice`, `search`)
- `GET /api/products/[id]` - Get product by ID

### Cart

- `GET /api/cart` - Get user's cart (requires `x-user-id` header)
- `POST /api/cart` - Add item to cart (requires `x-user-id` header)
  ```json
  {
    "productId": "uuid",
    "quantity": 1
  }
  ```

### Orders

- `GET /api/orders` - Get user's orders (requires `x-user-id` header)
- `POST /api/orders` - Create new order (requires `x-user-id` header)
  ```json
  {
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    }
  }
  ```
- `GET /api/orders/[id]` - Get order by ID

## 🏗️ Architecture

This project follows Clean Architecture principles:

1. **Domain Layer**: Contains business entities and repository interfaces
2. **Application Layer**: Contains use cases (business logic)
3. **Infrastructure Layer**: Contains implementations (Supabase repositories)
4. **Presentation Layer**: Contains API routes and UI components

This separation ensures:
- Testability
- Maintainability
- Flexibility to change implementations
- Clear dependencies

## 🚢 Deployment to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy!

The project is already configured for Vercel with `vercel.json`.

## 🔐 Authentication

Currently, the API uses a simple `x-user-id` header for user identification. For production, you should:

1. Implement JWT authentication
2. Use Supabase Auth
3. Extract user ID from the authenticated token
4. Update the `getUserId` helper functions in API routes

## 📝 Database Schema

- **products**: Product catalog
- **carts**: User shopping carts
- **orders**: Order history

See `supabase/migrations/001_initial_schema.sql` for the complete schema.

## 🧪 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📄 License

See LICENSE file for details.
