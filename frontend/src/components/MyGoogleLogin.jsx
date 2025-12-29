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
        "https://linkedinclone-backend-i2bq.onrender.com/api/auth/google",
        { token },
        { withCredentials: true }
      );
      console.log('google login response', res);

      if (res.status === 200) {
        localStorage.setItem('islogin', 'true')
        localStorage.setItem('userInfo', JSON.stringify(res.data.user))
        // fallback: store token returned in body for dev or when cookies are blocked
        if (res.data && res.data.token) {
          localStorage.setItem('access_token', res.data.token)
          // set axios default for future requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
        }
        if (props.changeValue) {
          props.changeValue(true);
        }
        navigate('/home');
      } else {
        console.error('Google login failed', res);
      }
    } catch (error) {
      console.error('Google login error', error?.response?.data || error.message || error);
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


