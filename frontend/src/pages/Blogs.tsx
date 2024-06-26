import { BlogCard } from "../components/BlogCard"
import { Spinner } from "../components/Spinner";
import { TopBar } from "../components/TopBar"
import { useBlogs } from "../hooks"

export const Blogs = () => {
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
                    {blogs.map(blog => <BlogCard 
                    id = {blog.id} 
                    authorName = {blog.author.name} 
                    title = {blog.title} 
                    content = {blog.content} 
                    publishedDate={"9th Dec 2023"} />)}
                </div>
            </div>
        </div>
    )
}