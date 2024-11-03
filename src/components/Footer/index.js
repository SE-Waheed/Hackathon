import React from 'react'

export default function Footer() {
    const year = new Date().getFullYear()
  return (
    <>
    <div className="container-fluid w-100">
        <div className="row">
            <div className="col bg-black p-2">
                <p className='text-center text-white m-0 p-1'>&copy; All Rights Reserved {year}</p>
            </div>
        </div>
    </div>
      
    </>
  )
}
