import React from "react";

const DinamizandoFooter = () => {
  let currentYear = new Date().getFullYear();
  const linkedinURL =
    "https://www.linkedin.com/in/thompson-raul-dos-santos-vieira-8a1a391aa/";

  return (
    <footer className="flex flex-col items-center justify-center bg-slate-50 shadow-xl h-20">
      <p className="text-gray-600 mb-2">
        <span className="font-bold">Dinamizando</span> &copy; {currentYear}
      </p>
      <p className="text-gray-600">
        Feito por{" "}
        <a
          href={linkedinURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 transition duration-300 ease-in-out transform hover:bg-purple-100 hover:text-purple-700"
        >
          <span className="transition duration-300 ease-in-out hover:text-pink-500">
            Thompson Raul
          </span>
        </a>
      </p>
    </footer>
  );
};

export default DinamizandoFooter;
