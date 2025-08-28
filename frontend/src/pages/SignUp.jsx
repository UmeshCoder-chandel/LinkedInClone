import { GoogleLogin } from '@react-oauth/google'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import MyGoogleLogin from '../components/MyGoogleLogin'
export default function SignUp(props) {
  const navigate=useNavigate()
  const [registerData, setRegisterData] = useState({ email: "", password: "", name: "" })

  const handleInput = (event, key) => {
    setRegisterData({ ...registerData, [key]: event.target.value })
  }
  const handleRegister=async()=>{
    if(registerData.email.trim().length===0 || registerData.name.trim().length===0 || registerData.password.trim().length===0){
      return toast.error("please fill all details")
    }
    await axios.post('http://localhost:4000/api/auth/register',registerData).then(res=>{
      toast.success("you have registered successfully");
      setRegisterData({...registerData,email:"",password:"",name:""})
      navigate('/login')
    }).catch(err=>{
      console.log(err);
      toast.error(err?.response?.data?.error || "registration failed")

    })

  }
  return (
    <div className='w-full flex items-center justify-center flex-col'>
      <div className='text-4xl mb-5'>Make the most of your professional life</div>
      <div className='w-[85%] md:w-[25%] shadow-xl rounded-sm box p-10'>
        <div className='flex flex-col gap-4'>
          <div>
            <label htmlFor="full-name">Full Name</label>
            <input value={registerData.name} onChange={(e) => handleInput(e, 'name')} className="w-full text-xl border-2 rounded-lg px-5 py-1" placeholder="Full name" /></div>
          <div>
            <label htmlFor="email">Email</label>
            <input value={registerData.email} onChange={(e) => handleInput(e, 'email')} className="w-full text-xl border-2 rounded-lg px-5 py-1" placeholder="Email" /></div>
          <div>
            <label htmlFor="password">Password</label>
            <input value={registerData.password} onChange={(e) => handleInput(e, 'password')} className="w-full text-xl border-2 rounded-lg px-5 py-1" placeholder="Password" type="password" />
            </div>
          <div onClick={handleRegister} className='w-full hover:bg-blue-900 bg-blue-800 text-white py-2 px-4 rounded-xl text-center cursor-pointer my-2'>Register</div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='border-b border-gray-400 w-[45%]'></div>
          <div className='text-gray-400'>or</div>
          <div className='border-b border-gray-400 w-[45%]'></div>
        </div>
        <div><MyGoogleLogin  changeValue={props.changeValue} /></div>
      </div>
      
      
      <div className='mt-4 text-sm'>Already have an account? <Link to="/login" className="text-blue-600">Sign in</Link></div>
   <ToastContainer />
    </div>
  )
}


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import MyGoogleLogin from "../components/MyGoogleLogin";

// export default function SignUp() {
//   const navigate = useNavigate();
//   const [registerData, setRegisterData] = useState({
//     email: "",
//     password: "",
//     name: "",
//   });
//   const [loading, setLoading] = useState(false);

//   // Handle input change
//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setRegisterData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle register
//   const handleRegister = async () => {
//     const { email, name, password } = registerData;

//     // ✅ Validation
//     if (!name || !email || !password) {
//       return toast.error("Please fill all details");
//     }
//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       return toast.error("Invalid email format");
//     }
//     if (password.length < 6) {
//       return toast.error("Password must be at least 6 characters");
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         "http://localhost:4000/api/auth/register",
//         registerData
//       );

//       toast.success("You have registered successfully");
//       setRegisterData({ email: "", password: "", name: "" });
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       toast.error(err?.response?.data?.error || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full flex items-center justify-center flex-col min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="text-2xl md:text-4xl font-bold mb-5 text-gray-800 text-center">
//         Make the most of your professional life
//       </div>

//       {/* Signup Card */}
//       <div className="w-[90%] md:w-[28%] shadow-xl rounded-xl bg-white p-8">
//         <div className="flex flex-col gap-4">
//           {/* Name */}
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium mb-1">
//               Full Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               value={registerData.name}
//               onChange={handleInput}
//               className="w-full text-lg border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//               placeholder="Full name"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium mb-1">
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               value={registerData.email}
//               onChange={handleInput}
//               className="w-full text-lg border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//               placeholder="Email"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium mb-1">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               value={registerData.password}
//               onChange={handleInput}
//               className="w-full text-lg border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//               placeholder="Password"
//             />
//           </div>

//           {/* Register Button */}
//           <button
//             onClick={handleRegister}
//             disabled={loading}
//             className="w-full hover:bg-blue-900 bg-blue-700 text-white py-2 rounded-xl text-center font-medium transition disabled:opacity-60"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </div>

//         {/* Divider */}
//         <div className="flex items-center gap-2 my-4">
//           <div className="border-b border-gray-300 w-[45%]"></div>
//           <div className="text-gray-400">or</div>
//           <div className="border-b border-gray-300 w-[45%]"></div>
//         </div>

//         {/* Google Login */}
//         <div>
//           <MyGoogleLogin />
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-4 text-sm">
//         Already have an account?{" "}
//         <Link to="/login" className="text-blue-600 hover:underline">
//           Sign in
//         </Link>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// }
