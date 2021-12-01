import React, { useState } from 'react';
import CreateBoard from '../utils/CreateBoard';
import Cell from './Cell';
import revealed from '../utils/Reveal';
import Endgame from './Endgame';

const Board = ({ height, width, mines }) => {
    const [grid, setGrid] = useState([]);
    const [mineCount, setMineCount] = useState(10);
    const [nonMineCount, setNonMineCount] = useState(54);
    const [mineLocations, setMineLocations] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [hideShowButton, setHideShowButton] = useState(true);
    const [result, setResult] = useState('');

    const handeleClick = () => {
        freshBoard();
        setHideShowButton(false);
    };

    const freshBoard = () => {
        const newBoard = CreateBoard(height, width, mines);
        setNonMineCount(height * width - mines);
        setMineCount(10);
        setMineLocations(newBoard.mineLocation);
        setGrid(newBoard.board);
    };

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
    };

    const updateFlag = (e, x, y) => {

        e.preventDefault();
        let newGrid = JSON.parse(JSON.stringify(grid));
        console.log(newGrid[x][y]);
        if (newGrid[x][y].revealed) {
            return;
        }
        if (newGrid[x][y].flagged === false) {
            newGrid[x][y].flagged = true;
            setMineCount(mineCount - 1);
        } else {
            newGrid[x][y].flagged = false;
            setMineCount(mineCount + 1);
        }
        setGrid(newGrid);

    };

    const revealBoard = () => {
        let revealedGrid = grid;
        revealedGrid.map((gridRow) => {
            gridRow.map((gridItem) => {
                gridItem.revealed = true;
            });
        });
        setGrid(revealedGrid);
    }

    const revealCell = (x, y) => {
        if (grid[x][y].revealed || gameOver || grid[x][y].flagged) {
            return;
        }
        let newGrid = JSON.parse(JSON.stringify(grid));
        if (newGrid[x][y].value === "X") {
            for (let i = 0; i < mineLocations.length; i++) {
                newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
            }
            setGrid(newGrid);
            revealBoard();
            setGameOver(true);
            setResult('You lose! ');
        } else {
            let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
            setGrid(newRevealedBoard.arr);
            setNonMineCount(newRevealedBoard.newNonMines);
            if (newRevealedBoard.newNonMines === 0) {
                setGameOver(true);
                setResult('You win! ');
            }
        }
    };


    return (
        <div>
            {hideShowButton &&
                <button className="glow-on-hover" onClick={handeleClick}>Play Game</button>
            }
            <div className="board">
                {!hideShowButton &&
                    <div className="mine-count">Mines remaining: {mineCount}</div>
                }
                {grid.map((singleRow, index1) => {
                    return (
                        <div style={{ display: "flex" }} key={index1}>
                            {singleRow.map((singleBlock, index2) => {
                                return (
                                    <Cell
                                        revealCell={revealCell}
                                        details={singleBlock}
                                        updateFlag={updateFlag}
                                        key={index2}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
                {gameOver &&
                    <Endgame restartGame={restartGame} result={result} />
                }
            </div>
        </div>
    );
}

export default Board;