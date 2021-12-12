import React,{useContext, useState} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import noteContext from '../context/notes/noteContext';


const Login = () => {
 
  const context = useContext(noteContext);
  const {host,showalert} = context;
  let navigate = useNavigate();  
  

  const [credentials, setcredentials] = useState({email: '', password: ''})

   const handleOnSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',      
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email :credentials.email, password :credentials.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      // Save the token and redirect
      localStorage.setItem('token', json.authToken);
      // history.push("/")

      navigate("/", { replace: true });
    }
    else { 
     showalert('Failed', 'Invalid Credentials');
      setcredentials({email: '', password: '' })
    }
   }

   const handleOnchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
    return (
        <div>
           
<section className="flex flex-col md:flex-row h-screen items-center bg-cyan-700 ">

  <div className="bg-indigo-600 hidden  lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
    <img src="https://source.unsplash.com/random" alt="" className="w-full h-full object-cover"/>
  </div>

  <div className=" bg-white dark:bg-gray-800 w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 md:dark:bg-gray-900 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

    <div className="w-full h-100 dark:bg-gray-900 bg-white p-3 rounded">


      <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

      <form onSubmit={handleOnSubmit} className="mt-6" >
        <div>
          <label className="block text-gray-700  dark:text-gray-400">Email Address</label>
          <input type="email" name="email" value={credentials.email} id="email" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white dark:text-gray-700 focus:outline-none" autoFocus  required onChange={handleOnchange} />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700  dark:text-gray-400">Password</label>
          <input type="password" name="password" value={credentials.password} id="password" placeholder="Enter Password"  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white dark:text-gray-700 focus:outline-none" required  onChange={handleOnchange}/>
        </div>

        <div className="text-right mt-2">
          <Link to='/signup' className="text-sm font-semibold text-gray-700  dark:text-gray-500 hover:text-blue-700 focus:text-blue-700">Forgot Password?</Link>
        </div>

        <button  type="submit" className="w-full block bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6">Log In</button>
      </form>

      <hr className="my-6 border-gray-300 w-full" />
      <p className="mt-8">New to MyDiaries? <Link to="/signup" className="text-blue-500 hover:text-blue-700 font-semibold">Create an
              account</Link></p>


    </div>
  </div>

</section>
        </div>
    )
}

export default Login
