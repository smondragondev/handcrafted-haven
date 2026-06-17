import styles from "@/app/ui/my-shop/myshop.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className={styles["main-container"]}>{children}</div>;
}
