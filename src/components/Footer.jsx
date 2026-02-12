import React from "react";
import portfolio from "../../data/portfolio.json";

const Footer = () => {
  return (
    <footer className="w-full py-6 flex justify-center items-center border-t border-gray-800 mt-10">
      <div className="max-w-7xl w-full px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-white font-medium">© {new Date().getFullYear()} {portfolio.name}</div>
        <div className="flex gap-4">
          <a href={`mailto:${portfolio.email}`} className="text-secondary">Email</a>
          <a href={portfolio.linkedin} target="_blank" rel="noreferrer" className="text-secondary">LinkedIn</a>
          <a href={portfolio.github} target="_blank" rel="noreferrer" className="text-secondary">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
