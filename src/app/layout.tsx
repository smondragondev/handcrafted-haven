import type { Metadata } from "next";
import './globals.css';
import styles from './layout.module.css'; // Importing your CSS module
import { openSans } from "./ui/fonts";
import Link from "next/link";
import pageStyles from './page.module.css'
import Image from 'next/image'
import MobileMenu from "./components/MobileMenu";

export const metadata: Metadata = {
  title: "Handcrafted haven app",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${openSans.className}`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }}>

        {/* 🌟 THE NAVIGATION BAR */}
        <nav className={styles.navbar}>

          {/* 🍔 Dynamic & Interactive Mobile Hamburger Menu Dropdown */}
          <MobileMenu />

          {/* Center: Brand Crest & Title */}
          <div className={styles.logoContainer}>
            <Image
              src="/handcrafted.jpg" 
              alt="Handcrafted Haven Logo"
              className={styles.logoImage}
              height={200}
              width={400}
            />
          </div>

          {/* Middle: Centered Navigation Links (Hidden automatically on Mobile) */}
          <ul className={styles.navLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/my-shop">My Shop</Link></li>
            <li><Link href="/about-us">About Us</Link></li>
          </ul>

          {/* Right: Shopping Cart & Profile Icons */}
          <div className={styles.navUtilities}>
            {/* Shopping Cart Logo */}
            <Link href="/checkout" className={styles.iconBtn} aria-label="View Shopping Cart">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '28px', height: '28px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.385c.178 0 .355.07.488.194l.421 2.527m0 0l1.242 7.452a1.5 1.5 0 001.483 1.254h8.307a1.5 1.5 0 001.483-1.254l1.207-7.243a1.5 1.5 0 00-1.483-1.749H5.568m0 0H19.5" />
              </svg>
            </Link>

            {/* 👤 Profile / Login Link */}
            <Link href="/profile" className={styles.iconBtn} aria-label="User Account">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '28px', height: '28px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Link>
          </div>

        </nav>

        {/* 🌟 APP CORE CONTENT */}
        <main className={pageStyles.main}>
          {children}
        </main>

        {/* 🌟 THE FOOTER */}
        <footer className={styles.footer}>
          <p>©2026 Handcrafted Haven. Remote-Developers🇨🇦🇺🇸🇵🇪🇨🇱🇻🇪.</p>
        </footer>

      </body>
    </html>
  );
}