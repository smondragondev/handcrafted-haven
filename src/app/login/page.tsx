"use client";
import Link from "next/link";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import styles from "./login.module.css";

export default function Login() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className={styles.body}>
      <h1>Login</h1>
      <form className={styles.body_from} action={action}>
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
            <p className={styles.error}>{state.errors.password}</p>
          )}
        </div>

        {state?.message && <p className={styles.error}>{state.message}</p>}

        <button className={styles.submit} disabled={pending} type="submit">
          {pending ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className={styles.switch}>
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </p>
    </div>
  );
}
