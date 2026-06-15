import Image from "next/image";
import styles from "./page.module.css";
// 1. Cleaner import moved to the top (Matching your lowercase filename)
import Recommendations from "./components/recommendations";

export default function Home() {
  const features = [
    { title: "Unique Handmade Finds", image: "/feature.svg" },
    { title: "Support Small Creators", image: "/feature.svg" },
    { title: "Quality You Can Feel", image: "/feature.svg" },
  ];

  return (
    <div className={styles.page}>
      {/* Header */}
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles["hero-description"]}>
            <h1>Handcrafted Haven</h1>
            <h2>The marketplace for handmade excellence</h2>
            <p>
              Discover unique, handmade treasures from talented artisans around
              the world. Support creators and find one-of-a-kind pieces for your
              home.
            </p>
            <div className={styles.ctas}>
              <a className={styles.primary}>Shop Now</a>
            </div>
          </div>
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

        <Recommendations />
      </main>
    </div>
  );
}
