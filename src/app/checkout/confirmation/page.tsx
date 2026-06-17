"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { CartItem } from "@/app/ui/types";

export default function ConfirmationPage() {
    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        const storedOrder = localStorage.getItem("lastOrder");

        if (!storedOrder) return;

        setOrder(JSON.parse(storedOrder));
    }, []);

    const router = useRouter();
    const handleContinueShopping = () => {
        router.push("/");
    };

    if (!order) {
        return <div className={styles.loading}>👾 Loading order...</div>;
    }

    return (
        <div className={styles.confirmationCard}>
            <h1 className={styles.successTitle}>👾 Order Confirmed!</h1>

            <p className={styles.successMessage}>
                Thank you for your purchase.
            </p>

            <div className={styles.section}>
                <h2>Order Information</h2>
                <p>
                    <strong>Order Number:</strong> {order.orderNumber}
                </p>
                <p>
                    <strong>Date:</strong> {order.date}
                </p>
            </div>

            <div className={styles.section}>
                <h2>Order Summary</h2>
                {order.items.map((item: CartItem) => (
                    <div key={item._id} className={styles.orderItem}>
                        <span>{item.name}</span>

                        <span>x{item.quantity}</span>

                        <span>
                            {" "}
                            ${(item.price * item.quantity).toFixed(2)}{" "}
                        </span>
                    </div>
                ))}
            </div>

            <div className={styles.summary}>
                <div className={styles.summaryRow}>
                    <span>Subtotal</span>

                    <span>${order.subtotal.toFixed(2)}</span>
                </div>

                <div className={styles.summaryRow}>
                    <span>Shipping</span>

                    <span>${order.shipping.toFixed(2)}</span>
                </div>

                <div className={styles.totalRow}>
                    <span>Total</span>

                    <span>${order.total.toFixed(2)}</span>
                </div>
            </div>

            <button
                className={styles.continueButton}
                onClick={handleContinueShopping}
            >
                Continue Shopping
            </button>
        </div>
    );
}
