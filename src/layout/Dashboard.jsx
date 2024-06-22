import { FaHome } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useGuide from "../hooks/useGuide";
import useTourist from "../hooks/useTourist";

const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const [isGuide] = useGuide();
    const [isTourist] = useTourist();

    return (
        <div className='flex'>

            {/* Sidebar */}
            <div>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-start">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="btn  drawer-button lg:hidden mt-6 ml-4"> <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg></label>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-60 lg:w-72 min-h-full bg-base-200 text-base-content gap-4 lg:gap-6">


                            {/* Admin  Sidebar content here */}
                            {
                                isAdmin &&
                                <>
                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/admin-profile'>Admin Home</NavLink></li>

                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/manage-users'>Manage User</NavLink></li>

                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/add-package'>Add Packages</NavLink></li>
                                </>
                            }

                            {/* Tour Guide  Sidebar content here */}
                            {
                                isGuide &&
                                <>
                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/guide-profile'>Tour Guide Home</NavLink></li>

                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/assign-tour'>Assigned Tours</NavLink></li>
                                </>
                            }

                            {/* Tourist  Sidebar content here */}
                            {
                                isTourist &&
                                <>
                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/Tourist-profile'>Tourist Home</NavLink></li>

                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/bookings'>My Bookings</NavLink></li>

                                    <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><NavLink to='/dashboard/wishlist'>My Wishlist</NavLink></li>
                                </>
                            }

                            <div className="divider"></div>

                            <li className='text-sm lg:text-base shadow-xl p-2 rounded-md'><Link to='/'><FaHome></FaHome>Home</Link></li>


                        </ul>

                    </div>
                </div>
            </div>


            {/* Outlet */}
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;