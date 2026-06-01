import styles from "./ui.module.css"
import type {ProductData} from "@/app/ui/types.ts"

export default function ProductCard({product}:{product:ProductData}){

    return (
    <div className={styles.productCard} >
        <img src={product.img}/>
        <div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
        </div>
    </div>
    )
}