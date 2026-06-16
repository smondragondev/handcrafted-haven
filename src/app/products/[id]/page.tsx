import { GetProductById, GetReviewsByProductId } from "@/app/lib/mongodb";
import ProductDetailsView from "./ProductDetailsView";

export default async function ProductDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {

    const { id } = await params;
    const product = await GetProductById(id);
    const reviews = await GetReviewsByProductId(id);

    return (
        <ProductDetailsView
            product={product}
            reviews={reviews}
        />
    );
}