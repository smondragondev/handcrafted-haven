import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      {/* Header */}
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <Image
            className={styles.logo}
            src="/hero-image.webp"
            alt="Handcrafted objects"
            width={800}
            height={510}
            priority
          />
        </section>
        {/* Shop by categories */}
        <section className={styles.categories}>
            <h1>Categories</h1>
            <div>
               <Image
                  src="/category.webp"
                  alt="Some category"
                  width={300}
                  height={200}
                  priority
                />               
               <Image
                  src="/category.webp"
                  alt="Some category"
                  width={300}
                  height={200}
                  priority
                />               
               <Image
                  src="/category.webp"
                  alt="Some category"
                  width={300}
                  height={200}
                  priority
                />               
            </div>
        </section>
        {/* Features */}
        <section className={styles.features}>
            <h1>Features</h1>
            <div>
               <Image
                  src="/feature.svg"
                  alt="Some category"
                  width={200}
                  height={100}
                  priority
                />               
               <Image
                  src="/feature.svg"
                  alt="Some category"
                  width={200}
                  height={100}
                  priority
                />               
               <Image
                  src="/feature.svg"
                  alt="Some category"
                  width={200}
                  height={100}
                  priority
                />               
               
            </div>
        </section>
      </main>
      {/* Footer */}
    </div>
  );
}
