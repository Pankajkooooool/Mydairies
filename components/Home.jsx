import React from 'react'
import AddNote from './AddNote'
import Allnotes from './Allnotes'
import {Navigate} from 'react-router-dom'

const Home = () => {
  let scrolltoTop = ()=>{
    document.body.scrollTop = 5;
    document.documentElement.scrollTop = 5;
  }
  
  if(localStorage.getItem('token')){
    return (
        <div className=" mt-3 mb-3">
            <h1 className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-pink-300 via-purple-600  to-blue-700 dark:from-green-200  dark:to-blue-500 text-center m-2 overflow-hidden" id="banner"
            >
        MY DAIRIES.com
      </h1>
      <AddNote/>
      <Allnotes />
    {/* feather icon to acess addnote*/}
      <div  className="ml-4 inline-flex float-right bg-blue-400 border-0 p-5 m-2 focus:outline-none hover:bg-blue-300 fixed right-10 shadow-2xl bottom-10 z-10 dark:bg-indigo-800 dark:hover:bg-blue-900 rounded-full " onClick={scrolltoTop}>
      <i className="fas fa-feather-alt"></i>
    </div>

        </div>
    )
  }
  else {
    return(<Navigate  to='/login' replace={true} />)
  }
}

export default Home

