import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || "" 
    });
    if(loading) {
        return (
            <div>
                <Spinner/>
            </div>
        )
    }
    console.log(blog);
    return (
        <div>
            <FullBlog blog = {blog}/>
        </div>
    )
} 