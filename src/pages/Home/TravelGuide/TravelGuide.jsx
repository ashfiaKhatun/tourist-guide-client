import Iframe from 'react-iframe'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TravelGuide = () => {

    const axiosPublic = useAxiosPublic();

    const { data: tourPackages, isPending: istourPackagesPending } = useQuery({
        queryKey: ['tourPackages'],
        queryFn: async () => {
            // load pending sessions
            const res = await axiosPublic.get("/tour-package")
            return res.data;
        },
    })


    const { data: tourGuide, isPending: istourGuidePending } = useQuery({
        queryKey: ['tourGuide'],
        queryFn: async () => {
            // load pending sessions
            const res = await axiosPublic.get("/users/guides")
            return res.data;
        },
    })


    return (
        <div className='mt-12'>
            <Tabs>
                <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Our Packages</Tab>
                    <Tab>Meet Out Tour Guide</Tab>
                </TabList>

                {/* Overview */}
                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-2 m-10 gap-8 '>
                        {/* Cox's Bazar */}
                        <Iframe url="https://www.youtube.com/embed/s45NYZYRtKg?si=0BubowoyXfYaFNTS"
                            width="640px"
                            height="320px"
                            id=""
                            className=""
                            display="block"
                            position="relative" />

                        {/* Saint Martin */}
                        <Iframe url="https://www.youtube.com/embed/FK7nNB2FPLw?si=HSA9dzictTgBx6Ji"
                            width="640px"
                            height="320px"
                            id=""
                            className=""
                            display="block"
                            position="relative" />

                        {/* Chittagong */}
                        <Iframe url="https://www.youtube.com/embed/MQ1_xmoDgB0?si=aoR3l4mhOdftKP0s"
                            width="640px"
                            height="320px"
                            id=""
                            className=""
                            display="block"
                            position="relative" />

                        {/* Rangamati */}
                        <Iframe url="https://www.youtube.com/embed/8yXReWYa5Ak?si=PBN_qe-y9hu1wtgw"
                            width="640px"
                            height="320px"
                            id=""
                            className=""
                            display="block"
                            position="relative" />
                    </div>
                </TabPanel>

                {/* Packages */}
                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-3 m-10 gap-8 '>
                        {
                            !istourPackagesPending ?
                                tourPackages.map(tourPackage => <div
                                    key={tourPackage._id}
                                    className="card w-96 bg-base-100 shadow-xl">
                                    <figure><img src={tourPackage.image} alt="Image of a package" /></figure>

                                    <div className="card-body space-y-4">
                                        <div className='flex justify-between gap-6'>
                                            <h2 className="card-title">{tourPackage.about}</h2>

                                            <button
                                                className='tooltip'
                                                data-tip="Add to Wishlist">
                                                <FaRegHeart className='text-xl text-red-500'></FaRegHeart></button>
                                        </div>

                                        <div className='flex justify-between'>
                                            <h3><b>Price: </b>{tourPackage.price}</h3>
                                            <h3><b>Type: </b>{tourPackage.type}</h3>
                                        </div>

                                        <div className="divider"></div>

                                        <div className="card-actions">
                                            <Link to={`/package-details/${tourPackage._id}`}>
                                                <button
                                                    className="btn btn-outline bg-green-700 w-full text-white">View Package</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>)
                                :
                                <span className="loading loading-spinner loading-md"></span>
                        }


                    </div>
                </TabPanel>

                {/* Packages */}
                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-3 m-10 gap-8 '>
                        {
                            !istourGuidePending ?
                                tourGuide.map(guide => <div
                                    key={guide._id}
                                    className="card w-96 bg-base-100 shadow-xl">
                                    <figure><img src={guide.photo} alt="photo" className='h-60 w-full' /></figure>

                                    <div className="card-body space-y-4">
                                        <h2 className="card-title">{guide.name}</h2>

                                        <div className="divider"></div>

                                        <div className="card-actions">
                                            <button

                                                className="btn btn-outline bg-green-700 w-full text-white">View Details</button>
                                        </div>
                                    </div>
                                </div>)
                                :
                                <span className="loading loading-spinner loading-md"></span>
                        }

                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TravelGuide;