import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import HelmetHook from "../../hooks/HelmetHook";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const SignIn = () => {
    const { signInUser, googleSignIn } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const axiosPublic = useAxiosPublic();

    const location = useLocation();
    const navigate = useNavigate();

    const submitSignIn = e => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');


        signInUser(email, password)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Success...",
                    text: "Sign In Successful!!!",

                });
                navigate(location?.state ? location.state : '/');
            })
            .catch(() => toast.error('Invalid email or password'))
        e.target.reset();

    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const userInfo = {
                    name: result.user.displayName,
                    email: result.user.email,
                    role: "Tourist"
                }
                axiosPublic.post('/users', userInfo)
                Swal.fire({
                    icon: "success",
                    title: "Success...",
                    text: "Sign In Successful!!!",

                });
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => console.log(error))
    }



    return (
        <>
            <HelmetHook title='SignIn'>

            </HelmetHook >

            <div className=" min-h-screen bg-base-200">
                <div className="mx-auto flex-col py-12 px-4">
                    <div className="mb-6">
                        <h1 className="text-2xl md:text-5xl text-center font-bold">Sign In now!</h1>

                    </div>
                    <div className="card w-full md:w-1/3 mx-auto shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={submitSignIn}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        name="password"
                                        placeholder="Password"
                                        className="input input-bordered w-full" required />

                                    <span className="absolute top-4 right-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ? <FaEyeSlash /> : <FaEye />
                                        }
                                    </span>
                                </div>

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control">
                                <button className="btn bg-cyan-800 hover:bg-cyan-950 text-white">Sign In</button>
                            </div>
                        </form>

                        <div className="px-8">
                            <button onClick={handleGoogleSignIn} className="btn btn-outline w-full ">Google</button>
                        </div>

                        <div className="text-center mb-2">
                            <p>New here? Please <Link to='/signup'><button className="btn btn-link">Sign Up</button></Link></p>
                        </div>
                    </div>
                </div>
                <ToastContainer></ToastContainer>
            </div>

        </>
    );
};

export default SignIn;