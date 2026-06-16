"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../layout.module.css"; 

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* 🍔 Interactive Hamburger Trigger */}
      <button 
        className={styles.hamburgerBtn} 
        onClick={handleToggle} 
        aria-label="Toggle Navigation Menu"
        style={{ cursor: 'pointer', zIndex: 100000 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '28px', height: '28px' }}>
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </button>

      {/* 📜 Full-Width Viewport Slide Overlay */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            width: '100vw',
            height: 'calc(100vh - 70px)',
            backgroundColor: '#FAF8F5',
            borderTop: '2px solid #D2FFC4',
            zIndex: 999999,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 0',
            boxSizing: 'border-box'
          }}
        >
          <Link href="/" onClick={() => setIsOpen(false)} style={{ padding: '15px 30px', color: '#448061', textDecoration: 'none', fontWeight: 600, fontSize: '1.2rem' }}>Home</Link>
          <Link href="/products" onClick={() => setIsOpen(false)} style={{ padding: '15px 30px', color: '#448061', textDecoration: 'none', fontWeight: 600, fontSize: '1.2rem' }}>Products</Link>
          <Link href="/categories" onClick={() => setIsOpen(false)} style={{ padding: '15px 30px', color: '#448061', textDecoration: 'none', fontWeight: 600, fontSize: '1.2rem' }}>Categories</Link>
          <Link href="/about-us" onClick={() => setIsOpen(false)} style={{ padding: '15px 30px', color: '#448061', textDecoration: 'none', fontWeight: 600, fontSize: '1.2rem' }}>About Us</Link>
        </div>
      )}
    </>
  );
}