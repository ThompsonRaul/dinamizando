import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [showGoToTop, setShowGoToTop] = useState(false);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    setShowGoToTop(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-8 right-8 cursor-pointer transition-opacity duration-300 ${
        showGoToTop ? "opacity-100" : "opacity-0"
      }`}
      onClick={goToTop}
      style={{ zIndex: 1000 }}
    >
      {/* Círculo como a primeira camada */}
      <div className="bg-blue-950 rounded-full w-10 h-10 flex items-center justify-center">
        {/* Ícone de seta como a segunda camada */}
        <FaArrowUp className="text-white" />
      </div>
    </div>
  );
};

export default ScrollToTopButton;
