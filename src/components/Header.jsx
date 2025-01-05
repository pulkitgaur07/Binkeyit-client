import React from "react";
import Logo from "../assets/logo.png";
import LogoSymbol from "../assets/LogoSymbol.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import useMobile from "../hooks/useMobile";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";

  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    navigate("/login");
  }

  return (
    <header className="h-28 lg:h-20 lg:shadow-md bg-white sticky top-0 flex justify-center gap-1 flex-col">
      {!(isSearchPage && isMobile) && (
        <div className="px-4 flex justify-between items-center">
          <Link to={"/"}>
            <img src={Logo} alt="logo" className="hidden md:block" />
            <img src={LogoSymbol} alt="logo" className="md:hidden" />
          </Link>
          <div className="hidden lg:block">
            <Search />
          </div>
          <div className="flex items-center ">
            <button className="text-neutral-600 lg:hidden">
              <FaRegCircleUser size={30} />
            </button>
            <div className="hidden lg:flex items-center gap-10">
              <button onClick={redirectToLoginPage}  className="text-xl">Login</button>
              <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 rounded-md text-white">
                <div className="animate-bounce">
                  <BsCart4 size={26} />
                </div>
                <div className="font-semibold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
