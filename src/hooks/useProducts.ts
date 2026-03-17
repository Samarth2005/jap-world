import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { products as staticProducts, type Product } from "@/data/products";

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
    images: row.images ?? [],
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
