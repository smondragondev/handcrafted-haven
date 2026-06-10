"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function ConfirmationPage() {

    const user = {
        name: "John Smith",
        email: "johnsmith@email.com"
    };

    const order = {
        orderNumber: "ORD-12345",
        date: "June 10, 2026",
        items: [
            {
                id: 1,
                name: "Handmade Vase",
                price: 25,
                quantity: 1
            },
            {
                id: 2,
                name: "Woven Basket",
                price: 15,
                quantity: 2
            }
        ]
    };

    const router = useRouter();
    const handleContinueShopping = () => {
        router.push("/");
    };

    const subtotal = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const shipping = 5;
    const total = subtotal + shipping;

    return (
        <div className={styles.confirmationCard}>

            <h1 className={styles.successTitle}>
                ✅ Order Confirmed!
            </h1>

            <p className={styles.successMessage}>
                Thank you for your purchase.
            </p>

            <div className={styles.section}>
                <h2>
                    Order Information
                </h2>
                <p>
                    <strong>Order Number:</strong> {order.orderNumber}
                </p>
                <p>
                    <strong>Date:</strong> {order.date}
                </p>

            </div>

            <div className={styles.section}>
                <h2>
                    Customer Information
                </h2>
                <p>
                    {user.name}
                </p>

                <p>
                    {user.email}
                </p>

            </div>

            <div className={styles.section}>
                <h2>
                    Order Summary
                </h2>
                {order.items.map((item) => (
                    <div key={item.id} className={styles.orderItem} >

                        <span>{item.name}</span>

                        <span>x{item.quantity}</span>

                        <span> ${(item.price * item.quantity).toFixed(2)} </span>

                    </div>
                ))}
            </div>

            <div className={styles.summary}>

                <div className={styles.summaryRow}>

                    <span>Subtotal</span>

                    <span> ${subtotal.toFixed(2)} </span>

                </div>

                <div className={styles.summaryRow}>

                    <span>Shipping</span>

                    <span> ${shipping.toFixed(2)} </span>

                </div>

                <div className={styles.totalRow}>

                    <span>Total</span>

                    <span> ${total.toFixed(2)} </span>

                </div>
            </div>

            <button className={styles.continueButton} onClick={handleContinueShopping}>
                Continue Shopping
            </button>

        </div>
    );
}