-- Seed products for development and demo
INSERT INTO products (id, name, description, price, image_url, category, stock) VALUES
  ('11111111-1111-1111-1111-111111111101', 'Classic White Tee', 'Soft cotton crew neck t-shirt. Unisex fit.', 24.99, NULL, 'Clothing', 50),
  ('11111111-1111-1111-1111-111111111102', 'Denim Jacket', 'Medium wash denim jacket with button closure.', 89.99, NULL, 'Clothing', 20),
  ('11111111-1111-1111-1111-111111111103', 'Wireless Earbuds', 'Noise-cancelling wireless earbuds with 24h battery.', 79.99, NULL, 'Electronics', 100),
  ('11111111-1111-1111-1111-111111111104', 'Leather Wallet', 'Slim bifold wallet with card slots.', 45.00, NULL, 'Accessories', 75),
  ('11111111-1111-1111-1111-111111111105', 'Running Shoes', 'Lightweight running shoes with cushioned sole.', 120.00, NULL, 'Footwear', 30)
ON CONFLICT (id) DO NOTHING;
