import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import { Banner } from "./Banner";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState("");
    const [info, setInfo] = useState("");

    const signMeUp = event => {
        axios({
            method: "POST",
            url: "https://161.35.197.253:5001/register",
            data: {
                username,
                email,
                password,
                confirmPassword,            
            }
        })
        .then(response => {
            console.log(response.data.msg);
        }).catch(error => {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
            setStatus("failure");
            setInfo(error.response.data.msg);
            setTimeout(() => {
                setStatus("");
                setInfo("");
            }, 3000);
        });
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        event.preventDefault();
    }
    const handleUsername = event => {
        setUsername(event.target.value);
        event.preventDefault();
    }
    const handleEmail = event => {
        setEmail(event.target.value);
        event.preventDefault();
    }

    const handlePassword = event => {
        setPassword(event.target.value);
        event.preventDefault();
    }

    const handleConfirmPassword = event => {
        setConfirmPassword(event.target.value);
        event.preventDefault();
    }
    return (
        <div>
            {status &&<Banner status = {status} info= {info}/>}
             <div className="min-h-full flex flex-col justify-center">
                <FontAwesomeIcon icon={faWarehouse} style={{fontSize: "3vh", marginTop: "1vh"}} className="text-indigo-600"/>
                <h2 className="mt-6 text-center text-3xl tracking-light font-bold text-gray-900">Create an account</h2>
             </div>
             <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={signMeUp} method="POST">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="mt-1">
                                <input 
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={handleUsername}
                                    autoComplete="username"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                E-Mail
                            </label>
                            <div className="mt-1">
                                <input 
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={handleEmail}
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input 
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={handlePassword}
                                    autoComplete="password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-non focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPassword}
                                    autoComplete="password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <button className="w-full flex justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500">
                                Sign up
                            </button>
                            <p className="text-center mt-6 text-sm font-medium">Do you have an account?<Link to="/" className="block text-sm font-medium text-indigo-700 hover:cursor-pointer">Sign in</Link></p>
                        </div>
                    </form>
                </div>
             </div>
        </div>
    )
}

export default SignUp;