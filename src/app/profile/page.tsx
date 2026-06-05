"use client";

import React, { useState } from "react";
import styles from "./profile.module.css";

// Form input structure blueprint
interface UserProfile {
  name: string;
  email: string;
  bio: string;
  location: string;
}

export default function ProfilePage() {
  // Mock initialized or created profile data
  const [profile, setProfile] = useState<UserProfile>({
    name: "Handcrafted Maker",
    email: "developer@handcraftedhaven.com",
    bio: "Passionate artisan crafting beautiful leather items and unique accessories.",
    location: "Winnipeg, MB",
  });

  // Toggles whether the form is in "View mode" or "Modify mode"
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // Temporary state container to hold modifications during typing
  const [formData, setFormData] = useState<UserProfile>({ ...profile });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData); // Commits the updates to our application state
    setIsEditing(false);  // Switches back to pristine view mode
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <div className={styles.avatarPlaceholder}>👤</div>
          <h2>{profile.name}</h2>
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
              <button type="submit" className={styles.saveBtn}>Save Changes</button>
              <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>Cancel</button>
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
            
            <button 
              className={styles.editBtn} 
              onClick={() => {
                setFormData({ ...profile }); // Synchronize form with current state data
                setIsEditing(true);
              }}
            >
              Modify Profile Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}