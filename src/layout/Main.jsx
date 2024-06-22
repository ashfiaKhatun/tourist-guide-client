import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";

const Main = () => {
    return (
        <>
            <div className="max-w-6xl mx-auto">
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Main;