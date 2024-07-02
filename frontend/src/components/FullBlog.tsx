import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { TopBar } from "./TopBar"
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";


export const FullBlog = ({blog}: any) => {
    const date = new Date(blog.date);
    const token = 'Bearer ' + localStorage.getItem("token");
    const [owner, setOwner] = useState(false);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/getUserData`, 
            {
                headers: {
                    Authorization: token,
                } 
            }
        ).then((response) => {
            if(response.data.user.id === blog.author.id){
                setOwner(true);
            }
        })
    }, [])
    
    return (
        <div>
            <TopBar />
            <div className="flex justify-center pt-12 ">  
                <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">{blog.title}</div>
                        <div className="flex justify-between">
                            <div className="text-slate-500 pt-2">
                                Last updated on {date.getDate()}/ {date.getMonth()+1}/ {date.getUTCFullYear()} . {date.getHours()}:{date.getMinutes()}
                            </div>
                            {owner ? (<div className="flex text-slate-700">
                                <Link to={`/edit/${blog.id}`}>
                                    <div className="pr-5 hover:text-black">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-pointer size-6">  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
                                    </div>
                                </Link>
                                <Link to={`/delete/${blog.id}`}>
                                    <div className="hover:text-black">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-pointer size-6">  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                                    </div>
                                </Link>
                            </div>) : null}
                        </div>
                        <div className="pt-4 ">{blog.content}</div>
                    </div>
                    <div className="col-span-4 mr-10">
                        <div className="pl-10">
                            <div className="text-xl">Author</div>
                            <div className="flex">
                                <div className="flex flex-col justify-center">
                                    <Avatar size="small" name={blog.author.name}/>
                                </div>
                                <div className="text-3xl font-semibold pl-3">{blog.author.name}</div>
                            </div>
                            <div className="text-slate-500">Random catch phrase about the author's ability to grab the user's attention</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}