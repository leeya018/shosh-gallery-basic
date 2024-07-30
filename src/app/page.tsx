"use client";

import type { NextPage } from "next";
import MainSection from "../components/MainSection";
import Footer from "../components/Footer";
import Modal from "@/ui/Modal";
import { ModalStore } from "@/mobx/modalStore";
import { modals } from "@/util";
import Message from "@/components/Message";
import { observer } from "mobx-react-lite";
import ProductList from "@/components/ProductList";
import ProductCardView from "@/components/ProductCardView";
import AddButton from "@/components/AddButton";
import EditProductForm from "@/components/EditProductForm";
import { useEffect, useState } from "react";
import axios from "axios";
import productStore from "@/mobx/ProductStore";
// import AddProductForm from "@/components/AddProductForm";
import LoginForm from "@/components/LoginForm";
import authStore from "@/mobx/authStore";
const HomePage = ({}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get("/api/items")
      .then((res) => {
        console.log(res.data);
        productStore.setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="max-h-screen overflow-y-auto">
      <Modal
        isOpen={ModalStore.modalName === modals.productView}
        closeModal={ModalStore.closeModal}
      >
        <ProductCardView pageName={"home"} />
      </Modal>

      <Message />
      {/* <Modal
        isOpen={ModalStore.modalName === modals.addProduct}
        closeModal={ModalStore.closeModal}
      >
        <AddProductForm />
      </Modal> */}

      <Modal
        isOpen={ModalStore.modalName === modals.login}
        closeModal={ModalStore.closeModal}
      >
        <LoginForm />
      </Modal>

      <Modal
        isOpen={ModalStore.modalName === modals.editProduct}
        closeModal={ModalStore.closeModal}
      >
        {productStore.chosenProduct && (
          <EditProductForm
            product={productStore.chosenProduct}
            onClose={ModalStore.closeModal}
          />
        )}
      </Modal>

      {/* {authStore.isLoggedIn && (
        <div className="w-screen flex justify-center ">
          <AddButton />
        </div>
      )} */}
      <MainSection />
      <ProductList
        isLoading={isLoading}
        products={productStore.products}
        pageName="home"
      />
      <Footer />
    </div>
  );
};

export default observer(HomePage);
