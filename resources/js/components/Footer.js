import React, {useCallback} from "react";
import PropTypes from "prop-types"

const Footer = ({hints, gameState, activeCellsCount, correctCellsCount, wrongCellsCount, onCommand}) => {
    const remainingCount = useCallback(() => {
        if (gameState === 'recall') {
            return (
                <div>
                    Remaining cells {activeCellsCount - correctCellsCount}
                </div>
            )
        }
    }, [gameState, activeCellsCount, correctCellsCount]);

    const onKeyPress = useCallback((event) => {
        if (event.charCode === 13) {
            onCommand && onCommand(event.target.value);
            event.target.value = '';
        }
    }, [onCommand]);

    return (
        <div className='footer'>
            <div className='cmd'>
                <p>Enter coordinates (row, col), e.g. A5 and hit Enter</p>
                <input type='text' placeholder='Example: A5' onKeyPress={onKeyPress} />
            </div>
            <div className='hint'>
                {(hints[gameState] || '').replace('{shots}', correctCellsCount + wrongCellsCount)}
            </div>
            {remainingCount()}
        </div>
    )
};

Footer.defaultProps = {
    hints: {
        ready: 'Get Ready',
        memorize: 'Positioning the ships',
        recall: 'Fire!',
        won: 'Well done! You completed the game in {shots} shots!',
        lost: 'Game over :('
    }
};

Footer.propTypes = {
    hints: PropTypes.object.isRequired,
    gameState: PropTypes.string.isRequired,
    activeCellsCount: PropTypes.number.isRequired,
    correctCellsCount: PropTypes.number.isRequired,
    onCommand: PropTypes.func.isRequired
};

export default Footer;
