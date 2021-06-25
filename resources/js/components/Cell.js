import React, {useCallback} from "react";
import PropTypes from "prop-types"

const Cell = ({guessStatus, gameState, isActive}) => {
    const contents = useCallback(() => {
        let content = '&#8226;';
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
        <div className='cell' dangerouslySetInnerHTML={contents()}/>
    );
};

Cell.propTypes = {
    guessStatus: PropTypes.bool,
    gameState: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired
};

export default React.memo(Cell);
