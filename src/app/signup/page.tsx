"use client";
import Link from "next/link";
import { useActionState } from "react";
import { signup } from "@/app/actions/auth";
import styles from "./signup.module.css";

export default function SignUp() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className={styles.body}>
      <h1>Sign Up</h1>
      <form className={styles.body_from} action={action}>
        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" placeholder="Name" />
          {state?.errors?.name && (
            <p className={styles.error}>{state.errors.name}</p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email" />
          {state?.errors?.email && (
            <p className={styles.error}>{state.errors.email}</p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
          {state?.errors?.password && (
            <div className={styles.error}>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {state?.message && <p className={styles.error}>{state.message}</p>}

        <button className={styles.submit} disabled={pending} type="submit">
          {pending ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p className={styles.switch}>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
}
