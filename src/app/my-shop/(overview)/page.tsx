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

  return (
    <>
      <div className={styles["header"]}>
        <h1>My Shop</h1>
        <AddProduct></AddProduct>
      </div>
      <div className={styles["table-container"]}>
        <table className={styles["main-table"]}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Descriptions</th>
              <th>Actions</th>
            </tr>
          </thead>
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
                    <EditProduct id={product._id.toString()}></EditProduct>
                    <DeleteProduct
                      id={product._id.toString()}
                      imageUrl={product.imageUrl}
                    ></DeleteProduct>
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
              <EditProduct id={product._id.toString()}></EditProduct>
              <DeleteProduct
                id={product._id.toString()}
                imageUrl={product.imageUrl}
              ></DeleteProduct>
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
