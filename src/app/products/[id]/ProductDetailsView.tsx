"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { useCart } from "@/app/ui/useCart";

export default function ProductDetailsView({ product, reviews }: any) {
    const [userName, setUserName] = useState("");
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [hover, setHover] = useState(0);
    const { addedToCart, toggleCart } = useCart(product.id, product);
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!userName.trim()) {
            alert("Please enter your name");
            return;
        }

        if (!comment.trim()) {
            alert("Please write a review");
            return;
        }

        if (rating === 0) {
            alert("Please select a rating");
            return;
        }

        const response = await fetch("/api/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: product.id,
                userName,
                rating,
                comment,
            }),
        });

        if (response.ok) {
            setUserName("");
            setComment("");
            setRating(0);
            window.location.reload();
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.productContainer}>
                <div className={styles.imageSection}>
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={500}
                        height={500}
                        className={styles.productImage}
                    />
                </div>

                <div className={styles.infoSection}>
                    <span className={styles.category}>{product.category}</span>

                    <h1>{product.name}</h1>

                    <p className={styles.price}>${product.price}</p>

                    <p className={styles.description}>{product.description}</p>

                    <button onClick={toggleCart} className={styles.buyButton}>
                        {addedToCart ? "Remove from Cart" : "Add to Cart"}
                    </button>
                </div>
            </div>

            <div className={styles.reviewsSection}>
                <h2>Reviews</h2>

                <form onSubmit={handleSubmit} className={styles.reviewForm}>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                style={{
                                    cursor: "pointer",
                                    fontSize: "2rem",
                                    color:
                                        star <= (hover || rating)
                                            ? "#FFD700"
                                            : "#000000",
                                }}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <textarea
                        placeholder="Write your review..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <button type="submit" className={styles.submitButton}>
                        Submit Review
                    </button>
                </form>

                <div className={styles.reviewsList}>
                    {reviews.map((review: any) => (
                        <div key={review._id} className={styles.reviewCard}>
                            <div className={styles.reviewHeader}>
                                <strong className={styles.reviewUser}>
                                    {review.userName}
                                </strong>
                            </div>

                            <p className={styles.reviewStars}>
                                {"★".repeat(review.rating)}
                            </p>

                            <p className={styles.reviewComment}>
                                {review.comment}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
