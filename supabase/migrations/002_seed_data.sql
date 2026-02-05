-- Seed products for development and demo (image_url set by seed script when using npm run seed)
INSERT INTO products (id, name, description, price, image_url, category, stock) VALUES
  ('11111111-1111-1111-1111-111111111101', 'Classic White Tee', 'Soft cotton crew neck t-shirt. Unisex fit.', 24.99, NULL, 'Clothing', 50),
  ('11111111-1111-1111-1111-111111111102', 'Denim Jacket', 'Medium wash denim jacket with button closure.', 89.99, NULL, 'Clothing', 20),
  ('11111111-1111-1111-1111-111111111103', 'Wireless Earbuds', 'Noise-cancelling wireless earbuds with 24h battery.', 79.99, NULL, 'Electronics', 100),
  ('11111111-1111-1111-1111-111111111104', 'Leather Wallet', 'Slim bifold wallet with card slots.', 45.00, NULL, 'Accessories', 75),
  ('11111111-1111-1111-1111-111111111105', 'Running Shoes', 'Lightweight running shoes with cushioned sole.', 120.00, NULL, 'Footwear', 30),
  ('11111111-1111-1111-1111-111111111106', 'Vintage Sunglasses', 'Polarized aviator-style sunglasses with metal frame.', 65.00, NULL, 'Accessories', 40),
  ('11111111-1111-1111-1111-111111111107', 'Cotton Hoodie', 'Oversized pullover hoodie in soft fleece cotton.', 54.99, NULL, 'Clothing', 35),
  ('11111111-1111-1111-1111-111111111108', 'Smart Watch', 'Fitness tracker with heart rate, GPS, and 7-day battery.', 199.99, NULL, 'Electronics', 25),
  ('11111111-1111-1111-1111-111111111109', 'Canvas Backpack', 'Durable canvas backpack with laptop sleeve.', 72.00, NULL, 'Accessories', 45),
  ('11111111-1111-1111-1111-111111111110', 'Yoga Mat', 'Non-slip eco-friendly yoga mat with carry strap.', 38.99, NULL, 'Sports', 60)
ON CONFLICT (id) DO NOTHING;
