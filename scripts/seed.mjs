/**
 * Seed products for development and demo.
 * Uploads product images from public/product-images to Supabase Storage and upserts products from scripts/seeds.
 * Run from project root: node scripts/seed.mjs
 * Requires .env with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 * Images: public/product-images/product-101.png … product-110.png (see scripts/seeds/README.md).
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const envPath = join(root, ".env");
const seedsDir = join(__dirname, "seeds");
const imagesDir = join(root, "public", "product-images");
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

const productsPath = join(seedsDir, "products.json");
if (!existsSync(productsPath)) {
  console.error("Missing scripts/seeds/products.json. Create it from scripts/seeds/README.md.");
  process.exit(1);
}
const PRODUCTS = JSON.parse(readFileSync(productsPath, "utf8"));

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
