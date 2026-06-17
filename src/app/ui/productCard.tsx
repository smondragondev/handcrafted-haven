"use client";
import styles from "./ui.module.css";
import type { ProductData } from "@/app/ui/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/ui/useCart";

export default function ProductCard({ product }: { product: ProductData }) {
    const { addedToCart, toggleCart } = useCart(product._id, product);
    return (
        <div className={styles.productCard}>
            <Link href={`/products/${product._id}`} className={styles.cardLink}>
                <Image
                    width={300}
                    height={200}
                    alt={`${product.name} image`}
                    src={`${product.imageUrl}`}
                    className={styles.cardImage}
                    priority
                />

                <div>
                    <span>{product.category.toUpperCase()}</span>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                </div>
            </Link>

            <div className={styles.productCardCheckout}>
                <span>${product.price}</span>
                <button onClick={toggleCart}>
                    {addedToCart ? "Remove from Cart" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
}
