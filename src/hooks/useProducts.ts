import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { products as staticProducts, type Product } from "@/data/products";

/* Map from DB image path to static import — Supabase stores paths like /product-1.jpg */
const imageMap: Record<string, string> = {};
staticProducts.forEach((p) => {
  p.images.forEach((img, i) => {
    /* The DB stores e.g. "/product-1.jpg" for product id ending in 0001, etc. */
    const dbPath = `/product-${staticProducts.indexOf(p) + 1}.jpg`;
    imageMap[dbPath] = img;
  });
});

function resolveImages(dbImages: string[]): string[] {
  return dbImages.map((img) => imageMap[img] ?? img);
}

async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description ?? "",
    short_description: row.short_description ?? "",
    price: Number(row.price),
    images: resolveImages(row.images ?? []),
    material: row.material ?? "PLA+",
    layer_height: row.layer_height ?? "0.1mm",
    print_time: row.print_time ?? "",
    dimensions: row.dimensions ?? "",
    stock: row.stock,
    featured: row.featured ?? false,
    category: row.category ?? "",
  }));
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    placeholderData: staticProducts,
    staleTime: 1000 * 60 * 5,
  });
}

export function useProduct(id: string | undefined) {
  const { data: products, ...rest } = useProducts();
  const product = products?.find((p) => p.id === id);
  return { product, ...rest };
}
