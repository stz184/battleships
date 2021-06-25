import React from "react";
import PropTypes from "prop-types"

function Cell({guessStatus, gameState, isActive}) {

    const getContents = React.useCallback(() => {
        let content = "&#8226;";
        if (gameState === 'show') {
            content = isActive ? 'X' : '';
        } else {
            if (guessStatus === true) {
                content = 'X'
            } else if (guessStatus === false) {
                content = '&#8212;';
            }
        }
        return {__html: content};
    }, [gameState, guessStatus, isActive]);

    return (
        <div className='cell' dangerouslySetInnerHTML={getContents()}/>
    );
}

Cell.propTypes = {
    guessStatus: PropTypes.bool,
    gameState: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired
}

export default Cell;
