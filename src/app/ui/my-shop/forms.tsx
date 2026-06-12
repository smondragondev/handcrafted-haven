import { PlusIcon } from "@heroicons/react/24/outline";
import styles from "./myshop.module.css";

export function AddProduct() {
  return (
    <form className={styles.form}>
      <div className={styles["input-field"]}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name"/>
      </div>
      <div className={styles["input-field"]}>
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" rows={5}></textarea>
      </div>
      <div className={styles["input-field"]}>
        <label htmlFor="">Category</label>
        <select>
            <option value="">Category 1</option>
        </select>
      </div>
      <div className={styles["input-field"]}>
        <label htmlFor="name">New Category </label>
        <input type="text" id="new-category" placeholder="Write the new category"/>
      </div>
      <div className={styles["input-field"]}>
        <label htmlFor="price">Price</label>
        <input type="number" id="price"/>
      </div>
      <div className={styles["input-field"]}>
        <label htmlFor="">Image</label>
        <input type="file" />
      </div>
      <button type="submit">Create product</button>
    </form>
  );
}
// name
// "Handmade Vase"
// description
// "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beautifully s…"
// category
// "Pottery"
// price
// 25
// imageUrl
// "/vase.jpg"
// contributorId
// 64c9d72a1f4b2321a4f1a001
// createdAt
// 2026-06-04T00:00:00.000+00:00
