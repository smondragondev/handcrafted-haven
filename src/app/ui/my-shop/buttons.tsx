import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from "./myshop.module.css";

export function AddProduct() {
  return (
    <Link href="/my-shop/product/create"
          className={styles["primary-button"]}>
      <span>Add Product</span>
      <PlusIcon className={styles["icon"]}></PlusIcon>
    </Link>
  );
}

export function AddCategory() {
    return (
        <Link href="#" className={styles["primary-button"]}>
            <span>Add Category</span>
            <PlusIcon className={styles["icon"]}></PlusIcon>
        </Link>
    )
}

export function EditProduct() {
    return (
        <Link href="" className={styles["edit-button"]}>
            <PencilIcon className={styles["icon-button"]}></PencilIcon>
        </Link>
    )
}

export function DeleteProduct() {
    return (
        <form action="">
            <button className={styles["delete-button"]}>
                <TrashIcon className={styles["icon-button"]}></TrashIcon>
            </button>
        </form>
    )
}
