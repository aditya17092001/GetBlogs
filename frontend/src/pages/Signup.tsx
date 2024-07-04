import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signup = () => {
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
                <Auth type={"Signup"} />
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
    );
};
