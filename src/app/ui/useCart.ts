
import { useState, useEffect } from "react";
import type { ProductData } from "@/app/ui/types";

export function useCart(productId: string, productData?: any) {
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        const cart = localStorage.getItem("shoppingCart");
        if (cart == null) return;
        const cartObj = JSON.parse(cart);
        setAddedToCart(cartObj.some((p: ProductData) => p._id === productId));
    }, [productId]);

    const toggleCart = () => {
        const stored = localStorage.getItem("shoppingCart");
        const cart = stored ? JSON.parse(stored) : [];

        const exists = cart.some((p: ProductData) => p._id === productId);

        const updated = exists
            ? cart.filter((p: ProductData) => p._id !== productId)
            : [...cart, productData ? { ...productData, _id: productId } : productData];

        localStorage.setItem("shoppingCart", JSON.stringify(updated));
        setAddedToCart(!exists);
    };

    return { addedToCart, toggleCart };
}