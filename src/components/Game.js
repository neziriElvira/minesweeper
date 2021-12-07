import Board from "./Board"


const Game = () => {

    return (
        <div className="game">
            <Board
                height={8}
                width={8}
                mines={10} />
        </div>
    )
}

export default Game;