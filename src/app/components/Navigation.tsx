'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../layout.module.css"; // Importing your CSS module

export default function NavMenu() {
  const pathName = usePathname();
  const navLinks = [
    { href: "/", name: "Home" },
    { href: "/products", name: "Products" },
    { href: "/my-shop", name: "My shop" },
    { href: "/about-us", name: "About us" },
  ];
  return (
    <>
      {/* Middle: Centered Navigation Links (Hidden automatically on Mobile) */}
      <ul className={styles.navLinks}>
        {navLinks.map((navlink) => {
          const isActive = pathName === navlink.href;
          return (
            <li key={navlink.href}>
              <Link className={isActive ? `${styles.active}` : ""} href={navlink.href}>
                {navlink.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
