import React, { useState } from "react";
import { logo, icon, mic } from "../assets";
import { BiMoon } from "react-icons/bi";
import { BsSun } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const chngTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const sendData = (value) => {
    setSearch(value);
    navigate("/searchPage", { state: { value: value, theme: theme } });
  };

  return (
    <div
      className={`h-screen flex flex-col items-center justify-center transition-all duration-300 ${
        theme === "light" ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      {/* Navbar */}
      <div className="absolute top-4 left-4 flex items-center space-x-6">
        {theme === "light" ? (
          <BiMoon className="text-xl cursor-pointer" onClick={chngTheme} />
        ) : (
          <BsSun className="text-xl cursor-pointer" onClick={chngTheme} />
        )}
        <h4 className="cursor-pointer text-sm md:text-lg hover:underline">
          Gmail
        </h4>
        <h4 className="cursor-pointer text-sm md:text-lg hover:underline">
          Images
        </h4>
      </div>

      {/* Logo */}
      <div className="w-32 md:w-40">
        <img src={logo} alt="Logo" className="w-full" />
      </div>

      {/* Search Bar */}
      <div className="flex items-center border border-gray-300 rounded-full p-2 w-11/12 md:w-[38rem] shadow-sm mt-6">
        <img src={icon} alt="Search Icon" className="w-5 ml-3" />
        <input
          type="text"
          onKeyUp={(event) =>
            event.key === "Enter" ? sendData(event.target.value) : null
          }
          placeholder="Search Google or type a URL"
          className="flex-1 bg-transparent outline-none px-4 placeholder-gray-500 text-lg"
        />
        <img src={mic} alt="Mic Icon" className="w-5 mr-3" />
      </div>
    </div>
  );
};

export default HomePage;
