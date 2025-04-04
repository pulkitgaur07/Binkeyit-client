import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import LogoSymbol from "../assets/LogoSymbol.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import useMobile from "../hooks/useMobile";
import { useSelector } from "react-redux";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import UserMenu from "./UserMenu";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { useGlobalContext } from "../provider/GlobalProvider";
import DisplayCartItem from "./DisplayCartItem";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";

  const user = useSelector((state)=> state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  // const [totalPrice, setTotalPrice] = useState(0);
  // const [totalQty, setTotalQty] = useState(0);
  const [openCartSection,setOpenCartSection] = useState(false);

  const cartItem = useSelector(state => state.cartItem.cart) || [];
  const { totalPrice, totalQty } = useGlobalContext();

  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    navigate("/login");
  }

  const handleCloseUserMenu = ()=>{
    setOpenUserMenu(false);
  }

  const handleMobileUser = ()=>{
    if(!user._id){
      navigate("/login");
      return;
    }
    navigate("/user");
  }

  // useEffect(()=>{
  //   const qty = cartItem?.reduce((prev,curr)=>{
  //     return prev + curr.quantity;
  //   },0);
  //   setTotalQty(qty);

  //   const tPrice = cartItem?.reduce((prev,curr)=>{
  //     return prev + (curr.productId.price * curr.quantity);
  //   },0);
  //   setTotalPrice(tPrice);

  // },[cartItem]);

  return (
    <header className="h-28 lg:h-20 lg:shadow-md bg-white sticky top-0 z-40 flex justify-center gap-1 flex-col">
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
            <button className="text-neutral-600 lg:hidden" onClick={handleMobileUser}>
              <FaRegCircleUser size={30} />
            </button>
            <div className="hidden lg:flex items-center gap-10">
              {
                user?._id ? (
                  <div className="relative">
                    <div onClick={()=>setOpenUserMenu(prev=> !prev)} className="flex selection-none items-center gap-2 cursor-pointer">
                      <p>Account</p>
                      {
                        openUserMenu ? (<FaCaretUp size={25}/>) : (<FaCaretDown size={25}/>)
                      }
                    </div>
                    {
                      openUserMenu && (
                        <div className="absolute right-0 top-16">
                          <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                            <UserMenu close={handleCloseUserMenu} />
                          </div>
                        </div>
                      )
                    }
                  </div>
                ) : (
                  <button onClick={redirectToLoginPage}  className="text-xl">Login</button>
                )
              }
              <button onClick={()=> setOpenCartSection(true)} className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded-md text-white">
                <div className="animate-bounce">
                  <BsCart4 size={26} />
                </div>
                <div className="font-semibold text-sm">
                  {
                    cartItem[0] ? (
                      <>
                        <p>{totalQty} Items</p>
                        <p>{DisplayPriceInRupees(totalPrice)}</p>
                      </>
                    ) : (
                      <p>My Cart</p>
                    )
                  }
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
      {
        openCartSection && (
          <DisplayCartItem close={()=>setOpenCartSection(false)} />
        )
      }
    </header>
  );
};

export default Header;
