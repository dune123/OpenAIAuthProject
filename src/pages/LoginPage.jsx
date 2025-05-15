import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/SupabaseClient";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState(true);
  const [registerForm, setRegisterForm] = useState(false);
  const [loginformdata, setLoginformdata] = useState({
    email: "",
    password: "",
  });
  const [registerformdata, setRegisterformdata] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading]=useState(false)
  const [loginError,setLoginError]=useState(null)
  const [registerError,setRegisterError]=useState(null)
  const navigate=useNavigate()

  //Login Function
  const handleLogin=async(e)=>{
    e.preventDefault()
    setLoading(true)
    setLoginError(null)
    try {
      const { data, error } = await supabase.auth.signInWithPassword(loginformdata);
  
      if (error) {
        console.log(error)
        setLoginError(error)
      }
      else{
        toast.success("successfully logged In");
        navigate('/dashboard')
        setLoading(false)
        setLoginError(null)
      }
    } catch (error) {
      console.log(error)
      setLoginError(error.message)
      setLoading(false)
    }
    finally{
      setLoading(false)
      setLoginError(null)
    }
  }



  //Register Function
  const handleRegister=async(e)=>{
    e.preventDefault()
    setLoading(true)
    setRegisterError(null)
    try {
      await supabase.auth.signUp(registerformdata);
      navigate('/dashboard')
      toast.success("successfully registered User");
      setLoading(false)
      setRegisterError(null)
    } catch (error) {
      setRegisterError(error.message)
    }
    finally{
      setLoading(false)
      setRegisterError(null)
    }
  }

  


  return (
    <>
    <div className="w-screen h-[90vh] flex flex-col items-center pt-20 bg-white pb-40">
      {/* login form */}
      {loginForm && (
        <div className="w-100 flex flex-col p-4 border-2 border-gray-300 rounded-md transition-all duration-300">
          <h1 className="text-3xl font-semibold">Login</h1>
          <p className="pb-6">Login to experience all the features</p>
          <form className="flex flex-col justify-center gap-4" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                type="text"
                placeholder="email"
                className="border-2 h-10 rounded-md pl-2"
                value={loginformdata.email}
                onChange={(e)=>setLoginformdata((data)=>({...data,email:e.target.value}))}
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border-2 h-10 rounded-md pl-2"
                value={loginformdata.password}
                onChange={(e)=>setLoginformdata((data)=>({...data,password:e.target.value}))}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-sm text-gray-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <Button disabled={loading} className="bg-red-500 text-white rounded-md hover:bg-white hover:text-red-500 hover:border-red-500 hover:border-2 cursor-pointer">
            {loading ? 'Loading...' : 'Log In'}
            </Button>
            {loginError && <p className="text-red-500">{loginError}</p>}

            <p
              className="text-gray-300 pl-20 cursor-pointer hover:text-red-500"
              onClick={() => {
                setLoginForm(false);
                setRegisterForm(true);
                setShowPassword(false);
              }}
            >
              Don't have an account
            </p>
          </form>
        </div>
      )}

      {/* register form */}
      {registerForm && (
        <div className="w-100 flex flex-col p-4 border-2 border-gray-300 rounded-md min-h-40">
          <h1 className="text-3xl font-semibold">Register</h1>
          <p className="pb-6">Register to experience all the features</p>
          <form className="flex flex-col justify-center gap-4" onSubmit={handleRegister}>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                type="text"
                placeholder="email"
                className="border-2 h-10 rounded-md pl-2"
                value={registerformdata.email}
                onChange={(e)=>setRegisterformdata((data)=>({...data,email:e.target.value}))}
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border-2 h-10 rounded-md pl-2"
                value={registerformdata.password}
                onChange={(e)=>setRegisterformdata((data)=>({...data,password:e.target.value}))}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-sm text-gray-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <Button className="bg-red-500 text-white rounded-md hover:bg-white hover:text-red-500 hover:border-red-500 hover:border-2 cursor-pointer">
            {loading ? 'Loading...' : 'Register'}
            </Button>
            {registerError&&<p className="text-red-500">{registerError}</p>}
            <p
              className="text-gray-300 pl-20 cursor-pointer hover:text-red-500"
              onClick={() => {
                setLoginForm(true);
                setRegisterForm(false);
                setShowPassword(false);
              }}
            >
              Already have an account
            </p>
          </form>
        </div>
      )}
      
    </div>
    <Footer/>
    </>
  );
};

export default LoginPage;
