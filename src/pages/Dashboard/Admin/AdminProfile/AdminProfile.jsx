import UserInfo from "../../../../component/UserInfo";
import HelmetHook from "../../../../hooks/HelmetHook";

const AdminProfile = () => {

    return (
        <div>
            <HelmetHook title="Admin Home"></HelmetHook>
            <UserInfo></UserInfo>
        </div>
    );
};

export default AdminProfile;