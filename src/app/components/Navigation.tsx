"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../layout.module.css"; // Importing your CSS module

export default function NavMenu() {
    const pathName = usePathname();
    const [isContributor, setIsContributor] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;
        const user = JSON.parse(storedUser);
        if (user.role === "contributor") {
            setIsContributor(true);
        }
    }, []);

    const navLinks = [
        { href: "/", name: "Home" },
        { href: "/products", name: "Products" },
        ...(isContributor ? [{ href: "/my-shop", name: "My Shop" }] : []),
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
                            <Link
                                className={isActive ? `${styles.active}` : ""}
                                href={navlink.href}
                            >
                                {navlink.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
