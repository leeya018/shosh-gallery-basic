"use client";

import type { NextPage } from "next";
import MainSection from "../components/MainSection";
import Footer from "../components/Footer";
import Modal from "@/ui/Modal";
import { ModalStore } from "@/mobx/modalStore";
import { modals, productsItems } from "@/util";
import Message from "@/components/Message";
import { observer } from "mobx-react-lite";
import ProductList from "@/components/ProductList";
import ProductCardView from "@/components/ProductCardView";
import AddButton from "@/components/AddButton";
import EditProductForm from "@/components/EditProductForm";
import { useEffect, useState } from "react";
const HomePage = ({}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="max-h-screen overflow-y-auto">
      <Modal
        isOpen={ModalStore.modalName === modals.productView}
        closeModal={ModalStore.closeModal}
      >
        <ProductCardView pageName={"home"} />
      </Modal>

      <Message />

      <MainSection />
      <ProductList
        isLoading={isLoading}
        products={productsItems}
        // products={productsItems}
        pageName="home"
      />
      <Footer />
    </div>
  );
};

export default observer(HomePage);
