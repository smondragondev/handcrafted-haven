"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // 👈 1. Imported Next.js Link component
import styles from "./login.module.css";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "/profile";
        }
    };

    return (
        <div className={styles.body}>
            <h1>Login</h1>
            <form className={styles.body_from} onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                />
                <input type="submit" value={"Login"} />

                
                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                    <span style={{ color: '#555' }}>Don't have an account? </span>
                    <Link 
                        href="/signup" 
                        style={{ 
                            color: '#448061', 
                            textDecoration: 'underline', 
                            fontWeight: 'bold' 
                        }}
                    >
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    );
}