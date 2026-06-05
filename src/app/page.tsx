import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const features = [
    { title: "Feature 1", image: "/feature.svg" },
    { title: "Feature 2", image: "/feature.svg" },
    { title: "Feature 3", image: "/feature.svg" },
  ];

  const categories = [
    { title: "Category 1", image: "/category.webp" },
    { title: "Category 2", image: "/category.webp" },
    { title: "Category 3", image: "/category.webp" },
  ];

  return (
    <div className={styles.page}>
      {/* Header */}
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <Image
            src="/hero-image.webp"
            alt="Handcrafted objects"
            width={800}
            height={510}
            className={styles["hero-image"]}
            priority
          />
          <Image
            src="/hero-image-mobile.webp"
            width={560}
            height={357}
            className={styles["hero-mobile-image"]}
            alt="Handcrafted objects"
          />
          <div className={styles.ctas}>
            <a className={styles.primary}>Shop Now</a>
          </div>
        </section>
        {/* Shop by categories */}
        <section className={styles.categories}>
          <h1>Categories</h1>
          <div className={styles["categories-container"]}>
            {categories.map((category, index) => (
              <Image
                key={index}
                src={category.image}
                alt={category.title}
                width={300}
                height={200}
                priority
              />
            ))}
          </div>
        </section>
        {/* Features */}
        <section className={styles.features}>
          <h1>Features</h1>
          <ul className={styles["features-container"]}>
            {features.map((feature, index) => (
              <li key={index}>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  height={100}
                  width={100}
                  priority
                />
                <h2>{feature.title}</h2>
              </li>
            ))}
          </ul>
        </section>
      </main>
      {/* Footer */}
    </div>
  );
}
