// components/ProductList.tsx

import React, { useEffect, useState } from "react";
// import { products } from "@/util";
import ProductCard from "./ProductCard";
import Loading from "./Loading";
import { observer } from "mobx-react-lite";
import productStore from "@/mobx/ProductStore";
import { Product } from "@/interfaces/Product";

type ProductListProps = {
  isLoading: boolean;
  products: Product[];

  pageName: string;
};
const ProductList: React.FC<ProductListProps> = ({
  isLoading,
  products,
  pageName,
}) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className=" mb-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-4 md:mx-10">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} pageName={pageName} />
      ))}
    </div>
  );
};

export default observer(ProductList);
