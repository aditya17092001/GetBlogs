import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"
import { BACKEND_URL } from "../config";

export const Delete = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    function toggleCancel() {
        navigate(`/blog/${id}`)
    }
    async function toggleDelete() {
        try {
            const token = 'Bearer '+localStorage.getItem("token");
            const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: token
                  }
            });
            if (response.status == 200) {
                navigate('/blogs'); 
            } else {
                alert('Failed to delete the post');
            }
        } catch (error) {
            alert('Error while deleting the post:'+ error);
        }
    }
    return (
        <div className="flex flex-col justify-center h-screen bg-slate-300">
            <div className="flex justify-center">
                <div className="p-10 border rounded-3xl bg-white">
                    <div className="pb-10 font-medium">Are you sure you want to delete this post?</div>
                    <div className="flex justify-between">
                        <button onClick={toggleCancel} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</button>
                        <button onClick={toggleDelete} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}