import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-6 flex justify-center items-center border-t border-gray-800 mt-10">
      <div className="max-w-7xl w-full px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-white font-medium">© {new Date().getFullYear()} Bhavish B K</div>
        <div className="flex gap-4">
          <a href="mailto:bhavishbkkudlu@gmail.com" className="text-secondary">Email</a>
          <a href="https://linkedin.com/in/bhavish-b-k" target="_blank" rel="noreferrer" className="text-secondary">LinkedIn</a>
          <a href="https://github.com/Bhavishbk" target="_blank" rel="noreferrer" className="text-secondary">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
