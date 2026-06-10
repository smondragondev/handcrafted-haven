import styles from "./login.module.css"
import {GetAllProducts} from '@/app/lib/mongodb'

export default async function Login(){

    console.log("_______-")
    console.log(await GetAllProducts())
    console.log("______________")
    return (
        <div className={styles.body}>
            <h1>Login</h1>
            <form className={styles.body_from}>
                <label>Email</label>
                <input type="email" required />
                <label>Password</label>
                <input type="password" required min={8}/>
                <input type="submit"  value={"Login"}/>
            </form>
        </div>
    )
}