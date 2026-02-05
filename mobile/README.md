# Skiu Mobile

React Native (Expo) app that consumes the Skiu Next.js API for products, cart, and orders.

## Prerequisites

- Node.js 18+
- npm or yarn
- [Expo Go](https://expo.dev/go) on your device (optional, for physical device testing)

## Setup

1. **Install dependencies**

   ```bash
   cd mobile
   npm install
   ```

2. **Configure API URL**

   Copy `.env.example` to `.env` and set your API base URL:

   ```bash
   cp .env.example .env
   ```

   Edit `.env`:

   ```
   EXPO_PUBLIC_API_URL=http://localhost:3000
   ```

   - **Simulator/emulator:** `http://localhost:3000` is fine if the Next.js app runs on your machine.
   - **Physical device:** Use your computer’s LAN IP (e.g. `http://192.168.1.10:3000`) so the phone can reach the API. Ensure the Next.js app is running and reachable on that address.

3. **Start the Next.js API** (from the project root)

   ```bash
   npm run dev
   ```

4. **Start the Expo app**

   ```bash
   npm start
   ```

   Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go.

## User ID (Cart & Orders)

The API uses an `x-user-id` header for cart and orders. In the app:

1. Open **Settings** (from the Products screen header).
2. Enter a **User ID** (e.g. `user-demo-123`) and tap **Set user ID**.
3. Cart and Orders will then use this user.

## App structure

- **Products** – List and search products; tap a product for details and “Add to cart”.
- **Cart** – View cart and go to checkout (requires User ID).
- **Orders** – List orders and open order details (requires User ID).
- **Checkout** – Enter shipping address and place order (from Cart).
- **Settings** – Set API base URL (via `.env`) and User ID.

## API endpoints used

| Method | Endpoint            | Description        |
|--------|---------------------|--------------------|
| GET    | `/api/products`     | List products      |
| GET    | `/api/products/:id` | Product by ID      |
| GET    | `/api/cart`         | Get cart (header: `x-user-id`) |
| POST   | `/api/cart`         | Add to cart (header: `x-user-id`) |
| GET    | `/api/orders`       | List orders (header: `x-user-id`) |
| POST   | `/api/orders`       | Create order (header: `x-user-id`) |
| GET    | `/api/orders/:id`   | Order by ID        |

## Scripts

- `npm start` – Start Expo dev server
- `npm run ios` – Start and open iOS simulator
- `npm run android` – Start and open Android emulator
- `npm run web` – Run in web browser (limited; API must be reachable)
