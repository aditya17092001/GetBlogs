import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { Discussion } from "../components/Discussion";
import { useEffect } from "react";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || "" 
    });

    const navigate = useNavigate();
    useEffect(() => {
        const localStorageToken = localStorage.getItem('token');
        if (!localStorageToken) {
            navigate('/signin');
        }
    }, [navigate]);
    if(loading) {
        return (
            <div className="flex justify-center mt-80">
                <Spinner/>
            </div>
        )
    }
    return (
        <div>
            <FullBlog blog = {blog}/>
            <div className="border-b pt-20"></div>
            <Discussion blog = {blog}/>
        </div>
    )
} 