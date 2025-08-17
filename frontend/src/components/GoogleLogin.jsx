import { GoogleLogin } from "@react-oauth/google";

const GoogleLogin = () => {
  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin
        onSuccess={(credentialResponse) => 
          handleOnSuccess(credentialResponse)
        }
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default GoogleLogin;