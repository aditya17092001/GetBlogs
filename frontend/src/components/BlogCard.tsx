// import { Link } from "react-router-dom";
// import { Avatar } from "./Avatar";

// interface BlogCardProps {
//     authorName: String;
//     title: String;
//     content: String;
//     publishedDate: String;
//     id: String;
// }

// export const BlogCard = ({
//     id,
//     authorName,
//     title,
//     content,
//     publishedDate
// }: BlogCardProps) => {
//     return (
//         <Link to= {`/blog/${id}`}>
//         <div className="border-b border-slate-200 pb-4 p-4 w-screen max-w-screen-md cursor-pointer">
//             <div className="flex">
//                 <div >
//                     <Avatar size = {"small"} name = {authorName}/>
//                 </div>
//                 <div className="flex flex-col justify-center font-extralight pl-2 pr-2 text-sm "> {authorName} </div>
//                 <div className="flex flex-col justify-center">
//                     <Circle/>
//                 </div>
//                 <div className="flex flex-col justify-center text-slate-400 pl-2 text-sm"> {publishedDate} </div>
//             </div>
//             <div className="text-xl font-semibold"> { title } </div>
//             <div className="text-md font-thin">
//                 {content.substring(0,100)+"..."}
//             </div>
//             <div className="text-slate-400 text-sm pt-4">
//                 {`${Math.ceil(content.length/100)} min read`}
//             </div>
//         </div>
//     </Link>
//     )
// }

// const Circle = () => {
//     return (
//         <div className="w-1 h-1 rounded-full bg-slate-500">
//         </div>
//     )
// }

import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps {
    authorName: String;
    title: String;
    content: String;
    publishedDate: Date;
    id: String;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    const date = new Date(publishedDate);
    return (
        <Link to={`/blog/${id}`}>
            <div className="border-b border-slate-200 pb-4 p-4 w-screen max-w-screen-md cursor-pointer">
                <div className="flex">
                    <div>
                        <Avatar size={"small"} name={authorName} />
                    </div>
                    <div className="flex flex-col justify-center font-extralight pl-2 pr-2 text-sm">
                        {authorName}
                    </div>
                    <div className="flex flex-col justify-center">
                        <Circle />
                    </div>
                    <div className="flex flex-col justify-center text-slate-400 pl-2 text-sm">
                        {date.getDate()}/ {date.getMonth()+1}/ {date.getUTCFullYear()} 
                    </div>
                </div>
                <div className="text-xl font-semibold">{title}</div>
                <div className="text-md font-thin">
                    {content.substring(0, 100) + "..."}
                </div>
                <div className="text-slate-400 text-sm pt-4">
                    {`${Math.ceil(content.length / 230)} min read`}
                </div>
            </div>
        </Link>
    );
};

const Circle = () => {
    return (
        <div className="w-1 h-1 rounded-full bg-slate-500"></div>
    );
};
