import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="text-center mt-28 space-y-4">
            <h2 className="text-5xl font-extrabold">404</h2>
            <p>Sorry, we could not find this page. But you can check on other things on our</p>
            <Link to='/'><button className="btn">Home Page</button></Link>
        </div>
    );
};

export default ErrorPage;