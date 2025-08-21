import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyGoogleLogin = () => {
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

      // localStorage.setItem('islogin', 'true')
      // localStorage.setItem('userInfo', JSON.stringify(res.data.user))
      // navigate('/home')
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
