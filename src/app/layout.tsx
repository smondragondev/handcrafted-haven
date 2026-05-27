// src/app/layout.tsx
'use client';

import { useState } from 'react';
import './globals.css';
import styles from './layout.module.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }}>
        
        <nav className={styles.navbar}>
          {/* Left: Brand Crest */}
          <div className={styles.logoContainer}>
            <img src="/handcrafted.jpg" alt="Handcrafted Haven Logo" className={styles.logoImage} />
          </div>

          {/* Middle: Desktop Links & Mobile Dropdown overlay */}
          <ul className={`${styles.navLinks} ${menuOpen ? styles.mobileVisible : ''}`}>
            <li><a href="/" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="/products" onClick={() => setMenuOpen(false)}>Products</a></li>
            <li><a href="/categories" onClick={() => setMenuOpen(false)}>Categories</a></li>
            <li><a href="/about" onClick={() => setMenuOpen(false)}>About Us</a></li>
          </ul>

          {/* Right: Actions and Hamburger menu */}
          <div className={styles.navUtilities}>
            <button className={styles.iconBtn} aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '26px', height: '26px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.385c.178 0 .355.07.488.194l.421 2.527m0 0l1.242 7.452a1.5 1.5 0 001.483 1.254h8.307a1.5 1.5 0 001.483-1.254l1.207-7.243a1.5 1.5 0 00-1.483-1.749H5.568m0 0H19.5" />
              </svg>
            </button>

            <button className={styles.iconBtn} aria-label="Account">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '26px', height: '26px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </button>

            {/* 🌟 NEW: Mobile Hamburger Button */}
            <button className={styles.hamburgerBtn} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '26px', height: '26px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </nav>

        <main style={{ flex: 1 }}>{children}</main>

        <footer className={styles.footer}>
          <p>© 2026 Handcrafted Haven. Remote-Developers 🇨🇦🇺🇸🇵🇱🇫🇮</p>
        </footer>

      </body>
    </html>
  );
}