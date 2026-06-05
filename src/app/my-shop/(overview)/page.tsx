import Image from "next/image";
import { Metadata } from "next";
import {
  AddCategory,
  AddProduct,
  DeleteProduct,
  EditProduct,
} from "@/app/ui/my-shop/buttons";

import styles from "../../ui/my-shop/myshop.module.css";

export const metadata: Metadata = {
  title: "My Shop",
};

export default function MyShop() {
  const products = [
    {
      id: "1",
      name: "Ceramic Bowl",
      category: "Pottery",
      imageUrl: "/category.webp",
    },
    {
      id: "2",
      name: "Wooden Chair",
      category: "Furniture",
      imageUrl: "/category.webp",
    },
    {
      id: "3",
      name: "Knitted Blanket",
      category: "Textiles",
      imageUrl: "/category.webp",
    },
    {
      id: "4",
      name: "Leather Journal",
      category: "Accessories",
      imageUrl: "/category.webp",
    },
  ];
  return (
    <div className={styles["main-container"]}>
      <h1>My Shop</h1>
      <div className={styles["table-container"]}>
        <table className={styles["main-table"]}>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={50}
                    height={50}
                    priority
                  />
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
          <li className={styles["product-card"]} key={product.id}>
            <div className={styles["product-info"]}>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={50}
                height={50}
                priority
              />
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
        <AddCategory></AddCategory>
      </div>
    </div>
  );
}
