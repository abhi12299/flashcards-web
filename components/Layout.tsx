import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
