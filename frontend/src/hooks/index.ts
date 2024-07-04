import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"


export interface Blog {
  "title": string;
  "content": string;
  "id": string;
  "date": string;
  "author": {
    "name": string;
  }
}

export const useBlog = ({ id }: { id: String }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  
  useEffect(() => {
    const token = 'Bearer '+localStorage.getItem("token");
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: token
      }
    }).then(response => {
      setBlog(response.data.post);
      setLoading(false); 
    })
    }, [id]);
    
    return {
      loading,
      blog
    } 
  }
  
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    
    useEffect(() => {
      const token = 'Bearer '+localStorage.getItem("token");
      axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: token
        }
      }).then(response => {
        setBlogs(response.data.blogs);
        setLoading(false); 
      })
    }, []);
    
    return {
      loading,
      blogs
    }
  }
  
export const useDiscussions = ({ postId }: {postId: string}) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
      axios.get(`${BACKEND_URL}/api/v1/discussions/${postId}`).then(response => {
      setComments(response.data.response);
    });
  }, [postId]);
    return {
      comments
    }
}

interface User {
  name: string;
  id: string;
  email: string;
}

export const useUserDetails = ({ authorId }: { authorId: string }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User[]>([]);
  useEffect(() => {
      axios.get(`${BACKEND_URL}/api/v1/user/getUserDatabyId/${authorId}`).then(response => {
        setUserData(response.data.response);
        setLoading(false);
      });
  }, [authorId])
    return {
      loading,
      userData
    }
}