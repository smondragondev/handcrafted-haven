import styles from "./page.module.css";

export default function CheckoutPage() {
    //fake database
    const cartItems = [
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
    ];

    //Const here just for now
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
                                {item.quantity}
                            </div>

                            <div className={styles.price}>
                                ${item.price}
                            </div>

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

                    <button className={styles.buyButton}>
                        Buy
                    </button>
                </aside>

            </div>
        </div>
    )
}
