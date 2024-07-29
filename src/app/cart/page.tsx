"use client";
import ProductList from "@/components/ProductList";
import cartStore from "@/mobx/cartStore";
import { useParams } from "next/navigation";

import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import Modal from "@/ui/Modal";
import { ModalStore } from "@/mobx/modalStore";
import { modals } from "@/util";
import ContactForm from "@/components/ContactForm";
import Message from "@/components/Message";

const CartPage = () => {
  useEffect(() => {
    const itemsStr = localStorage.getItem("cartItems");
    if (itemsStr) {
      const items = JSON.parse(itemsStr);
      cartStore.setItems(items);
    }
  }, []);
  return (
    <div className="max-h-screen overflow-y-auto text-white">
      <button
        onClick={() => ModalStore.openModal(modals.contact)}
        className="flex items-center  text-white px-4 py-2 rounded-md bg-blue-500"
      >
        שלח בקשה למוכר
      </button>
      <Modal
        // bgColor="bg-card-gradient"
        isOpen={ModalStore.modalName === modals.contact}
        closeModal={ModalStore.closeModal}
      >
        <ContactForm />
      </Modal>
      <div className="bg-black bg-opacity-50 mb-10 pb-5">
        <div className="w-full flex justify-center">
          <h1 className="text-2xl font-bold text-white mt-10 underline">
            העגלה שלי{" "}
          </h1>
        </div>

        <div className="flex justify-center text-xl">
          סכום כולל :
          {cartStore.items.reduce((acc, item) => item.price + acc, 0)}
        </div>
      </div>
      <div>
        <ProductList
          products={cartStore.items}
          isLoading={false}
          pageName="cart"
        />
      </div>

      <Message />
    </div>
  );
};
export default observer(CartPage);
