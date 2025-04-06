import React from 'react'
import { useForm } from "react-hook-form"
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from '../provider/GlobalProvider'

const AddAddress = ({close}) => {
    const { register, handleSubmit, reset } = useForm()
    const { fetchAddress } = useGlobalContext(); 

    const onSubmit = async (data)=>{
        try{
            const response = await Axios({
                ...SummaryApi.createAddress,
                data : {
                    address_line : data.address_line,
                    city : data.city,
                    state : data.state,
                    pincode : data.pincode,
                    country : data.country,
                    mobile : data.mobile
                }
            })

            const { data : responseData } = response;
            if(responseData.success){
                toast.success(responseData.message);
                if(close){
                    close();
                    reset();
                    fetchAddress();
                }
            }
        }
        catch(error){
            AxiosToastError(error);
        }
    } 
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-50 h-screen overflow-auto'>
      <div className='bg-white w-full max-w-lg p-4 mt-8 mx-auto rounded'>
        <div className='flex items-center justify-between gap-4'>
            <h2 className='font-semibold'>Add Address</h2>
            <button onClick={close} className='hover:text-red-500'><IoClose size={25} /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-4 grid gap-4'>
            <div className='grid gap-1'>
                <label htmlFor='address_line'>Address Line :</label>
                <input 
                    type='text'
                    id='address_line'
                    className='border bg-blue-50 p-2 rounded'
                    {...register("address_line",{required:true})}
                />
            </div>
            <div className='grid gap-1'>
                <label htmlFor='city'>City :</label>
                <input 
                    type='text'
                    id='city'
                    className='border bg-blue-50 p-2 rounded'
                    {...register("city",{required:true})}
                />
            </div>
            <div className='grid gap-1'>
                <label htmlFor='state'>State :</label>
                <input 
                    type='text'
                    id='state'
                    className='border bg-blue-50 p-2 rounded'
                    {...register("state",{required:true})}
                />
            </div>
            <div className='grid gap-1'>
                <label htmlFor='pincode'>Pin Code :</label>
                <input 
                    type='text'
                    id='pincode'
                    className='border bg-blue-50 p-2 rounded'
                    {...register("pincode",{required:true})}
                />
            </div>
            <div className='grid gap-1'>
                <label htmlFor='country'>Country :</label>
                <input 
                    type='text'
                    id='country'
                    className='border bg-blue-50 p-2 rounded'
                    {...register("country",{required:true})}
                />
            </div>
            <div className='grid gap-1'>
                <label htmlFor='mobile'>Mobile No :</label>
                <input 
                    type='text'
                    id='mobile'
                    className='border bg-blue-50 p-2 rounded'
                    {...register("mobile",{required:true})}
                />
            </div>
            <button type='submit' className='bg-primary-200 w-full py-2 mt-4 font-semibold hover:bg-primary-100 rounded '>Submit</button>
        </form>
      </div>
    </section>
  )
}

export default AddAddress
