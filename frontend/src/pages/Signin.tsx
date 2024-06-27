import { useEffect } from "react";
import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/blogs');
        }
    }, [navigate]);

    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type={"Signin"}/>
            </div>
            <div className="hidden lg:block">
                <Quote/>
            </div>
        </div>
    )
}