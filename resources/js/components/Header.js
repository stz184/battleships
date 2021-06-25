import React from "react";
import PropTypes from "prop-types"

const Header = ({hints, shotState}) => {
    return (
        <div className='header'>
            {hints[shotState]}
        </div>
    );
};

Header.defaultProps = {
    hints: {
        sunk: '* * * Sunk * * * ',
        hit: '* * * Hit * * * ',
        miss: '* * * Miss * * * '
    }
};

Header.propTypes = {
    hits: PropTypes.object,
    shotState: PropTypes.string
};

export default Header;
