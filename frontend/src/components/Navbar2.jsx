import { useState } from "react";
import { IoHome } from "react-icons/io5";
import { MdPersonAdd } from "react-icons/md";
import { MdOutlineWork } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { useLocation } from "react-router-dom";
const Navbar2=()=>{
    const [dropdown,setDropdown]=useState(false)
    const location=useLocation()
    return(
        <nav>
            <div className="bg-white h-13 flex justify-between py-1 px-5 xl:px-50 fixed top-0 w-[100%] z-1000">
                <div className="flex gap-2 items-center">
                    <div>
                        <img className="w-8 h-8" src={'https://e7.pngegg.com/pngimages/991/594/png-clipart-linkedin-corporation-social-media-logo-business-cards-social-media-blue-angle.png'} alt="" />
                    </div>
                    <div className="relative">
                        <input placeholder="Search" className="w-70 bg-gray-100 rounded-sm h-10 px-4" />
                       {  
                        dropdown && <div className="absolute w-88 left-0 bg-gray-200">
                            <div className="flex mb-1 gap-2 items-cente0r cursor-pointer ">
                                 <div><img className="w-10 h-10 rounded-full" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s"} alt="" /></div>
                                 <div>Umesh</div>
                            </div>
                            
                        </div>}
                    </div>
                </div>
                <div className="hidden gap-10 md:flex">
                    <div className="flex flex-col items-center cursor-pointer">
                            <IoHome  sx={{color:location.pathname==='/home'? "black":'gray'}} />
                            <div className={`text-sm text-gray-500${location.pathname==='/home'? "border-b-3":''}`}>Home</div>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer">
                            <MdPersonAdd sx={{color:location.pathname==='/mynetwork'? "black":'gray'}} />
                            <div className={`text-sm text-gray-500${location.pathname==='/mynetwork'? "border-b-3":''}`}>My Network</div>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer">
                            <MdOutlineWork sx={{color:location.pathname==='/jobs'? "black":'gray'}} />
                            <div className={`text-sm text-gray-500${location.pathname==='/jobs'? "border-b-3":''}`}>Jobs</div>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer">
                            <MdMessage sx={{color:location.pathname==='/messages'? "black":'gray'}} />
                            <div className={`text-sm text-gray-500${location.pathname==='/messages'? "border-b-3":''}`}>Messaging</div>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer">
                            <IoNotifications sx={{color:location.pathname==='/notifications'? "black":'gray'}} /><span className="p-1 rounded-full text-sm bg-red-700 text-white">1</span>

                            <div className={`text-sm text-gray-500${location.pathname==='/notifications'? "border-b-3":''}`}>Notifications</div>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer">
                            <img className="w-8 h-8 rounded-full" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s"} alt="" />
                            <div className="text-sm text-gray-500">Me</div>
                    </div>

                </div>
            </div>

        </nav>
    )
}

export default Navbar2;