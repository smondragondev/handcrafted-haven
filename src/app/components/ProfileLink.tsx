"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfileLink() {
    const [href, setHref] = useState("/login");
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setHref("/profile");
        }
    }, []);

    return (
        <Link href={href} aria-label="User Account">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                style={{
                    width: "28px",
                    height: "28px",
                }}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
            </svg>
        </Link>
    );
}
