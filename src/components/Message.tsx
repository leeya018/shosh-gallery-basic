// components/Message.tsx

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import messageStore from "@/mobx/messageStore";

const Message: React.FC = observer(() => {
  useEffect(() => {
    if (messageStore.message) {
      const timer = setTimeout(() => {
        messageStore.clearMessage();
      }, 3000);

      // Clean up the timer on component unmount or when message changes
      return () => clearTimeout(timer);
    }
  }, []);

  if (!messageStore.message) return null;

  let bgColor;
  switch (messageStore.type) {
    case "success":
      bgColor = "bg-green-500";
      break;
    case "error":
      bgColor = "bg-red-500";
      break;
    case "info":
      bgColor = "bg-blue-500";
      break;
    default:
      bgColor = "bg-blue-500";
  }

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 px-4 py-2
       mt-4 rounded ${bgColor} text-white shadow-md`}
    >
      {messageStore.message}
    </div>
  );
});

export default Message;
