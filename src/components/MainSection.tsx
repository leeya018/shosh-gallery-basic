import React from "react";

const MainSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 bg-background bg-center border-2 bg-black bg-opacity-40  shadow-lg">
      <h1 className="text-4xl font-bold text-white">הגלריה של שוש</h1>
      <p className="mt-4 text-xl text-white max-w-2xl">
        ברוכים הבאים לגלריה של ,שוש אומנית מוכשרת שמביאה לכם את יופיה של ארץ
        ישראל באמצעות ציורים מרהיבים באקריליק. כל ציור בגלריה נושא עמו את הרגעים
        הקסומים והנופים העוצרי נשימה של הארץ – מהגליל הירוק ועד המדבר הזהוב.
        הכנסו וגלו את האמנות שמעוררת את הלב והנשמה.
      </p>
    </section>
  );
};

export default MainSection;
