// components/Loading.tsx

import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
