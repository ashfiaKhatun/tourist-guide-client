import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTourist = () => {
    const { user, token } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isTourist, isPending: isTouristLoading } = useQuery({
        queryKey: [user?.email, 'isTourist'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/tourist/${user.email}`)
            return res.data?.tourist;
        },
        enabled: !!user?.email && !!token
    })
    return [isTourist, isTouristLoading]
};

export default useTourist;