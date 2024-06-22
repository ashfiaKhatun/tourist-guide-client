import HelmetHook from "../../../hooks/HelmetHook";
import Banner from "../Banner/Banner";
import Stories from "../Stories/Stories";
import TravelGuide from "../TravelGuide/TravelGuide";

const Home = () => {
    return (
        <div>
            <HelmetHook title='Home'> </HelmetHook>

            <div>
                <Banner></Banner>
                <TravelGuide></TravelGuide>
                <Stories></Stories>
            </div>

        </div>
    );
};

export default Home;