"use client";

import { useState } from "react";
import styles from "./page.module.css";
import ProductCard from "@/app/ui/productCard";
import type { ProductData } from "@/app/ui/types";

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
  const [seachValue, setSearchValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(listOfProductData);
  const [activeCategory,setActiveCategory] = useState<string| null>(null)

  const filterCategories = (category:string) => {
    setActiveCategory((prev) =>(prev===category ? null :category))
  };

  const clearFilters = ()=>{
    setActiveCategory(null)
    setSearchValue("")
  }

  const visibleProducts = listOfProductData.filter((product) => {
    const matchesCategory = !activeCategory || product.category === activeCategory;
    const matchesSearch = !seachValue || product.name.toLowerCase().includes(seachValue.toLowerCase()) || product.description.toLowerCase().includes(seachValue.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const categories: string[] = ["WoodCraft", "Pottery", "Textiles"];
  return (
    <div className={styles.productsPage}>
      <div id="searchBar" className={styles.searchBar}>
        <div>
          <label htmlFor="search">Search</label>
          <input id="search" name="search" type="text" value={seachValue} onChange={(e)=>setSearchValue(e.target.value) } />
          <input type="button" value={"Search"} />
        </div>
      </div>
      <div id="leftMeanu" className={styles.leftMenu}>
        <span>Categories</span>
        <ul>
          {categories.map((category) => (
            <li onClick={()=>filterCategories(category)} key={category} className={category === activeCategory ? styles.activeTab : ""}>
              {category}
              
            </li>
          ))}
        </ul>
        <span onClick={clearFilters}>Clear Filters</span>
      </div>
      <div id="productsCollection" className={styles.productsCollection}>
        {visibleProducts.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
}
