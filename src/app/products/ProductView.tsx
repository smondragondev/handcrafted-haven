"use client";

import { useState } from "react";
import styles from "./page.module.css";
import ProductCard from "@/app/ui/productCard";
import type { ProductData } from "@/app/ui/types";
import {GetAllProducts} from "@/app/lib/mongodb"


export default function ProductView({products}:{products:ProductData[]}) {
  const [seachValue, setSearchValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(products);
  const [activeCategory,setActiveCategory] = useState<string| null>(null)

  const filterCategories = (category:string) => {
    setActiveCategory((prev) =>(prev===category ? null :category))
  };
  const clearFilters = () => {
    setActiveCategory(null);
  };



  const visibleProducts = products.filter((product) => {
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
