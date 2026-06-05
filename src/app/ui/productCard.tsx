import styles from "./ui.module.css"
import type {ProductData} from "@/app/ui/types"
import Image from 'next/image'

export default function ProductCard({product}:{product:ProductData}){

    return (
    <div className={styles.productCard} >
        <Image width={300} height={200}  alt={`${product.name} image`} src={`/${product.img}`} className={styles.cardImage} priority/>
        <div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
        </div>
    </div>
    )
}