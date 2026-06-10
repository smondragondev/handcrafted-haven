import styles from "./signup.module.css"

export default function SignUp(){
    return (
        <div className={styles.body}>
            <h1>Sign Up</h1>
            <form className={styles.body_from}>
                <label>Email</label>
                <input type="email"/>
                <label>Password</label>
                <input type="password" required min={8}/>
                <label>Confirm Password</label>
                <input type="password" required/>
                <input type="submit"  value={"Sign Up"}/>
            </form>
        </div>
    )
}