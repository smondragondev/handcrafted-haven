"use client";

import { useState } from "react";
import styles from "./page.module.css";
import ProductCard from "@/app/ui/productCard";
import type { ProductData } from "@/app/ui/types.ts";

const listOfProductData: ProductData[] = [
  {
    name: "Test 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque at laudantium architecto, perspiciatis commodi eius obcaecati voluptate ea? Vero voluptates, iusto earum voluptas sequi quia nisi. Iure odit consectetur soluta.",
    category: "WoodCraft",
    img: "image-placeholder.jpg",
  },
  {
    name: "Test 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    category: "Pottery",
    img: "image-placeholder.jpg",
  },
  {
    name: "Test 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque at laudantium architecto, perspiciatis commodi eius obcaecati voluptate ea? V",
    category: "WoodCraft",
    img: "image-placeholder.jpg",
  },
  {
    name: "Test 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque at laudantium architecto, perspiciatis commodi eius obcaecati voluptate ea? Vero voluptates, iusto earum voluptas sequi quia nisi.",
    category: "Textiles",
    img: "image-placeholder.jpg",
  },
];

export default function Page() {
  const [seachValue, setSearchValue] = useState();
  const [categoryFilter, setCategoryFilter] = useState(listOfProductData);

  const filterCategories = (e:React.MouseEvent<HTMLLIElement>) => {
    const selected = e.currentTarget.innerText;
     setCategoryFilter(listOfProductData.filter((curData) => curData.category === selected))
  };

  const clearFilters = ()=>{
    setCategoryFilter(listOfProductData)
  }

  const categories: string[] = ["WoodCraft", "Pottery", "Textiles"];
  return (
    <div className={styles.productsPage}>
      <div id="searchBar" className={styles.searchBar}>
        <div>
          <label htmlFor="search">Search</label>
          <input id="search" type="text" />
          <input type="button" value={"Search"} />
        </div>
      </div>
      <div id="leftMeanu" className={styles.leftMenu}>
        <span>Categories</span>
        <ul>
          {categories.map((category) => (
            <li onClick={filterCategories} key={category}>
              {category}
            </li>
          ))}
        </ul>
        <span onClick={clearFilters}>Clear Filters</span>
      </div>
      <div id="productsCollection" className={styles.productsCollection}>
        {categoryFilter.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
}
