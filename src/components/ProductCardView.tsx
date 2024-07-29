// components/Product.tsx

import { observer } from "mobx-react-lite";
import Image from "next/image";
import React from "react";
import cartStore from "@/mobx/cartStore";
import productStore from "@/mobx/ProductStore";

type ProductCardView = {
  pageName: string;
};

const ProductCardView: React.FC<ProductCardView> = ({ pageName }) => {
  if (!productStore.chosenProduct) return <div></div>;

  const { id, name, imageUrl, price, currency, description } =
    productStore.chosenProduct;

  const isExists = cartStore.isItemExists(productStore.chosenProduct);

  const addToCart = () => {
    if (!productStore.chosenProduct) return;
    if (cartStore.isItemExists(productStore.chosenProduct)) {
      return;
    }
    cartStore.addItem(productStore.chosenProduct);
  };
  console.log({ imageUrl });
  return (
    <div className=" mx-2  my-5 rounded-xl  bg-card-gradient cursor-pointer ">
      <div className=" relative w-full h-[60vh]">
        <Image
          alt={name + "תמונה של"}
          src={imageUrl ? imageUrl : "/"}
          layout="fill"
          className=" bg-center object-cover "
        />
      </div>
      <div className="my-4 px-5 py-2 text-white">
        <h3 className="text-lg font-semibold mb-2 whitespace-normal  ">
          {name}
        </h3>
        <h3 className="text-lg font-semibold mb-2 whitespace-normal  ">
          מחיר : {price} {currency}
        </h3>
        <h3 className="text-lg font-semibold mb-2 whitespace-normal  ">
          {description}
        </h3>
      </div>

      <button
        onClick={addToCart}
        disabled={isExists}
        className={`${
          isExists ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
        } flex items-center  text-white px-4 py-2 rounded-md `}
      >
        {isExists ? "הוסף לעגלה" : "הכנס לעגלה"}
      </button>
    </div>
  );
};

export default observer(ProductCardView);
