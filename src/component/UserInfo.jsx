import useAuth from '../hooks/useAuth';

const UserInfo = () => {

    const {user, loader} = useAuth();

    if (loader) {
        return <span className="loading loading-dots loading-lg"></span>;
    }

    if (!user) {
        return <div>No user data available</div>;
    }

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={user.photoURL} alt="Photo" className='h-60 w-full'/></figure>
                <div className="card-body">
                    <h2 className="card-title"><b>Name: </b>{user.displayName}</h2>
                    <p><b>Email: </b> {user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;