import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import ImageSlider from '../components/Slider'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/SupabaseClient'
import Footer from '../components/Footer'

const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null while checking
  const navigate=useNavigate()  

  // Check session on first render
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkSession();
  }, []);

  // When isAuthenticated is updated, redirect if true
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
    <div className='w-screen'>
    <div className='w-screen flex flex-col items-center pt-20'>
        <div className='flex flex-col gap-8 items-center w-[70%]'>
        <h1 className='text-6xl flex text-center'>Find Similar Products Across Multiple Websites</h1>
        <p className='text-center font-medium'>Upload an image of the product you're looking for, and our AI-powered system will provide you with links to similar products on various online shopping websites.</p>
        <div className='flex gap-6'>
          <Button className="h-14 w-30 bg-red-500 text-white rounded-md hover:bg-white hover:text-red-500 hover:border-red-500 hover:border-2 cursor-pointer" onClick={()=>navigate('/login')}>Get Started</Button>
          <Button className="h-14 w-30 bg-white text-red-500 rounded-md border-2 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer">Learn more</Button>
        </div>
        </div>
    </div>
    <ImageSlider/>
    </div>
    <Footer/>
    </>
  )
}

export default LandingPage