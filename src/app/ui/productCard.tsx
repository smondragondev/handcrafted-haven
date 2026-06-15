"use client";
import styles from "./ui.module.css";
import type { ProductData } from "@/app/ui/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductCard({ product }: { product: ProductData }) {
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const cart = localStorage.getItem("shoppingCart");
    if (cart == null) return;
    const cartObj = JSON.parse(cart);
    setAddedToCart(cartObj.some((p: ProductData) => p._id === product._id));
  }, [product._id]);

  const toggleCart = () => {
    const stored = localStorage.getItem("shoppingCart");
    const cart = stored ? JSON.parse(stored) : [];

    const exists = cart.some((p: ProductData) => p._id === product._id);

    const updated = exists
      ? cart.filter((p: ProductData) => p._id !== product._id)
      : [...cart, product];

    localStorage.setItem("shoppingCart", JSON.stringify(updated));
    setAddedToCart(!exists);
  };

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
