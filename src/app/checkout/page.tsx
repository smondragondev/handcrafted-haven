"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    //fake database
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Handmade Vase",
            price: 25,
            quantity: 1,
            image: "/vase.jpg"
        },
        {
            id: 2,
            name: "Woven Basket",
            price: 15,
            quantity: 2,
            image: "/basket.jpg"
        }
    ]);
    //Const here just for now

    //Cart actions
    const removeItem = (id: number) => {
        setCartItems(
            cartItems.filter(item => item.id !== id)
        );
    };

    const decreaseQuantity = (id: number) => {
        const product = cartItems.find(
            item => item.id === id
        );

        if (!product) return;

        if (product.quantity === 1) {
            removeItem(id);
            return;
        }

        setCartItems(
            cartItems.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity - 1
                    }
                    : item
            )
        );
    };

    const increaseQuantity = (id: number) => {
        setCartItems(
            cartItems.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const router = useRouter();

    const handleBuy = () => {
        router.push("/checkout/confirmation");
    };

    //Calculations
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = 5;
    const total = subtotal + shipping;

    return (
        <div className={styles.page}>
            {/* Cart part */}
            <h1>Cart</h1>

            <div className={styles.checkoutContainer}>

                <section className={styles.productsSection}>

                    {cartItems.map((item) => (
                        <div key={item.id} className={styles.productCard}>

                            <div className={styles.productImage}></div>

                            <div className={styles.productInfo}>
                                <h3>{item.name}</h3>
                            </div>

                            <div className={styles.quantityBox}>
                                <button
                                    className={styles.quantityButton}
                                    onClick={() => decreaseQuantity(item.id)}
                                >
                                    -
                                </button>

                                <span className={styles.quantityNumber}>{item.quantity}</span>

                                <button
                                    className={styles.quantityButton}
                                    onClick={() => increaseQuantity(item.id)}
                                >
                                    +
                                </button>
                            </div>

                            <div className={styles.price}>
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>

                            <button
                                className={styles.removeButton}
                                onClick={() => removeItem(item.id)}
                            >
                                ✕
                            </button>

                        </div>
                    ))}
                </section>

                {/* Summary Section */}
                <aside className={styles.summarySection}>
                    <h2>Your Order</h2>

                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className={styles.summaryRow}>
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>

                    <div className={styles.summaryRow}>
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <button className={styles.buyButton} onClick={handleBuy}>
                        Buy
                    </button>
                </aside>

            </div>
        </div>
    )
}
