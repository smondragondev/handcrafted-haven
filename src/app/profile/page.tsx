"use client";

import React, { useState, useEffect } from "react";
import styles from "./profile.module.css";
import { User } from "@/app/ui/types";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            router.push("/login");
            return;
        }
        const user: User = JSON.parse(storedUser);
        const sanitizedUser = {
            ...user,
            bio: user.bio || "",
            location: user.location || "",
            role: user.role || "customer",
        };

        setProfile(sanitizedUser);
        setFormData(sanitizedUser);
    }, [router]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        if (!formData) return;
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!formData) return;
        setProfile(formData);
        localStorage.setItem("user", JSON.stringify(formData));
        setIsEditing(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };

    const becomeContributor = async () => {
        if (!profile?._id) return;

        const response = await fetch("/api/become-contributor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: profile._id,
            }),
        });

        if (response.ok) {
            const updatedUser = {
                ...profile,
                role: "contributor" as const,
            };

            setProfile(updatedUser);
            setFormData(updatedUser);

            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        window.location.reload();
    };

    if (!profile || !formData) {
        return (
            <div className={styles.container}>
                <div className={styles.profileCard}>
                    <h2>Loading profile...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.profileCard}>
                <div className={styles.avatarSection}>
                    <div className={styles.avatarPlaceholder}>👤</div>
                    <h2>{profile.name}</h2>
                    <p>Role: {profile.role}</p>
                    <p className={styles.locationTag}>📍 {profile.location}</p>
                </div>

                {/* CONDITIONALLY RENDER: Modify Form vs Public View */}
                {isEditing ? (
                    <form onSubmit={handleSave} className={styles.form}>
                        <h3>Modify Handcrafted Profile</h3>

                        <label className={styles.label}>
                            Full Name
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </label>

                        <label className={styles.label}>
                            Email Address
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </label>

                        <label className={styles.label}>
                            Location
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                            />
                        </label>

                        <label className={styles.label}>
                            Artisan Bio
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                rows={4}
                            />
                        </label>

                        <div className={styles.buttonGroup}>
                            <button type="submit" className={styles.saveBtn}>
                                Save Changes
                            </button>
                            <button
                                type="button"
                                className={styles.cancelBtn}
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className={styles.viewSection}>
                        <div className={styles.infoGroup}>
                            <h4>Email</h4>
                            <p>{profile.email}</p>
                        </div>
                        <div className={styles.infoGroup}>
                            <h4>About Artisan</h4>
                            <p>{profile.bio}</p>
                        </div>
                        <div className={styles.infoGroup}>
                            <h4>Role</h4>
                            <p>{profile.role}</p>
                        </div>

                        {profile.role === "contributor" && (
                            <button
                                className={styles.editBtn}
                                onClick={() => router.push("/my-shop")}
                            >
                                Add Product
                            </button>
                        )}
                        {profile.role === "customer" && (
                            <button
                                className={styles.editBtn}
                                onClick={becomeContributor}
                            >
                                Become Contributor
                            </button>
                        )}
                        <button
                            className={styles.editBtn}
                            onClick={() => {
                                setFormData({ ...profile }); // Synchronize form with current state data
                                setIsEditing(true);
                            }}
                        >
                            Modify Profile Settings
                        </button>
                        <button
                            className={styles.editBtn}
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
