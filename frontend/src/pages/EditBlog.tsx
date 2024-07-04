import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { Spinner } from "../components/Spinner";
import { ChangeEvent, useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { TopBar } from "../components/TopBar";

export const EditBlog = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const token = 'Bearer ' + localStorage.getItem("token");
    const { loading, blog } = useBlog({ id: id || "" });

    useEffect(() => {
        const localStorageToken = localStorage.getItem('token');
        if (!localStorageToken) {
            navigate('/signin');
        }
        if (blog) {
            setTitle(blog.title);
            setDescription(blog.content);
        }
    }, [blog, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center mt-80">
                <Spinner />
            </div>
        );
    }

    function toggleCancel() {
        navigate(`/blog/${id}`);
    }

    async function toggleUpdate() {
        const response = await axios.put(`${BACKEND_URL}/api/v1/blog`,
            {
                title,
                content: description,
                id: id,
            },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        if (response.status === 200) {
            navigate(`/blog/${response.data.blogId}`);
        } else {
            alert("Can't edit your post");
        }
    }
    return (
        <div>
            <TopBar />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    <input
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Title"
                    />

                    <TextEditor
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    <div className="flex justify-between">
                        <button onClick={toggleUpdate} type="submit" className="focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 inline-flex items-center text-center  bg-blue-700 focus:ring-blue-200  hover:bg-blue-800"> Update post</button>
                        <button onClick={toggleCancel} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

function TextEditor({
    value,
    onChange,
}: {
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
    return (
        <div className="mt-2">
            <div className="w-full mb-4 ">
                <div className="flex items-center justify-between border">
                    <div className="my-2 bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea
                            value={value}
                            onChange={onChange}
                            id="editor"
                            rows={8}
                            className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
                            placeholder="Write an article..."
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
