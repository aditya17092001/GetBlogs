import { useNavigate } from "react-router-dom";
import { Avatar } from "./Avatar";

export const Profile = ({ toggleProfile, name }: any) => {
    const navigate = useNavigate();

    const sendRequest = () => {
        localStorage.removeItem("token");
        navigate('/signin');
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-start justify-end h-screen" onClick={toggleProfile}>
            <div className="bg-gray-200 p-8 shadow-lg w-1/4 h-screen" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4 flex items-end justify-end">Profile</h2>
                <div className="w-full flex items-start justify-end">
                    <div className="text-xl mt-2 mr-5">{name}</div>
                    <Avatar size={"big"} name={name.charAt(0) || "A"} />
                </div>
                <div>
                    <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full mt-5">
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    );
};
