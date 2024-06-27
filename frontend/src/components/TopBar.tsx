// import { Link } from "react-router-dom";
// import { Avatar } from "./Avatar";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../config";
// import { Spinner } from "./Spinner";
// import { Profile } from "./Profile";

// type UserDetails = {
//     name: string;
// };

// export const TopBar = () => {
//     const [userDetails, setUserDetails] = useState<UserDetails | null>(null); 
//     const [loading, setLoading] = useState(true);
//     const [openProfile, setOpenProfile] = useState(false);
//     const toggleProfile = () => {
//         setOpenProfile(!openProfile);
//     }

//     async function getDetails() {
//         try {
//             const token = 'Bearer ' + localStorage.getItem("token");
//             const response = await axios.get(`${BACKEND_URL}/api/v1/user/getUserData`, {
//                 headers: {
//                     Authorization: token,
//                 },
//             });
//             setUserDetails(response.data.user);
//         } catch (error) {
//             console.error("Error fetching user details:", error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         getDetails();
//     }, []);

//     if (loading) {
//         return <div className="flex justify-center mt-80"><Spinner/></div>; 
//     }

//     return (
//         <div className="border-b flex justify-between px-10 py-4">
//             <div className="flex flex-col justify-center cursor-pointer text-2xl">
//                 <Link to={'/blogs'}>GETBLOG</Link>
//             </div>
//             <div className="flex">
//                 <Link to={'/publish'}>
//                     <button
//                         type="button"
//                         className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-10 py-2.5 text-center me-2 mb-2"
//                     >
//                         Post
//                     </button>
//                 </Link>
//                 <div onClick={toggleProfile}>
//                     <Avatar size={"big"} name={userDetails?.name.charAt(0) || "A"} />
//                 </div>
//             </div>
//             {openProfile ? <Profile toggleProfile={toggleProfile} name = {userDetails.name}/> : ""}
//         </div>
//     );
// };



import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Profile } from "./Profile";

// Define a type for user details
type UserDetails = {
    name: string;
};

export const TopBar = () => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null); 
    const [openProfile, setOpenProfile] = useState(false);
    
    const toggleProfile = () => {
        setOpenProfile(!openProfile);
    }

    async function getDetails() {
        try {
            const token = 'Bearer ' + localStorage.getItem("token");
            const response = await axios.get(`${BACKEND_URL}/api/v1/user/getUserData`, {
                headers: {
                    Authorization: token,
                },
            });
            setUserDetails(response.data.user);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }

    useEffect(() => {
        getDetails();
    }, []);

    return (
        <div className="border-b flex justify-between px-10 py-4">
            <div className="flex flex-col justify-center cursor-pointer text-2xl">
                <Link to={'/blogs'}>GETBLOG</Link>
            </div>
            <div className="flex">
                <Link to={'/publish'}>
                    <button
                        type="button"
                        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-10 py-2.5 text-center me-2 mb-2"
                    >
                        Post
                    </button>
                </Link>
                <div onClick={toggleProfile}>
                    <Avatar size={"big"} name={userDetails ? userDetails.name.charAt(0) : "A"} />
                </div>
            </div>
            {openProfile && userDetails && (
                <Profile toggleProfile={toggleProfile} name={userDetails.name} />
            )}
        </div>
    );
};
