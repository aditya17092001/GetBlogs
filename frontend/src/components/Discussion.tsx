import { useState, ChangeEvent } from "react";
import { useDiscussions } from "../hooks";
import { ShowDiscussions } from "./ShowDiscussions";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Comment {
  id: string;
  comment: string;
  postId: string;
  authorId: string;
  date: Date;
}

export const Discussion = ({ blog }: any) => {
  const postId = blog.id;
  const { comments } = useDiscussions({ postId });
  const [comment, setComment] = useState("");
  async function togglePost() {
    const token = "Bearer "+localStorage.getItem('token');
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/discussions`, {
          comment,
          postId
        },
        {
          headers: {
            Authorization: token
          }
        }
    );
      if(response.status !== 200) alert("OOPS!\nSomething up with the server, Please try again later")
      else window.location.reload();
    } catch (error) {
      alert("OOPS!\nSomething up with the server, Please try again later")
    }
  }

  return (
    <div>
      <div className="flex justify-center font-semibold text-3xl pt-5">
        {`Discussion (${comments.length})`}
      </div>
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <TextEditor onChange={(e) => { setComment(e.target.value); }}/>
          <div className="flex justify-center lg:justify-between">
            <button onClick={togglePost} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"> Post Comment </button>
          </div>
        </div>
      </div>
      <div className="border-b pt-5"></div>
      <div className="flex justify-center pt-5">
        <div>
            {comments.length == 0 ? <div className=" font-semibold text-3xl"> Be the first to comment on this post!</div>: comments.map((comment: Comment) => (
            <ShowDiscussions
              key={comment.id}
              id={comment.id}
              comment={comment.comment}
              postId={comment.postId}
              authorId={comment.authorId}
              date={new Date(comment.date)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
  return (
    <div className="mt-2">
      <div className="w-full mb-4">
        <div className="flex items-center justify-between border rounded-2xl">
          <div className="my-2 bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>
            <textarea
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
