import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="my-4 py-[50px] md:pl-[120px] px-5 md:flex justify-between">
            <div className="md:w-[40%]">
                <div className="text-4xl mx-auto text-gray-500">Welcome to LinkedIn Community</div>

                <div className="my-3 flex mx-auto mt-[20px] bg-white gap-2 p-4 rounded-3xl w-[70%] text-black cursor-pointer">
                   <GoogleLogin />
                </div>
                <Link to={'/login'} className="my-3 flex mx-auto mt-[20px] bg-white gap-2 p-4 rounded-3xl w-[70%] text-black cursor-pointer">
                   Sign In
                </Link>
                <div className="mx-auto mb-4 text-sm w-[70%] mt-6">By clicking continue to join or sign in, you agree to LinkedIn's <span className="text-blue-500 cursor-pointer">User Agreement</span> and <span className="text-blue-500 cursor-pointer">Privacy Policy</span>and <span className="text-blue-500 cursor-pointer">Cookie Policy</span>.</div>
                <Link to={'/signup'} className="mx-auto text-center mb-4 text-lg w-[70%] mt-4">New to Linkedin? <span className="text-blue-500 cursor-pointer">Join now</span></Link>
            </div>
  <div className="md:w-[40%] h-120">
    <img src="https://media.licdn.com/media//AAYAAgSrAAgAAQAAAAAAAGM6w-NyPk-_SVikYiCJ6V3Z-Q.png" alt="" className="w-full h-full object-cover" />
  </div>
        </div>
    );
};

export default LandingPage;
