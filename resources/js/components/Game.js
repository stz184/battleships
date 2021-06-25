import React, {useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types"
import Row from "./Row";
import Cell from "./Cell";
import Footer from "./Footer";
import Header from "./Header";

const LabelCell = React.memo( ({id}) => {
    return (<div className={'cell header'}>{id}</div>);
});

const Game = ({rows, columns}) => {
    const [gameState, setGameState] = useState('ready');
    const [shotState, setShotState] = useState('');
    const [correctGuesses, setCorrectGuess] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState([]);
    const [activeCells, setActiveCells] = useState({});

    const matrix = useMemo(() => {
        let matrix = [];
        for (let r = 0; r < rows; r++) {
            matrix[r] = [...Array(columns).keys()].map(k => r * columns + k + 1)
        }
        return matrix;
    }, [rows, columns]);

    const activeCellsCount = useMemo(() => {
        return Object.keys(activeCells).length;
    }, [activeCells]);

    const recordGuess = React.useCallback((command) => {
        if (command === 'show') {
            setGameState('show');
        } else if (/^[a-zA-Z][\d]{1,2}$/.test(command)) {
            if (gameState !== 'recall') {
                setGameState('recall');
            }
            let row = command.toLowerCase().charCodeAt(0) - 96;
            let col = parseInt(command.substr(1, 1));
            let cellID = ((row - 1) * 10) + col;

            const shipType = activeCells[cellID];
            if (shipType) {
                activeCells[cellID] = 'hit';
                setActiveCells(activeCells);
                if (Object.values(activeCells).indexOf(shipType) === -1) {
                    setShotState('sunk');
                } else {
                    setShotState('hit');
                }
                setCorrectGuess(guesses => [...guesses, cellID]);
            } else {
                setWrongGuesses(guesses => [...guesses, cellID]);
                setShotState('miss');
            }
        }
    }, [activeCells, gameState]);

    const getGuessStatus = (id) => {
        if (correctGuesses.indexOf(id) > -1) {
            return true;
        }
        if (wrongGuesses.indexOf(id) > -1) {
            return false;
        }
    };

    useEffect(() => {
        if (gameState === 'ready') {
            setTimeout(() => {
                setGameState('memorize');
            }, 2000);
        }
        if (gameState === 'memorize') {
            fetch('/api/ships/map')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setActiveCells(data);
                    setGameState('recall');
                });
        }
    }, [gameState]);

    useEffect(() => {
        if (correctGuesses.length === activeCellsCount) {
            setGameState('won');
        }
        if (wrongGuesses.length >= 100) {
            setGameState('lost')
        }
    }, [correctGuesses, wrongGuesses]);

    return (
        <>
            <Header shotState={shotState} />
            <div className="grid">
                {matrix.map((row, key) => (
                    <React.Fragment key={'fragment-' + key}>
                    {key === 0 && (
                        <Row key={'heading-row-' + key} id={'heading-' + key}><LabelCell id={''} key={'ajsj'} />
                        {row.map(
                        cellID => <LabelCell id={cellID} key={'label-cell-' + cellID} />
                        )}
                        </Row>)
                    }
                    <Row key={key} id={'row-' + key}>
                            <LabelCell key={'heading-' + key} id={(key + 10).toString(36).toUpperCase()} className='row-header' />
                            {row.map(
                                cellID => <Cell
                                    key={'cell-' + cellID}
                                    isActive={!!activeCells[cellID]}
                                    gameState={gameState}
                                    guessStatus={getGuessStatus(cellID)}
                                />
                            )}
                        </Row>
                    </React.Fragment>
                ))}
            </div>
            <Footer
                gameState={gameState}
                activeCellsCount={activeCellsCount}
                correctCellsCount={correctGuesses.length}
                wrongCellsCount={wrongGuesses.length}
                onCommand={recordGuess}
            />
        </>
    )
};

Game.propTypes = {
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired
};

export default Game
