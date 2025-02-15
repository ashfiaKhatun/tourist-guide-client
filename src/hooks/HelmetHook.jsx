import PropTypes from 'prop-types';
import { Helmet } from "react-helmet-async";

const HelmetHook = ({title}) => {
    return (
        <Helmet>
            <title>Tour-East | {title}</title>
        </Helmet>
    );
};

HelmetHook.propTypes = {
   title : PropTypes.string
}

export default HelmetHook;