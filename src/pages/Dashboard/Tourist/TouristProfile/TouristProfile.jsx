import Swal from "sweetalert2";
import UserInfo from "../../../../component/UserInfo";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const TouristProfile = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const handleSubmit = (e) => {
        e.preventDefault()

        const form = e.target;

        const storyInfo = {
            name: user.displayName,
            email: user.email,
            story: form.story.value
        }

        axiosSecure.post('/story', storyInfo)
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Story Added Successfully",
        })
        form.reset();
    }

    return (
        <div>
            <UserInfo></UserInfo>

            <div className="mt-6 space-y-4">
                <h3 className="text-2xl">Add a Story</h3>
                <form onSubmit={handleSubmit}>
                    <textarea name="story" id="" className="input input-bordered w-full border-2 border-blue-300 p-2"></textarea>
                    <input type="submit" value="Submit" className="btn btn-outline bg-green-700 text-white" />
                </form>

            </div>
        </div>
    );
};

export default TouristProfile;