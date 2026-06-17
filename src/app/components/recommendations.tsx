import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css"; // Importing your CSS modules
import { GetAllProducts } from "@/app/lib/mongodb";

interface Product {
    id: string;
    title: string;
    price: number;
    imageSrc: string;
    category: string;
}

export default async function Recommendations() {
    const products = await GetAllProducts();

    return (
        <section className={styles.recommendationsSection}>
            {/* Heading */}
            <div className={styles.recommendationsHeading}>
                <h2>Recommended For You</h2>
                <p>Based on what other craft lovers are exploring right now.</p>
            </div>

            {/* 4-Column Grid */}
            <div className={styles.recommendationsGrid}>
                {products.slice(0, 4).map((product) => (
                    <div
                        key={product._id.toString()}
                        className={styles.productCard}
                    >
                        {/* Image Container */}
                        <div className={styles.imageWrapper}>
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className={styles.cardImage}
                                priority
                            />
                        </div>

                        {/* Details */}
                        <div className={styles.cardDetails}>
                            <p className={styles.categoryTag}>
                                {product.category}
                            </p>
                            <h3 className={styles.productTitle}>
                                <Link href={`/products/${product._id}`}>
                                    {product.name}
                                </Link>
                            </h3>

                            <div className={styles.cardFooter}>
                                <p className={styles.productPrice}>
                                    ${product.price.toFixed(2)}
                                </p>
                                <span className={styles.viewDetails}>
                                    View Details &rarr;
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
