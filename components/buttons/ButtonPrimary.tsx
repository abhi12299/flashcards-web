import React from "react";

const ButtonPrimary: React.FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = ({ children, ...rest }) => {
  return (
    <button {...rest} className="py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg bg-orange-500 hover:shadow-orange-md transition-all outline-none">
      {children}
    </button>
  );
};

export default ButtonPrimary;
