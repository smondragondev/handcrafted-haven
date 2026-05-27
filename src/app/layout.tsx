// src/app/layout.tsx
import './globals.css';
import styles from './layout.module.css'; //  Importing your CSS module

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }}>
        
        {/* 🌟 THE NAVIGATION BAR */}
        <nav className={styles.navbar}>
          
          {/* Left: Brand Crest & Title */}
          <div className={styles.logoContainer}>
            <img 
              src="/handcrafted.jpg" // Using your exact asset path from the file tree!
              alt="Handcrafted Haven Logo" 
              className={styles.logoImage} 
            />
          </div>

          {/* Middle: Centered Navigation Links */}
          <ul className={styles.navLinks}>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>

          {/* Right: Shopping Cart & Profile Icons */}
          <div className={styles.navUtilities}>
            {/* Shopping Cart Logo */}
            <button className={styles.iconBtn} aria-label="View Shopping Cart">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '28px', height: '28px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.385c.178 0 .355.07.488.194l.421 2.527m0 0l1.242 7.452a1.5 1.5 0 001.483 1.254h8.307a1.5 1.5 0 001.483-1.254l1.207-7.243a1.5 1.5 0 00-1.483-1.749H5.568m0 0H19.5" />
              </svg>
            </button>

            {/* Profile / Login Logo */}
            <button className={styles.iconBtn} aria-label="User Account">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '28px', height: '28px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </button>
          </div>

        </nav>

        {/* 🌟 APP CORE CONTENT */}
        <main style={{ flex: 1 }}>
          {children}
        </main>

        {/* 🌟 THE FOOTER */}
        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Handcrafted Haven. Remote-Developers🇨🇦🇺🇸🇨🇱🇦🇷.</p>
        </footer>

      </body>
    </html>
  );
}