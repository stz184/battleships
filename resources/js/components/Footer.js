import React from 'react';

function Footer({hints, gameState, activeCellsCount, correctCellsCount, onCommand}) {
    const remainingCount = () => {
        if (gameState === 'recall') {
            return (
                <div>
                    Remaining cells {activeCellsCount - correctCellsCount}
                </div>
            )
        }
    }

    const onKeyPress = (event) => {
        if (event.charCode === 13 && onCommand) {
            onCommand(event.target.value);
        }
    };

    return (
        <div className='footer'>
            <div className='cmd'>
                <p>Enter coordinates (row, col), e.g. A5 and hit Enter</p>
                <input type='text' placeholder='Example: A5' onKeyPress={onKeyPress} />
            </div>
            <div className='hint'>
                {hints[gameState]}
            </div>
            {remainingCount()}
        </div>
    )
}

Footer.defaultProps = {
    hints: {
        ready: 'Get Ready',
        memorize: 'Positioning the ships',
        recall: 'Fire!',
        won: 'Well done! You completed the game in 14 shots!',
        lost: 'Game over :('
    }
}

export default Footer;