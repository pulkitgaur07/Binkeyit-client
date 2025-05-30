import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from 'react-hot-toast';
import Axios from "./utils/Axios";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { setAllCategory, setAllSubCategory, setLoadingCategory } from "./store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "./common/SummaryApi";
import GlobalProvider from "./provider/GlobalProvider";
import CartMobileLink from "./components/CartMobileLink";

function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state?.user);

  const fetchUser = async()=>{
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData?.data));
  }

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name))));
      }
    } catch (error) {
    }
    finally{
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name))));
      }
    } catch (error) {
    }
  };

  useEffect(()=>{
    if (user && user._id){
      fetchUser();
    }
    fetchCategory();
    fetchSubCategory();
  },[]);

  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[76vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {
        (location.pathname !== '/checkout') && (
          <CartMobileLink />
        ) 
      }
    </GlobalProvider>
  );
}

export default App;
