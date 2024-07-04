import { useEffect, useState } from "react";
import { useUserDetails } from "../hooks"
import { Avatar } from "./Avatar";
import { Spinner } from "./Spinner";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface Comment {
    id: string,
    comment: string,
    postId: string,
    authorId: string,
    date: Date
}

export const ShowDiscussions = ({ id, comment, authorId, date }: Comment) => {
    console.log(id+", "+comment+", "+authorId+", "+date);
    const commentDate = new Date(date);
    const { loading, userData } = useUserDetails({ authorId });
    const [owner, setOwner] = useState(false);
    const token = 'Bearer ' + localStorage.getItem("token");
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/getUserData`, 
            {
                headers: {
                    Authorization: token,
                } 
            }
        ).then((response) => {
            if(response.data.user.id === authorId){
                setOwner(true);
            }
        })
    }, [])

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${BACKEND_URL}/api/v1/discussions/${id}`);
            if(response.status == 200) {
                window.location.reload();
            }
        } catch (error) {
            alert("Something is wrong\nPlease try again later");
        }
    };
    if(loading) {
        return <Spinner/>
    }
    //@ts-ignore
    const name = userData.name;
    return (
        <div>
            <div className="border-b border-slate-200 pb-4 p-4 w-screen max-w-screen-md cursor-pointer">
                <div className="flex justify-between">
                    <div className="flex">
                        <div>
                            <Avatar size={"small"} name={name} />
                        </div>
                        <div className="flex flex-col justify-center font-extralight pl-2 pr-2 text-sm">
                            {name}
                        </div>
                        <div className="flex flex-col justify-center">
                            <Circle />
                        </div>
                        <div className="flex flex-col justify-center text-slate-400 pl-2 text-sm">
                            {commentDate.getDate()}/ {commentDate.getMonth()+1}/ {commentDate.getUTCFullYear()} 
                        </div>
                    </div>
                    {owner ? (<div className="text-slate-800 hover:text-black ">
                        <svg onClick={() => setShowDeletePopup(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-pointer size-6">  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                    </div>) : null}
                </div>
                <div className="text-xl font-semibold">{comment}</div>
            </div>
            {showDeletePopup && (
            <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Delete Post?</h2>
                    <p className="text-sm text-gray-700 mb-4"> Are you sure you want to delete this post? This action cannot be undone. </p>
                    <div className="flex justify-end">
                        <button onClick={() => setShowDeletePopup(false)} className="inline-flex items-center  text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800 mr-2 px-4 py-2 text-sm font-medium "> Cancel </button>
                        <button onClick={handleDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600" > Delete </button>
                    </div>
                </div>
            </div>
      )}
        </div>
    )
}

const Circle = () => {
    return (
        <div className="w-1 h-1 rounded-full bg-slate-500"></div>
    );
};