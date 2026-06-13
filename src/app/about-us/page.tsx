"use client";

import styles from "./page.module.css";


export default function AboutUsPage() {

    return (
        <div className={styles.aboutPage}>
            <div className={styles.content}>
                <h1>About Us</h1>

                <div className={styles.sectionsContainer}>
                    <section className={styles.section}>
                        <h2>About Handcrafted Haven</h2>

                        <p>
                            We at Handcrafted Haven believe that every handmade product is
                            made with heart and tells a unique story. Our goal is for artisans
                            to share those stories, that passion, and that talent with people
                            who value the artistry and quality that comes with handcrafted goods.
                        </p>

                        <p>
                            Handcrafted Haven was born with the vision of connecting creators
                            with a community of buyers seeking unique and meaningful products.
                            In a world dominated by mass production, we want to highlight the
                            true human essence, the dedication, and the artistry behind each
                            handmade piece.
                        </p>

                        <p>

                            We believe in supporting small-scale creators and strengthening a
                            community where talent and innovation can flourish.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>About Our Team</h2>

                        <p>
                            Handcrafted Haven was created by RemoteDevelopers, a team that
                            innovates and helps others create accessible and user-friendly websites.
                        </p>

                        <p>
                            Through collaboration and continuous learning, our team worked together
                            to build a platform that deeply connects artisans and customers.
                        </p>

                        <p>
                            Our goal is to provide a secure, efficient, and enjoyable experience, adhering
                            to web development standards and best practices.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}