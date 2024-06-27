import { Link, useNavigate } from "react-router-dom"
import { Input } from "./Input"
import { useState } from "react";
import { singupInput } from "getblog-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "Signin" | "Signup" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<singupInput>({
        name: "",
        email: "",
        password: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${ type === 'Signup' ? 'signup' : 'signin' }`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt.token);
            navigate("/blogs");
        } catch (error) {
            alert("Please enter a valid credentials!")
        }
    }
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-bold"> Create an account </div>
                        <div className="text-slate-600 text-center"> 
                            { type === 'Signup' ? 'Already have an account?' : 'Don\'t have an account'}
                            <Link className=" underline pl-1" to={ type === 'Signup' ? "/signin" : '/signup' }>{type === 'Signup' ? 'Signin' : 'Signup'}</Link>
                        </div>
                    </div>
                    { type === 'Signup' ? <div className="pt-5">
                        <Input label={"Name"} placeholder="John Doe" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,  
                                name: e.target.value
                            })
                        }}/>
                    </div> : null }
                    <div className="pt-4">
                        <Input label={"Email"} placeholder="johndoe@email.com" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,  
                                email: e.target.value
                            })
                        }}/>
                    </div>
                    <div className="pt-4">
                        <Input label={"Password"} placeholder="Password" type="password" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,  
                                password: e.target.value
                            })
                        }}/>
                    </div>
                    <div>
                        <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full mt-5">{type === 'Signin' ? 'Sign in' : 'Sign up'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}