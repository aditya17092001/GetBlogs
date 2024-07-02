import { useEffect } from "react";
import { BlogCard } from "../components/BlogCard"
import { Spinner } from "../components/Spinner";
import { TopBar } from "../components/TopBar"
import { useBlogs } from "../hooks"
import { useNavigate } from "react-router-dom";

export const Blogs = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signin');
        }
    }, [navigate]);
    
    const {loading, blogs} = useBlogs();
    if(loading) {
        return (
            <div className="flex justify-center mt-80">
                <Spinner/>
            </div>
        )
    }


    return (
        <div>
            <TopBar/>
            <div className="flex justify-center">
                <div className="">
                    {blogs.slice().reverse().map((blog:any) => <BlogCard 
                    id = {blog.id} 
                    authorName = {blog.author.name} 
                    title = {blog.title} 
                    content = {blog.content} 
                    publishedDate={ new Date(blog.date)} />)}
                </div>
            </div>
        </div>
    )
}