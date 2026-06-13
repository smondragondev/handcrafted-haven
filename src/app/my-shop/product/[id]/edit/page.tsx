
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { EditProduct } from "@/app/ui/my-shop/buttons";
import { GetCategories, GetProductById } from "@/app/lib/mongodb";
 
export const metadata: Metadata = {
  title: 'Edit Invoice',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [product, categories] = await Promise.all([
    GetProductById(id),
    GetCategories(),
  ]);
  if (!product) {
    notFound();
  }
  return (
    <main>
      <EditProduct />
    </main>
  );
}
