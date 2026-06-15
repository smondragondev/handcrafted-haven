"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CartItem, ProductData } from "@/app/ui/types";
import { useEffect } from "react";
import Image from "next/image";

export default function CheckoutPage() {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        const storedCart =
            localStorage.getItem("shoppingCart");

        if (!storedCart) return;

        const products: ProductData[] =
            JSON.parse(storedCart);

        const cartProducts: CartItem[] =
            products.map(product => ({
                ...product,
                quantity: 1
            }));

        setCartItems(cartProducts);

    }, []);

    //Cart actions
    const removeItem = (id: string) => {

        const updated =
            cartItems.filter(
                item => item._id !== id
            );

        setCartItems(updated);

        localStorage.setItem(
            "shoppingCart",
            JSON.stringify(updated)
        );
    };

    const decreaseQuantity = (id: string) => {

        const product = cartItems.find(
            item => item._id === id
        );

        if (!product) return;

        if (product.quantity === 1) {
            removeItem(id);
            return;
        }

        setCartItems(
            cartItems.map(item =>
                item._id === id
                    ? {
                        ...item,
                        quantity: item.quantity - 1
                    }
                    : item
            )
        );
    };

    const increaseQuantity = (id: string) => {
        setCartItems(
            cartItems.map(item =>
                item._id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        );
    };

    const handleBuy = async () => {

        const order = {
            orderNumber: `ORD-${Date.now()}`,

            date: new Date().toLocaleDateString(),

            items: cartItems,

            subtotal,
            shipping,
            total,

            createdAt: new Date().toISOString()
        };

        const response = await fetch(
            "/api/orders",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(order)
            }
        );

        if (response.ok) {

            localStorage.setItem(
                "lastOrder",
                JSON.stringify(order)
            );

            localStorage.removeItem("shoppingCart");

            router.push("/checkout/confirmation");
        }
    };

    //Calculations
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = 5;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className={styles.emptyCart}>
                <h1>Your Cart is Empty</h1>

                <p>
                    Start shopping now and discover amazing handcrafted items.
                </p>

                <button
                    className={styles.shopButton}
                    onClick={() => router.push("/products")}
                >
                    Go Shopping
                </button>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            {/* Cart part */}
            <h1>Cart</h1>

            <div className={styles.checkoutContainer}>

                <section className={styles.productsSection}>

                    {cartItems.map((item) => (
                        <div key={item._id} className={styles.productCard}>

                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                width={120}
                                height={120}
                                className={styles.productImage}
                            />

                            <div className={styles.productInfo}>
                                <h3>{item.name}</h3>
                            </div>

                            <div className={styles.quantityBox}>
                                <button
                                    className={styles.quantityButton}
                                    onClick={() => decreaseQuantity(item._id)}
                                >
                                    -
                                </button>

                                <span className={styles.quantityNumber}>{item.quantity}</span>

                                <button
                                    className={styles.quantityButton}
                                    onClick={() => increaseQuantity(item._id)}
                                >
                                    +
                                </button>
                            </div>

                            <div className={styles.price}>
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>

                            <button
                                className={styles.removeButton}
                                onClick={() => removeItem(item._id)}
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
