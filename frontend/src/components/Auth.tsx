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
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${ type === 'Signup' ? 'signup' : 'signin' }`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt.token);
            navigate("/blogs");
        } catch (error: any) {
            setError(error.response.data.error);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-bold"> {type === 'Signup' ? 'Create an account' : 'Sign in to access'} </div>
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
                    {/* <div className="pt-4">
                        <Input label={"Password"} placeholder="Password" type="password" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,  
                                password: e.target.value
                            })
                        }}/>
                        <button type="button" className="absolute inset-y-0 right-0 px-3 py-2" onClick={togglePasswordVisibility} >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div> */}
                    <div className="pt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => {
                                    setPostInputs({
                                        ...postInputs,  
                                        password: e.target.value
                                    })
                                }}
                            />
                            <button type="button" className="absolute inset-y-0 right-0 px-3 py-2" onClick={togglePasswordVisibility}>
                                {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                                : 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>}
                            </button>
                        </div>
                    </div>
                    <div>
                        {type === 'Signup' ? (<div className=" bg-yellow-100 mt-2 pt-2 pb-2">
                            Password must be atleast 8 digits or greater
                        </div>): null}
                    </div>
                    <div>
                        <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full mt-5">{type === 'Signin' ? 'Sign in' : 'Sign up'}</button>
                    </div>
                    <div className="flex font-medium text-red-500 justify-center">
                        {error.length > 0 && type === 'Signin' ? "Invalid Credential! Please try again": null}
                        {error.length > 0 && type === 'Signup' ? error : null}
                    </div>
                </div>
            </div>
        </div>
    )
}