import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft  } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false);
    const [ isMobile ] = useMobile();

    useEffect(()=>{
        const isSearch = location.pathname === "/search";
        setIsSearchPage(isSearch);
    },[location]);

    const redirectToSearchPage = ()=>{
        navigate("/search");
    }

  return (
    <div className="w-full min-w-[300px] lg:min-w-[400px] h-10 lg:h-12 rounded-lg flex items-center border text-neutral-600 bg-slate-50 group focus-within:border-primary-200">
      <div>
      {
        (isMobile && isSearchPage) ? (
          <Link to="/">
          <button className="p-1 m-2 group-focus-within:text-primary-200 bg-white rounded-full shadow-md">
            <FaArrowLeft  size={20} />
          </button>
          </Link>
        ):(
          <button className="p-4 group-focus-within:text-primary-200">
            <IoSearch size={20} />
          </button>
        )
      }
      </div>
      <div className="w-full h-full">
        {
            !isSearchPage ? (
                <div className="w-full h-full flex items-center" onClick={redirectToSearchPage}>
                    <TypeAnimation
                    sequence={[
                        'Search "milk"',
                        1000,
                        'Search "bread"',
                        1000,
                        'Search "sugar"',
                        1000,
                        'Search "paneer"',
                        1000,
                        'Search "chocolate"',
                        1000,
                        'Search "curd"',
                        1000,
                        'Search "rice"',
                        1000,
                        'Search "egg"',
                        1000,
                        'Search "chips"',
                        1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    />
                </div>
            ):(
                <div className="w-full h-full">
                    <input 
                        type="text"
                        placeholder="Search for aata, dal and more..."
                        autoFocus
                        className="w-full h-full bg-transparent outline-none"
                    />
                </div>
            )
        }
      </div>
    </div>
  );
};

export default Search;
