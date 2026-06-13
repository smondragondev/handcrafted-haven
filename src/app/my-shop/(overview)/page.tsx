import Image from "next/image";
import { Metadata } from "next";
import {
  AddProduct,
  DeleteProduct,
  EditProduct,
} from "@/app/ui/my-shop/buttons";

import styles from "../../ui/my-shop/myshop.module.css";
import { GetAllProducts } from "@/app/lib/mongodb";
import { ProductImage } from "@/app/ui/my-shop/productImage";

export const metadata: Metadata = {
  title: "My Shop",
};

export default async function MyShop() {
  const products = await GetAllProducts();
  console.log("Products:", products);

  return (
    <>
      <h1>My Shop</h1>
      <div className={styles["table-container"]}>
        <table className={styles["main-table"]}>
          <tbody>
            {products.map((product) => (
              <tr key={product._id.toString()}>
                <td>
                  <ProductImage src={product.imageUrl} alt={product.name} />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>
                  <div className={styles["main-buttons"]}>
                    <EditProduct></EditProduct>
                    <DeleteProduct></DeleteProduct>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      <ul className={styles["card-container"]}>
        {products.map((product) => (
          <li className={styles["product-card"]} key={product._id.toString()}>
            <div className={styles["product-info"]}>
              <ProductImage src={product.imageUrl} alt={product.name} />

              <div className="product-name">
                <h2>{product.name}</h2>
                <p>{product.category}</p>
              </div>
            </div>
            <div className={styles["product-button"]}>
              <EditProduct></EditProduct>
              <DeleteProduct></DeleteProduct>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles["main-buttons"]}>
        <AddProduct></AddProduct>
      </div>
    </>
  );
}
