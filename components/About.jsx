
import React from 'react'
import {Link} from 'react-router-dom'
const About = () => {
  
    return (
        
        <div>
            <section className=" dark:text-gray-400  dark:bg-gray-900 body-font">
  <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
    <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="https://source.unsplash.com/random" />
    <div className="text-center lg:w-2/3 w-full">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium dark:text-white">ABOUT</h1>
      <p className="leading-relaxed mb-8">MyDiaries.com is a website where one can save a Day life by saving it on this website, User Can Create,Read,Update and Delete any operations, You dont have to worry about storage, you just have to remember your email and password  </p>
      <div className="flex justify-center">
        {!localStorage.getItem('token') &&  <Link  to="/login"  className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</Link> }
       
        <a href="https://github.com/Pankajkooooool"  className="ml-4 inline-flex bg-blue-400   dark:text-gray-400  text-white dark:bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700  dark:hover:bg-gray-700 hover:text-white rounded text-lg">Know me</a>
      </div>
    </div>
  </div>
</section>
        </div>
    )
}

export default About
