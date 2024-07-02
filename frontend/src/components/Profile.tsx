// import { useNavigate } from "react-router-dom";
// import { Avatar } from "./Avatar";

// export const Profile = ({ toggleProfile, name }: any) => {
//     const navigate = useNavigate();

//     const sendRequest = () => {
//         localStorage.removeItem("token");
//         navigate('/signin');
//     };

//     return (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-start justify-end h-screen" onClick={toggleProfile}>
//             <div className="bg-gray-200 p-8 shadow-lg w-1/4 h-screen" onClick={(e) => e.stopPropagation()}>
//                 <h2 className="text-xl font-bold mb-4 flex items-end justify-end">Profile</h2>
//                 <div className="w-full flex items-start justify-end">
//                     <div className="text-xl mt-2 mr-5">{name}</div>
//                     <Avatar size={"big"} name={name.charAt(0) || "A"} />
//                 </div>
//                 <div>
//                     <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full mt-5">
//                         Sign out
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };



import { useNavigate } from "react-router-dom";
import { Avatar } from "./Avatar";

export const Profile = ({ toggleProfile, name }: any) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate('/signin');
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 shadow-lg max-w-md w-full mx-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Profile</h2>
                    <button
                        className="text-gray-600 focus:outline-none"
                        onClick={toggleProfile}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center">
                    <Avatar size="big" name={name.charAt(0) || "A"} />
                    <div className="ml-4">
                        <div className="text-xl font-semibold">{name}</div>
                        <div className="text-gray-500 text-sm">Welcome back!</div>
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        onClick={handleSignOut}
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    );
};
