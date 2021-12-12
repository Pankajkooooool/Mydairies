import React from 'react'

const Alert = (props) => {
    
    const {alert} = props
    
    

    return (
        <div id='alert' className='container   mx-auto  space-y-5'>
            <div className=' top-20 left-200 right-5 sm:left-50 sm:right-50 fixed '>
            {alert && 
             <div className="flex justify-between dark:text-white shadow-inner rounded p-3 text-gray-600 bg-purple-300 dark:bg-blue-600 ">
    <p className="self-center"><strong>{alert.type} : </strong>{alert.message} </p>
    <button className="text-xl bold align-center cursor-pointer alert-del" onClick={()=>{document.getElementById('alert').classList.toggle("hidden")}} > &times;</button>
      </div>}
  </div>
        </div>
    )
}

export default Alert
