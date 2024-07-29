import { ModalStore } from "@/mobx/modalStore";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import Loading from "./Loading";
import messageStore from "@/mobx/messageStore";
import cartStore from "@/mobx/cartStore";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "לי",
    lastName: "יהב",
    message: "שלום",
    email: "leeyahav018@gmail.com",
    phone: "0542226666",
    items: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/api/contact", {
        ...formData,
        items: cartStore.items,
      });

      if (response.status === 200) {
        // Handle successful submission
        console.log("Form submitted successfully");
        messageStore.setMessage("message sent", "success");

        ModalStore.closeModal();
      } else {
        // Handle submission error
        console.error("Form submission failed");
        messageStore.setMessage("failed to send message", "error");
      }
      ModalStore.closeModal();
    } catch (error) {
      console.error("Error submitting form:", error);
      messageStore.setMessage("failed to send message", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-gradient p-8 rounded-lg  max-w-3xl mx-auto ">
      <h2 className="text-center text-2xl font-semibold mb-4">
        {"שלח הודעה למוכר"}
      </h2>
      <form onSubmit={handleSubmit} className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            value={formData.firstName}
            name="firstName"
            onChange={handleChange}
            required
            type="text"
            placeholder={"שם פרטי"}
            className="border border-gray-300 p-2 rounded-lg w-full  text-black"
          />
          <input
            value={formData.lastName}
            name="lastName"
            onChange={handleChange}
            required
            type="text"
            placeholder={"שם משפחה"}
            className="border border-gray-300 p-2 rounded-lg w-full text-black"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            value={formData.email}
            name="email"
            onChange={handleChange}
            required
            type="email"
            placeholder={"אימייל"}
            className="border border-gray-300 p-2 rounded-lg w-full text-black"
          />
        </div>

        <div className="mb-4">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder={"הודעה למוכר"}
            className="border border-gray-300 p-2 rounded-lg w-full h-24 text-black"
          />
        </div>

        <div className="mb-4">
          <textarea
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder={"טלפון לחזרה"}
            className="border border-gray-300 p-2 rounded-lg w-full h-24 text-black"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-gold text-white py-2 px-6 rounded-lg bg-blue-500 hover:bg-blue-600"
          >
            {"שלח"}
          </button>
        </div>
        <div>{isLoading && <Loading />}</div>
      </form>
    </div>
  );
};

export default ContactForm;
