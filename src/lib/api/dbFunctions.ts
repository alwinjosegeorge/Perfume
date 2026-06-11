import { createServerFn } from "@tanstack/react-start";
import { pool } from "../db.server";
import { Product } from "@/data/catalog";
import { z } from "zod";

function mapDbProduct(row: any): Product {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: row.price,
    priceLabel: `₹${row.price.toLocaleString("en-IN")}`,
    img: row.img,
    hr: row.hr || "12 HR",
    description: row.description,
    base: row.base,
    isCustom: row.is_custom,
    pricing: row.pricing || undefined,
    badge: row.badge || undefined,
    featuredOnHomepage: row.featured_on_homepage,
    heroTitle: row.hero_title || undefined,
    heroDescription: row.hero_description || undefined,
    hoverImg: row.hover_img || undefined,
    gallery: row.gallery || [],
  };
}

export const getProductsDb = createServerFn({ method: "GET" })
  .handler(async () => {
    const res = await pool.query("SELECT * FROM products ORDER BY id ASC");
    return res.rows.map(mapDbProduct);
  });

export const createOrUpdateProductDb = createServerFn({ method: "POST" })
  .input(
    z.object({
      slug: z.string(),
      name: z.string(),
      category: z.string(),
      price: z.number(),
      img: z.string(),
      hr: z.string().optional(),
      description: z.string().optional(),
      base: z.string().optional(),
      isCustom: z.boolean().optional(),
      pricing: z.any().optional(),
      badge: z.string().optional(),
      featuredOnHomepage: z.boolean().optional(),
      heroTitle: z.string().optional(),
      heroDescription: z.string().optional(),
      hoverImg: z.string().optional(),
      gallery: z.array(z.string()).optional(),
    })
  )
  .handler(async ({ input }) => {
    const res = await pool.query(
      `
      INSERT INTO products (
        slug, name, category, price, img, hr, description, base, 
        is_custom, pricing, badge, featured_on_homepage, hero_title, 
        hero_description, hover_img, gallery
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        category = EXCLUDED.category,
        price = EXCLUDED.price,
        img = EXCLUDED.img,
        hr = EXCLUDED.hr,
        description = EXCLUDED.description,
        base = EXCLUDED.base,
        is_custom = EXCLUDED.is_custom,
        pricing = EXCLUDED.pricing,
        badge = EXCLUDED.badge,
        featured_on_homepage = EXCLUDED.featured_on_homepage,
        hero_title = EXCLUDED.hero_title,
        hero_description = EXCLUDED.hero_description,
        hover_img = EXCLUDED.hover_img,
        gallery = EXCLUDED.gallery
      RETURNING *
    `,
      [
        input.slug,
        input.name,
        input.category,
        input.price,
        input.img,
        input.hr || "12 HR",
        input.description || null,
        input.base || null,
        input.isCustom || false,
        input.pricing ? JSON.stringify(input.pricing) : null,
        input.badge || null,
        input.featuredOnHomepage || false,
        input.heroTitle || null,
        input.heroDescription || null,
        input.hoverImg || null,
        JSON.stringify(input.gallery || []),
      ]
    );
    return mapDbProduct(res.rows[0]);
  });

export const deleteProductDb = createServerFn({ method: "POST" })
  .input(z.object({ slug: z.string() }))
  .handler(async ({ input }) => {
    await pool.query("DELETE FROM products WHERE slug = $1", [input.slug]);
    return { success: true };
  });

export const createOrderDb = createServerFn({ method: "POST" })
  .input(
    z.object({
      id: z.string(),
      customerName: z.string(),
      customerPhone: z.string(),
      deliveryAddress: z.object({
        house: z.string(),
        area: z.string(),
        district: z.string(),
        state: z.string(),
        pin: z.string(),
      }),
      paymentId: z.string().optional().nullable(),
      items: z.array(z.any()),
      subtotal: z.number(),
      shipping: z.number(),
      total: z.number(),
      status: z.string().optional(),
      dateString: z.string().optional().nullable(),
    })
  )
  .handler(async ({ input }) => {
    await pool.query(
      `
      INSERT INTO orders (
        id, customer_name, customer_phone, delivery_house, delivery_area, 
        delivery_district, delivery_state, delivery_pin, payment_id, 
        items, subtotal, shipping, total, status, date_string
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    `,
      [
        input.id,
        input.customerName,
        input.customerPhone,
        input.deliveryAddress.house,
        input.deliveryAddress.area,
        input.deliveryAddress.district,
        input.deliveryAddress.state,
        input.deliveryAddress.pin,
        input.paymentId || null,
        JSON.stringify(input.items),
        input.subtotal,
        input.shipping,
        input.total,
        input.status || "WAITING",
        input.dateString || null,
      ]
    );
    return { success: true };
  });

export const getOrdersDb = createServerFn({ method: "GET" })
  .handler(async () => {
    const res = await pool.query("SELECT * FROM orders ORDER BY created_at DESC");
    return res.rows.map((row) => ({
      id: row.id,
      customerName: row.customer_name,
      customerPhone: row.customer_phone,
      deliveryAddress: {
        house: row.delivery_house,
        area: row.delivery_area,
        district: row.delivery_district,
        state: row.delivery_state,
        pin: row.delivery_pin,
      },
      paymentId: row.payment_id || undefined,
      items: row.items,
      subtotal: row.subtotal,
      shipping: row.shipping,
      total: row.total,
      status: row.status,
      date: row.date_string,
    }));
  });

export const updateOrderStatusDb = createServerFn({ method: "POST" })
  .input(z.object({ id: z.string(), status: z.string() }))
  .handler(async ({ input }) => {
    await pool.query("UPDATE orders SET status = $1 WHERE id = $2", [input.status, input.id]);
    return { success: true };
  });

export const deleteOrderDb = createServerFn({ method: "POST" })
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    await pool.query("DELETE FROM orders WHERE id = $1", [input.id]);
    return { success: true };
  });

export const getHeroSettingsDb = createServerFn({ method: "GET" })
  .handler(async () => {
    const res = await pool.query("SELECT * FROM hero_settings");
    return res.rows;
  });

export const saveHeroSettingsDb = createServerFn({ method: "POST" })
  .input(
    z.object({
      mode: z.string(),
      title: z.string(),
      description: z.string(),
      featuredSlug: z.string(),
    })
  )
  .handler(async ({ input }) => {
    await pool.query(
      `
      INSERT INTO hero_settings (mode, title, description, featured_slug, updated_at)
      VALUES ($1, $2, $3, $4, NOW())
      ON CONFLICT (mode) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        featured_slug = EXCLUDED.featured_slug,
        updated_at = NOW()
    `,
      [input.mode, input.title, input.description, input.featuredSlug]
    );
    return { success: true };
  });
