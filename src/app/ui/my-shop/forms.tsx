"use client";
import { useActionState, useEffect, useState } from "react";
import styles from "./myshop.module.css";
import { State } from "@/app/lib/schemas";
import { createProduct } from "@/app/lib/actions";

export function AddProduct() {
  const [hasNewCategory, setHasNewCategory] = useState(false);
  const [category, setCategory] = useState("");
  const initialState: State = { message: null, errors: {}, values: {} };
  const [state, formAction, isPending] = useActionState(
    createProduct,
    initialState,
  );

  const contributorId =
    sessionStorage.getItem("contributorId") ?? "test-contributor";
  const selectedCategory = category || (state.values?.category ?? "");
  const submitWithCategory = (formData: FormData) => {
    setCategory(String(formData.get("category") ?? ""));
    return formAction(formData);
  };

  return (
    <form action={submitWithCategory} className={styles.form}>
      <div className={styles["input-container"]}>
        <div className={styles["input-field"]}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={state.values?.name ?? ""}
          />
          <div className={styles.error} aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
          </div>
        </div>
        <div className={styles["input-field"]}>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows={5}
            defaultValue={state.values?.description ?? ""}
          ></textarea>
        </div>
        <div className={styles["input-field"]}>
          <label htmlFor="category">Category</label>
          <select
            onChange={(e) => {
              setHasNewCategory(e.target.value === "new-category");
              setCategory(e.target.value);
            }}
            id="category"
            name="category"
            value={selectedCategory}
          >
            <option value="">Select a category</option>
            <option value="category-1">Category 1</option>
            <option value="new-category">New Category</option>
          </select>
          <div className={styles.error} aria-live="polite" aria-atomic="true">
            {state.errors?.category &&
              state.errors.category.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
          </div>
        </div>
        {hasNewCategory && (
          <div className={styles["input-field"]}>
            <label htmlFor="new-category">New Category </label>
            <input
              type="text"
              id="new-category"
              name="new-category"
              placeholder="Write the new category"
              defaultValue={state.values?.newCategory ?? ""}
            />
            <div className={styles.error} aria-live="polite" aria-atomic="true">
              {state.errors?.category &&
                state.errors.category.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
            </div>
          </div>
        )}
        <div className={styles["input-field"]}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={state.values?.price ?? ""}
          />
          <div className={styles.error} aria-live="polite" aria-atomic="true">
            {state.errors?.price &&
              state.errors.price.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
          </div>
        </div>
        <div className={styles["input-field"]}>
          <label htmlFor="image">Image</label>
          <input type="file" id="image" name="image" />
        </div>
        <input
          type="hidden"
          name="contributorId"
          id="contributorId"
          value={contributorId}
        />
        <button type="submit" aria-disabled={isPending}>
          Create product
        </button>
      </div>
    </form>
  );
}
