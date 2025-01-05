import React from "react";
import Logo from '../assets/logo.png'
import LogoSymbol from '../assets/LogoSymbol.png'
import Search from "./Search";
import { Link, useLocation } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";

const Header = () => {
  const [ isMobile ] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search"
  
  return (
    <header className="h-28 lg:h-20 lg:shadow-md sticky top-0 flex justify-center gap-1 flex-col">
      {
        !(isSearchPage && isMobile) && (
          <div className="px-4 flex justify-between items-center">
        <Link to={"/"}>
          <img
          src={Logo}
          alt="logo"
          className="hidden md:block"
          />
          <img
          src={LogoSymbol}
          alt="logo"
          className="md:hidden"
          />
        </Link>
        <div className="hidden lg:block">
          <Search/>
        </div>
        <div className="flex items-center ">
          <button className="text-neutral-600 lg:hidden">
            <FaRegCircleUser size={30}/>
          </button>
          <div className="hidden lg:block">
            Cart and Profile
          </div>
        </div>
      </div>
        )
      }
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
