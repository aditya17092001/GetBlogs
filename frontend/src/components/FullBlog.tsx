import { Avatar } from "./Avatar";
import { TopBar } from "./TopBar"

export const FullBlog = ({blog}: any) => {
    return (
        <div>
            <TopBar/>
            <div className="flex justify-center pt-12 ">  
                <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">{blog.title}</div>
                        <div className="text-slate-500 pt-2">
                            Posted on 2nd December 2023
                        </div>
                        <div className="pt-4 ">{blog.content}</div>
                    </div>
                    <div className="col-span-4 ">
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
    )
}