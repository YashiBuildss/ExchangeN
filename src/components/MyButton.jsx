import React from 'react'

const Mybutton = ({ children }) => {
  return (
   <button className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800'>
    {children}
   </button>
  )
}

export default Mybutton;