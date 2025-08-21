import { Link } from "react-router-dom";


const  Navbar1=()=>{
    return(
        <nav className="w-{100%} bg-gray-100 md:px-{100px} px-{20px} flex justify-between py-4 box-border">
            <Link to={'/'} className="flex justify-between">
                <div className="flex gap-1 items-center cursor-pointer">
                    <h3 className="text-blue-800 font-bold text-3xl">Linked</h3>
                    <img src={"data:image/png;base64,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"} alt=""  className="w-7 h-7"/>
                </div>
            
            </Link>
            <div className="flex box-border md:gap-4 gap-2 justify-center items-center">
                <Link to={'/signup'} className="md:px-4 md:py-2 box-border text-black rounded-3xl text-xl hover:bg-gray-200 cursor-pointer">Join Now</Link>
                <Link to={'/login'} className="px-4 md:py-2 box-border  border-1 text-black rounded-3xl text-xl hover:bg-gray-200 cursor-pointer">Sign In</Link>
            </div>
        </nav>
    )
}


export default Navbar1;