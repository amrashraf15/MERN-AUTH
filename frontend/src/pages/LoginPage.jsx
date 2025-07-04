import { motion as Motion } from 'framer-motion';
import { useState } from 'react';
import Input from '../components/Input';
import { Loader, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from '../store/authStore';
const LoginPage = () => {
  const { login, error ,isLoading } = useAuthStore();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const handleLogin = async(e) =>{
      e.preventDefault();
      try {
        await login(email,password);
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <Motion.div
      initial={{opacity: 0,y:20}}
      animate={{opacity: 1,y:0}}
      transition={{duration:0.5}}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
      >
          <div className='p-8'>
              <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-red-500 via-rose-400 to-pink-500 text-transparent bg-clip-text'>Welcome Back</h2>
              <form onSubmit={handleLogin}>
              <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>setEmail(e.target.value)}
              />
              <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>setPassword(e.target.value)}
              />
                <div className='flex items-center mb-2'>
                    <Link to='/forgot-password' className='text-sm text-red-400 hover:underline'>Forgot Password</Link>
                </div>
                {error && <p className='text-yellow-500 font-semibold mb-2'>{error}</p>}
              <Motion.button
              className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-red-500 to-pink-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-red-600
						hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
					focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
						disabled={isLoading}
              >
                  {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto'/> :"Login" }
              </Motion.button>
          </form>
          </div>
            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Don't have  an account?{" "}
					<Link to={"/signup"} className='text-red-400 hover:underline'>
						Sign Up
					</Link>
				</p>
			</div>

      </Motion.div>
  )
}

export default LoginPage