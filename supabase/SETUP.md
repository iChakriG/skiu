# Database & auth setup

## 1. Run migrations in Supabase

In [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor**:

1. Run the schema (copy/paste and run):
   - Open `migrations/001_initial_schema.sql` in this repo, copy all, paste in SQL Editor, run.

2. Run the seed (copy/paste and run):
   - Open `migrations/002_seed_data.sql`, copy all, paste in SQL Editor, run.

This creates the `products`, `carts`, and `orders` tables and inserts 10 sample products.

3. **(Optional)** To upload product images and sync seed data from the repo, run from project root:
   ```bash
   npm run seed
   ```
   This creates the `product-images` storage bucket (if needed), uploads images from `scripts/product-images/`, and upserts all 10 products with image URLs.

## 2. Enable authentication

1. In Supabase Dashboard → **Authentication** → **Providers**.
2. Ensure **Email** is enabled (default).
3. (Optional) Under **Email Auth**, you can disable "Confirm email" for local dev so sign-up works without email verification.

## 3. Create your first users

### Admin user (for /admin)

1. Go to **Authentication** → **Users** → **Add user** → **Create new user**.
2. Enter email and password (e.g. `admin@example.com` / `your-secure-password`).
3. Use this to sign in at **http://localhost:3000/admin** (or your app URL).

### Storefront user (for /login, cart, orders)

1. Either create another user the same way under **Authentication** → **Users**, or
2. Use the storefront **Sign up** at **http://localhost:3000/signup** (if email confirmation is disabled, you can sign in right away).

## 4. Run the web app

```bash
npm run dev
```

- **Storefront:** http://localhost:3000  
- **Admin:** http://localhost:3000/admin (use the admin user you created)
