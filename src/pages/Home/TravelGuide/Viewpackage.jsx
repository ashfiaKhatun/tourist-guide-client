import { useParams } from "react-router-dom";
import HelmetHook from "../../../hooks/HelmetHook";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Viewpackage = () => {
    const params = useParams()

    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()

    const { data: tourPackages, isPending: istourPackagesPending } = useQuery({
        queryKey: ['tourPackages'],
        queryFn: async () => {
            // load pending sessions
            const res = await axiosSecure.get(`/tour-package/${params.id}`)
            return res.data;
        },
    })

    const { data: tourGuide, isPending: isGuidePending } = useQuery({
        queryKey: ['tourGuide'],
        queryFn: async () => {
            // load pending sessions
            const res = await axiosPublic.get("/users/guides")
            return res.data;
        },
    })


    const handleBookPackage = (e) => {
        e.preventDefault();
        document.getElementById('update-material').close();

        const form = e.target;

        const bookingInfo = {
            name: form.name.value,
            email: form.email.value,
            image: form.image.value,
            price: form.price.value,
            date: form.date.value,
            packageName: tourPackages.about,
            guideName: form.guideName.value,
        }

        axiosSecure.post('/bookings', bookingInfo)
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Booked Successfully",
            })
            form.reset();
    }


    return (
        <div>
            <HelmetHook title="Detailed Package"></HelmetHook>

            <div>
                {
                    !istourPackagesPending ?
                        <>
                            <div className="hero min-h-screen bg-base-200">
                                <div className="hero-content flex-col lg:flex-row gap-20">
                                    <img src={tourPackages.image} className="max-w-sm rounded-lg shadow-2xl" />

                                    <div className="space-y-6">
                                        <h1 className="text-4xl font-bold">{tourPackages.about}</h1>

                                        <div className="space-y-2">
                                            <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100">
                                                <div className="collapse-title text-xl font-medium">
                                                    {tourPackages.title1}
                                                </div>
                                                <div className="collapse-content">
                                                    <p>{tourPackages.description1}</p>
                                                </div>
                                            </div>

                                            <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100">
                                                <div className="collapse-title text-xl font-medium">
                                                    {tourPackages.title2}
                                                </div>
                                                <div className="collapse-content">
                                                    <p>{tourPackages.description2}</p>
                                                </div>
                                            </div>

                                            <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100">
                                                <div className="collapse-title text-xl font-medium">
                                                    {tourPackages.title3}
                                                </div>
                                                <div className="collapse-content">
                                                    <p>{tourPackages.description3}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="divider"></div>

                                        <div className="flex justify-between ml-10 mr-10">
                                            <h2 className="text-xl"><b>Price: </b>{tourPackages.price}</h2>
                                            <h2 className="text-xl"><b>Type: </b>{tourPackages.type}</h2>
                                        </div>

                                        <div className="divider"></div>

                                        <button
                                            onClick={() => document.getElementById('update-material').showModal()}
                                            className="btn btn-primary w-full">Book Now</button>
                                    </div>
                                </div>

                            </div>

                            <dialog id="update-material" className="modal">
                                <div className="modal-box">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <h3 className="font-bold text-lg">Book Now!</h3>
                                    <form className="space-y-4 mt-6" onSubmit={handleBookPackage}
                                    >
                                        {/* Form Row */}
                                        <div className="space-y-4">
                                            <div className="form-control md:w-full">
                                                <label className="label">
                                                    <span className="label-text text-base">Name</span>
                                                </label>
                                                <label className="input-group ">
                                                    <input type="text"
                                                        defaultValue={user?.displayName} readOnly name="name" placeholder="name" className="input input-bordered w-full border-2 border-blue-300" />
                                                </label>
                                            </div>

                                            <div className="form-control md:w-full">
                                                <label className="label">
                                                    <span className="label-text text-base">Email</span>
                                                </label>
                                                <label className="input-group ">
                                                    <input type="text"
                                                        defaultValue={user?.email} readOnly name="email" placeholder="name" className="input input-bordered w-full border-2 border-blue-300" />
                                                </label>
                                            </div>


                                            <div className=" md:w-full ">
                                                <label className="label">
                                                    <span className="label-text text-base">Image</span>
                                                </label>
                                                <label className="input-group ">
                                                    <input type="text" defaultValue={user?.photoURL} readOnly name="image"
                                                        className="input input-bordered w-full border-2 border-blue-300" />
                                                </label>
                                            </div>

                                            <div className=" md:w-full ">
                                                <label className="label">
                                                    <span className="label-text text-base">Price</span>
                                                </label>
                                                <label className="input-group ">
                                                    <input type="text"
                                                        defaultValue={tourPackages.price} readOnly name="price"
                                                        className="input input-bordered w-full border-2 border-blue-300" />
                                                </label>
                                            </div>

                                            <div className=" md:w-full ">
                                                <label className="label">
                                                    <span className="label-text text-base">Date</span>
                                                </label>
                                                <label className="input-group ">
                                                    <input type="date"
                                                        name="date"
                                                        className="input input-bordered w-full border-2 border-blue-300" />
                                                </label>
                                            </div>

                                            <div className=" md:w-full ">
                                                <label className="label">
                                                    <span className="label-text text-base">Select Guide</span>
                                                </label>
                                                <label className="input-group ">
                                                    <select defaultValue="selected"
                                                        name="guideName"
                                                        className="input input-bordered w-full border-2 border-blue-300"
                                                    >
                                                        <option disabled value="selected">Select Your Tour Guide</option>
                                                        {
                                                            !isGuidePending ?
                                                                tourGuide.map(guide => <option
                                                                    key={guide._id}
                                                                    value={guide.name}>{guide.name}</option>)

                                                                :

                                                                <span className="loading loading-spinner loading-md"></span>
                                                        }


                                                    </select>
                                                </label>
                                            </div>

                                        </div>

                                        <input type="submit" value="Book Now" className="btn btn-block bg-primary text-white" />
                                    </form>
                                </div>
                            </dialog>
                        </>
                        :
                        <span className="loading loading-spinner loading-md"></span>
                }

            </div>
        </div>
    );
};

export default Viewpackage;