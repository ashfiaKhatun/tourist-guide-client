import { useForm } from "react-hook-form";
import HelmetHook from "../../../../hooks/HelmetHook";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const image_hosting_api = `https://api.imgbb.com/1/upload?key=7ca45edc021f37ac4f501db8536d3b2e`;

const AddPackage = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset } = useForm();

    const handleAddPackage = async (data) => {
        const imageFile = { image: data.image[0] };

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {

            const packages = {
                title1: data.title1,
                title2: data.title2,
                title3: data.title3,
                description1: data.description1,
                description2: data.description2,
                description3: data.description3,

                about: data.about,
                price: data.price,
                type: data.type,
                image: res.data.data.display_url,
            }

            const packageUpload = await axiosSecure.post("/tour-package", packages)

            if (packageUpload.data.insertedId) {
                reset();
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Package Added Successfully",
                });

            }
        }

    }


    return (
        <div>
            <HelmetHook title="Add Package"></HelmetHook>

            <div>
                <div>
                    <h2 className="text-xl lg:text-3xl">Add Tour Package</h2>
                </div>

                <div>
                    <form className="space-y-4 mt-6" onSubmit={handleSubmit(handleAddPackage)}>
                        {/* Form Row */}
                        <div className="md:flex items-center space-y-4 md:space-y-0 mb-8">
                            <div className="form-control md:w-full">
                                <label className="label">
                                    <span className="label-text text-base">About Tour</span>
                                </label>
                                <label className="input-group ">
                                    <input type="text" {...register("about")} placeholder="About Tour" className="input input-bordered w-full border-2 border-blue-300" />
                                </label>
                            </div>
                        </div>

                        {/* Form Row */}
                        <div className="md:flex space-y-4 md:space-y-0">
                            <div className=" md:w-1/2 ">
                                <label className="label">
                                    <span className="label-text text-base">Price</span>
                                </label>
                                <label className="input-group ">
                                    <input type="number" {...register("price")}
                                        className="input input-bordered w-full border-2 border-blue-300" />
                                </label>
                            </div>

                            <div className=" md:w-1/2 md:ml-4">
                                <label className="label">
                                    <span className="label-text text-base">Tour Type</span>
                                </label>
                                <label className="input-group ">
                                    <select defaultValue="selected"
                                        {...register("type")}
                                        className="input input-bordered w-full border-2 border-blue-300"
                                    >
                                        <option disabled value="selected">Select Tour Type</option>

                                        <option value="Wildlife">Wildlife</option>

                                        <option value="Hiking">Hiking</option>
                                        <option value="Cultural ">Cultural </option>
                                        <option value="Adventure">Adventure</option>
                                        <option value="Historical">Historical</option>
                                        <option value="Eco">Eco</option>
                                        <option value="Cruise">Cruise</option>
                                        <option value="Safari">Safari</option>

                                    </select>
                                </label>
                            </div>
                        </div>


                        <div>
                            <h2 className="text-2xl">Tour Plan</h2>
                        </div>

                        {/* Form Row */}
                        <div className="md:flex items-center space-y-4 md:space-y-0">
                            <div className="form-control md:w-full">
                                <label className="label">
                                    <span className="label-text text-base">Title</span>
                                </label>
                                <label className="input-group ">
                                    <input type="text" {...register("title1")} placeholder="Title" className="input input-bordered w-full border-2 border-blue-300" />
                                </label>
                            </div>

                        </div>

                        {/* Form Row */}
                        <div className="md:flex space-y-4 md:space-y-0">

                            <div className="form-control md:w-full ">
                                <label className="label">
                                    <span className="label-text text-base">Description</span>
                                </label>
                                <label
                                    className="input-group ">
                                    <textarea {...register("description1")} className="input input-bordered w-full border-2 border-blue-300"></textarea>
                                </label>
                            </div>
                        </div>
                        {/* Form Row */}
                        <div className="md:flex items-center space-y-4 md:space-y-0">
                            <div className="form-control md:w-full">
                                <label className="label">
                                    <span className="label-text text-base">Title</span>
                                </label>
                                <label className="input-group ">
                                    <input type="text" {...register("title2")} placeholder="Title" className="input input-bordered w-full border-2 border-blue-300" />
                                </label>
                            </div>

                        </div>

                        {/* Form Row */}
                        <div className="md:flex space-y-4 md:space-y-0">

                            <div className="form-control md:w-full ">
                                <label className="label">
                                    <span className="label-text text-base">Description</span>
                                </label>
                                <label
                                    className="input-group ">
                                    <textarea {...register("description2")} className="input input-bordered w-full border-2 border-blue-300"></textarea>
                                </label>
                            </div>
                        </div>
                        {/* Form Row */}
                        <div className="md:flex items-center space-y-4 md:space-y-0">
                            <div className="form-control md:w-full">
                                <label className="label">
                                    <span className="label-text text-base">Title</span>
                                </label>
                                <label className="input-group ">
                                    <input type="text" {...register("title3")} placeholder="Title" className="input input-bordered w-full border-2 border-blue-300" />
                                </label>
                            </div>

                        </div>

                        {/* Form Row */}
                        <div className="md:flex space-y-4 md:space-y-0">

                            <div className="form-control md:w-full ">
                                <label className="label">
                                    <span className="label-text text-base">Description</span>
                                </label>
                                <label
                                    className="input-group ">
                                    <textarea {...register("description3")} className="input input-bordered w-full border-2 border-blue-300"></textarea>
                                </label>
                            </div>
                        </div>


                        {/* Form Row */}
                        <div className="md:flex space-y-4 md:space-y-0">
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-base">Upload Image</span>
                                </label>
                                <label className="input-group ">
                                    <input type="file" {...register("image")} className="input input-bordered w-full pt-2" />
                                </label>
                            </div>
                        </div>


                        <input type="submit" value="Add Package" className="btn btn-block bg-primary text-white" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPackage;