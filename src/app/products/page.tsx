import {GetAllProducts} from "@/app/lib/mongodb"
import ProductView from "./ProductView"
import type { ProductData } from "@/app/ui/types";

export default async function Page(){
    const docs = await GetAllProducts();

    const products: ProductData[] = docs.map((p) => ({
    ...p,
    _id: p._id.toString(),
    contributorId: p.contributorId.toString(),
    createdAt: p.createdAt.toISOString(),
  }));

    return <ProductView products={products}/>
}  