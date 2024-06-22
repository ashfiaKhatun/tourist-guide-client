import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })

    const handleMakeTouristGuide = user => {
        axiosSecure.patch(`/users/guide/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Success",
                        text: `${user.name} is an Tourist Guide now`,
                        icon: "success",
                        timer: 1500
                    });
                    refetch();
                }
            })

    }

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Success",
                        text: `${user.name} is an Admin now`,
                        icon: "success",
                        timer: 1500
                    });
                    refetch();
                }
            })

    }


    return (
        <div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, idx) => <tr key={user._id}>
                                    <th>{idx + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        {
                                            user.role === "Admin" ?
                                                <>
                                                    <button
                                                        disabled
                                                        className='btn btn-ghost'>
                                                        Tour Guide
                                                    </button>
                                                    <span className="p-2">/</span>
                                                    <button
                                                        disabled
                                                        className='btn btn-ghost'>
                                                        Admin
                                                    </button>
                                                </>
                                                :
                                                user.role === "Tourist Guide" ?
                                                    <>
                                                        <button
                                                            disabled
                                                            className='btn btn-ghost'>
                                                            Tour Guide
                                                        </button>
                                                        <span className="p-2">/</span>
                                                        <button
                                                            disabled
                                                            className='btn btn-ghost'>
                                                            Admin
                                                        </button>
                                                    </>
                                                    :
                                                    <>
                                                        <button
                                                        onClick={()=>handleMakeTouristGuide(user)}
                                                            className='btn btn-ghost'>
                                                            Tour Guide
                                                        </button>

                                                        <span className="p-2">/</span>

                                                        <button
                                                        onClick={()=>handleMakeAdmin(user)}
                                                            className='btn btn-ghost'>
                                                            Admin
                                                        </button>
                                                    </>
                                        }

                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default ManageUsers;