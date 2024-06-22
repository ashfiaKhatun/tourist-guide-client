import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Stories = () => {

    const axiosPublic = useAxiosPublic();

    const { data: stories, isPending: isStoriesPending } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            // load pending sessions
            const res = await axiosPublic.get("/story")
            return res.data;
        },
    })

    return (
        <div className="mt-12 mb-6 text-center">
            <h2 className='text-2xl font-bold mb-8'>Stories</h2>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                
                {
                    !isStoriesPending?
                    stories.map(story=> <SwiperSlide key={story._id}>
                        <div className='space-y-4'>
                            <p className='ml-16 mr-16'>{story.story}</p>
                            <p>- {story.name}</p>
                        </div>
                    </SwiperSlide>)
                    :
                    <span className="loading loading-spinner loading-md"></span>
                }
            </Swiper>
        </div>
    );
};

export default Stories;