import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import HelmetHook from "../../hooks/HelmetHook";


const SignUp = () => {
    const { createUser, updateUser } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const submitSignUp = e => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photo = form.get('photo');
        const role = form.get('role');
        const email = form.get('email');
        const password = form.get('password');

        console.log(name, photo, email, password, role);

        if (password.length < 6) {
            toast.error('Password should be atleast 6 characters');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            toast.error('Password should be atleast one uppercase characters');
            return;
        }
        else if (!/[a-z]/.test(password)) {
            toast.error('Password should be atleast one lowercase characters');
            return;
        }

        createUser(email, password)
            .then(() => {
                updateUser(name, photo)
                    .catch(error => console.log(error))
            })

            .catch(error => console.log(error))
        e.target.reset();
        navigate('/');
    }

    return (
        <>
            <HelmetHook title='SignUp'>
            </HelmetHook >

            <div className="min-h-screen bg-base-200">
                <div className=" flex-col py-12 px-4">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl md:text-5xl font-bold">Sign Up now!</h1>

                    </div>
                    <div className="card w-full md:w-1/3 mx-auto shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={submitSignUp}>
                            {/* name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                            </div>

                            {/* photo */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered" required />
                            </div>

                            {/* Role */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Role</span>
                                </label>
                                <select name="role" defaultValue='selected' className="select select-bordered w-full ">
                                    <option disabled value='selected'>Select your role</option>
                                    <option>Tourist</option>
                                    <option>Tourist Guide</option>
                                    <option>Admin</option>
                                </select>
                            </div>

                            {/* email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                            </div>

                            {/* password */}
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

                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-cyan-800 hover:bg-cyan-950 text-white">Sign Up</button>
                            </div>
                        </form>
                        <div className="text-center mb-2">
                            <p>Already have any account? Please <Link to='/signin'><button className="btn btn-link">Sign In</button></Link></p>
                        </div>
                    </div>
                </div>
                <ToastContainer></ToastContainer>
            </div>
        </>
    );
};

export default SignUp;