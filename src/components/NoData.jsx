import React from 'react'
import noDataImage from "../assets/No_Data.jpg";

const NoData = () => {
  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <img alt='No Data' src={noDataImage} className='w-36' />
      <p className='text-neutral-500'>No data available</p>
    </div>
  )
}

export default NoData
