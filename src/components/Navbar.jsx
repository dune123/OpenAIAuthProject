import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/SupabaseClient'
import { FaUserCircle } from 'react-icons/fa'
import { CiLogout } from "react-icons/ci";


const Navbar = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [showModal,setShowModal]=useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
    }

    getUser()

    // Listen for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    // Clean up listener
    return () => listener?.subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setShowModal(false)
    navigate('/login')
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className='flex justify-between p-6 pr-10'>
      <div className='flex items-center gap-4'>
        {/* Logo */}
        <img src="./websiteLogo.svg" alt="logo" className="w-8 h-8"/>
        <div className="bg-white text-black border-none cursor-pointer" onClick={()=>navigate('/')}>Home</div>
        <div className="bg-white text-black cursor-pointer" onClick={scrollToBottom}>Contact Us</div>
        <div className="bg-white text-black cursor-pointer" onClick={()=>navigate('/aboutus')}>About Us</div>
      </div>

      {/* Right-side: Conditional Render */}
      {user ? (
        <div className="relative">
          <FaUserCircle
            className="text-3xl cursor-pointer"
            onClick={() => setShowModal(!showModal)}
          />

          {showModal && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-10">
              <button
                className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 text-left"
                onClick={handleLogout}
              >
                <CiLogout className="text-xl" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <Button
          className="bg-red-500 text-white rounded-md hover:bg-white hover:text-red-500 hover:border-red-500 hover:border-2 cursor-pointer"
          onClick={() => navigate('/login')}
        >
          Log In / Register
        </Button>
      )}
    </div>
  )
}

export default Navbar
