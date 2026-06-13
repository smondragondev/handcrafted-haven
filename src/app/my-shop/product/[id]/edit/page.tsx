import { notFound } from "next/navigation";
import { Metadata } from "next";
import { GetCategories, GetProductById } from "@/app/lib/mongodb";
import { FormProduct } from "@/app/ui/my-shop/forms";
import { State } from "@/app/lib/schemas";

export const metadata: Metadata = {
  title: "Edit Product",
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
  const productState: State = {
    values: {
      ...product,
    },
  };
  return (
    <>
      <h1> Edit Product </h1>  
      <FormProduct product={productState} categories={categories} type="edit"/>
    </>
  );
}
