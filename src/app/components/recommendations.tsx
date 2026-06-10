import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.css'; // Importing your CSS modules

interface Product {
  id: string;
  title: string;
  price: number;
  imageSrc: string;
  category: string;
}

const MOCK_RECOMMENDATIONS: Product[] = [
  {
    id: 'rec-1',
    title: 'Handcrafted Wooden Bowl',
    price: 45.00,
    imageSrc: '/category.webp',
    category: 'Kitchenware',
  },
  {
    id: 'rec-2',
    title: 'Vintage Ceramic Vase',
    price: 32.00,
    imageSrc: '/category.webp',
    category: 'Home Decor',
  },
  {
    id: 'rec-3',
    title: 'Handwoven Cotton Throw Blanket',
    price: 65.00,
    imageSrc: '/category.webp',
    category: 'Bedding',
  },
  {
    id: 'rec-4',
    title: 'Minimalist Clay Mug',
    price: 18.00,
    imageSrc: '/category.webp',
    category: 'Kitchenware',
  },
];

export default function Recommendations() {
  return (
    <section className={styles.recommendationsSection}>
      
      {/* Heading */}
      <div className={styles.recommendationsHeading}>
        <h2>Recommended For You</h2>
        <p>Based on what other craft lovers are exploring right now.</p>
      </div>

      {/* 4-Column Grid */}
      <div className={styles.recommendationsGrid}>
        {MOCK_RECOMMENDATIONS.map((product) => (
          <div key={product.id} className={styles.productCard}>
            
            {/* Image Container */}
            <div className={styles.imageWrapper}>
              <Image
                src={product.imageSrc}
                alt={product.title}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={styles.cardImage}
                priority
              />
            </div>

            {/* Details */}
            <div className={styles.cardDetails}>
              <p className={styles.categoryTag}>{product.category}</p>
              <h3 className={styles.productTitle}>
                <Link href={`/products/${product.id}`}>
                  {product.title}
                </Link>
              </h3>
              
              <div className={styles.cardFooter}>
                <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                <span className={styles.viewDetails}>View Details &rarr;</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}