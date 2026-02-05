/**
 * Seed products for development and demo.
 * Uploads product images to Supabase Storage and upserts products.
 * Run from project root: node scripts/seed.mjs
 * Requires .env with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 * Optional: place images in scripts/product-images/ as product-101.png through product-110.png.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const envPath = join(root, ".env");
const imagesDir = join(__dirname, "product-images");
const BUCKET = "product-images";

if (existsSync(envPath)) {
  const env = readFileSync(envPath, "utf8");
  env.split("\n").forEach((line) => {
    const eq = line.indexOf("=");
    if (eq > 0 && !line.trimStart().startsWith("#")) {
      const key = line.slice(0, eq).trim();
      const value = line.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      process.env[key] = value;
    }
  });
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// 10 products: IDs 101–105 (original) + 106–110 (new)
const PRODUCTS = [
  { id: "11111111-1111-1111-1111-111111111101", shortId: "101", name: "Classic White Tee", description: "Soft cotton crew neck t-shirt. Unisex fit.", price: 24.99, category: "Clothing", stock: 50 },
  { id: "11111111-1111-1111-1111-111111111102", shortId: "102", name: "Denim Jacket", description: "Medium wash denim jacket with button closure.", price: 89.99, category: "Clothing", stock: 20 },
  { id: "11111111-1111-1111-1111-111111111103", shortId: "103", name: "Wireless Earbuds", description: "Noise-cancelling wireless earbuds with 24h battery.", price: 79.99, category: "Electronics", stock: 100 },
  { id: "11111111-1111-1111-1111-111111111104", shortId: "104", name: "Leather Wallet", description: "Slim bifold wallet with card slots.", price: 45.00, category: "Accessories", stock: 75 },
  { id: "11111111-1111-1111-1111-111111111105", shortId: "105", name: "Running Shoes", description: "Lightweight running shoes with cushioned sole.", price: 120.00, category: "Footwear", stock: 30 },
  { id: "11111111-1111-1111-1111-111111111106", shortId: "106", name: "Vintage Sunglasses", description: "Polarized aviator-style sunglasses with metal frame.", price: 65.00, category: "Accessories", stock: 40 },
  { id: "11111111-1111-1111-1111-111111111107", shortId: "107", name: "Cotton Hoodie", description: "Oversized pullover hoodie in soft fleece cotton.", price: 54.99, category: "Clothing", stock: 35 },
  { id: "11111111-1111-1111-1111-111111111108", shortId: "108", name: "Smart Watch", description: "Fitness tracker with heart rate, GPS, and 7-day battery.", price: 199.99, category: "Electronics", stock: 25 },
  { id: "11111111-1111-1111-1111-111111111109", shortId: "109", name: "Canvas Backpack", description: "Durable canvas backpack with laptop sleeve.", price: 72.00, category: "Accessories", stock: 45 },
  { id: "11111111-1111-1111-1111-111111111110", shortId: "110", name: "Yoga Mat", description: "Non-slip eco-friendly yoga mat with carry strap.", price: 38.99, category: "Sports", stock: 60 },
];

function findImagePath(shortId) {
  const base = join(imagesDir, `product-${shortId}`);
  const exts = [".png", ".jpg", ".jpeg", ".webp"];
  for (const ext of exts) {
    const p = base + ext;
    if (existsSync(p)) return p;
  }
  return null;
}

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  if (buckets?.some((b) => b.name === BUCKET)) return;
  const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
  if (error && error.message?.includes("already exists") === false) {
    console.warn("Could not create bucket (may already exist):", error.message);
  }
}

async function uploadImage(productId, shortId) {
  const imagePath = findImagePath(shortId);
  if (!imagePath) return null;
  const ext = imagePath.slice(imagePath.lastIndexOf("."));
  const objectPath = `product-${productId}${ext}`;
  const body = readFileSync(imagePath);
  const contentType = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";
  const { error } = await supabase.storage.from(BUCKET).upload(objectPath, body, {
    contentType,
    upsert: true,
  });
  if (error) {
    console.warn(`Upload failed for product ${shortId}:`, error.message);
    return null;
  }
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(objectPath);
  return data.publicUrl;
}

async function main() {
  await ensureBucket();
  const productsWithImages = [];
  for (const p of PRODUCTS) {
    const image_url = await uploadImage(p.id, p.shortId);
    productsWithImages.push({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      image_url: image_url || null,
      category: p.category,
      stock: p.stock,
    });
  }
  const { error } = await supabase.from("products").upsert(productsWithImages, { onConflict: "id" });
  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
  const withImages = productsWithImages.filter((x) => x.image_url).length;
  console.log(`Seed complete: ${PRODUCTS.length} products upserted, ${withImages} with images.`);
}

main();
