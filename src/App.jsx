import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from 'react-hot-toast';
import Axios from "./utils/Axios";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { setAllCategory, setAllSubCategory } from "./store/productSlice";
import { useDispatch } from "react-redux";
import SummaryApi from "./common/SummaryApi";

function App() {

  const dispatch = useDispatch();

  const fetchUser = async()=>{
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData?.data));
  }

  const fetchCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCategory,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
    } catch (error) {
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data));
      }
    } catch (error) {
    }
  };

  useEffect(()=>{
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  },[]);

  return (
    <>
      <Header />
      <main className="min-h-[76vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
