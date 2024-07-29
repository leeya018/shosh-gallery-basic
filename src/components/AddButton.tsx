import { ModalStore } from "@/mobx/modalStore";
import { modals } from "@/util";
import React from "react";

const AddButton: React.FC = () => {
  return (
    <button
      onClick={() => ModalStore.openModal(modals.addProduct)}
      className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full shadow-lg flex items-center"
    >
      <span className="mr-2">הוסף מוצר</span>
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4v16m8-8H4"
        ></path>
      </svg>
    </button>
  );
};

export default AddButton;
