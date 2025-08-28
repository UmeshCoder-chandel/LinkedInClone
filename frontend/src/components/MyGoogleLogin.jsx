import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyGoogleLogin = (props) => {
  const navigate = useNavigate();

  const handleOnSuccess = async (credentialResponse) => {
    console.log("success", credentialResponse);
 try {
      const token = credentialResponse.credential;
      const res = await axios.post(
        "http://localhost:4000/api/auth/google",
        { token },
        { withCredentials: true }
      );
      console.log(res);

      localStorage.setItem('islogin', 'true')
      localStorage.setItem('userInfo', JSON.stringify(res.data.user))
      props.changeLogin(true)
      navigate('/home')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* <h2>Login with Google</h2> */}
      <GoogleLogin
        onSuccess={handleOnSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default MyGoogleLogin;



// import { GoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const MyGoogleLogin = () => {
//   const navigate = useNavigate();

//   const handleOnSuccess = async (credentialResponse) => {
//     try {
//       const token = credentialResponse.credential;

//       // Send token to backend
//       const { data } = await axios.post(
//         "http://localhost:4000/api/auth/google",
//         { token },
//         { withCredentials: true } // ✅ so backend can set cookies (JWT/refresh)
//       );

//       // Save user data locally
//       localStorage.setItem("isLogin", "true");
//       localStorage.setItem("userInfo", JSON.stringify(data.user));

//       console.log("✅ Google login success:", data.user);

//       // Navigate to home/dashboard
//       navigate("/home");
//     } catch (error) {
//       console.error("❌ Google Login Error:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center">
//       <GoogleLogin
//         onSuccess={handleOnSuccess}
//         onError={() => console.log("❌ Google Login Failed")}
//         useOneTap // optional: shows one-tap popup
//       />
//     </div>
//   );
// };

// export default MyGoogleLogin;
