import { useCallback, useEffect, useState } from "react";
import Board from "./components/Board/Board";
import Player from "./components/Player/Player";
import { TIC_TAC_TOE_ACTIONS, useTicTacToeDispatch, useTicTacToeState, WINING_PATTERNS } from "./providers/TicTacToeProvider";

export default function App() {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const dispatch = useTicTacToeDispatch();
  const { gameState, playerOne, playerTwo, boardPattern } = useTicTacToeState();
  const choosePlayerName = useCallback((message, action) => {
    const playerName = window.prompt(message)
    if (!playerName) return choosePlayerName(message, action);
    dispatch(action, { name: playerName });
    return playerName;
  }, [dispatch])
  const chooseBlockPosition = useCallback((player, key) => {
    const answer = window.prompt(`[${player}] - Please choose an empty block position! ( Positions: 0 - 8 )`);
    if (!answer || boardPattern[+answer].length) return chooseBlockPosition(player, key);
    dispatch(TIC_TAC_TOE_ACTIONS.SET_BLOCK_POSITION, { player: key, position: answer });
    dispatch(TIC_TAC_TOE_ACTIONS.SET_BOARD_PATTERN, { player: key, position: answer });
    setCurrentPlayer(key === "playerOne" ? "playerTwo" : "playerOne");
  }, [boardPattern, dispatch])
  const handleStartGame = useCallback(() => {
    dispatch(TIC_TAC_TOE_ACTIONS.GAME_START);
    choosePlayerName("Player one name!", TIC_TAC_TOE_ACTIONS.PLAYER_ONE);
    choosePlayerName("Player Two name!", TIC_TAC_TOE_ACTIONS.PLAYER_TWO);
    setCurrentPlayer("playerOne");
  }, [choosePlayerName, dispatch]);
  const getCurrentPlayerName = useCallback(() => {
    return currentPlayer === "playerOne" ? playerOne?.name : currentPlayer === "playerTwo" ? playerTwo?.name : null; 
  }, [currentPlayer, playerOne?.name, playerTwo?.name]);

  useEffect(() => {
    const playerOnePattern = playerOne?.pattern?.sort().join("");
    const playerTwoPattern = playerTwo?.pattern?.sort().join("");
    if (WINING_PATTERNS.includes(playerOnePattern)) {
      dispatch(TIC_TAC_TOE_ACTIONS.GAME_END);
      alert(`${playerOne?.name} has own the game!`);
    } else if (WINING_PATTERNS.includes(playerTwoPattern)) {
      dispatch(TIC_TAC_TOE_ACTIONS.GAME_END);
      alert(`${playerTwo?.name} has own the game!`);
    }
  }, [currentPlayer, dispatch, playerOne, playerTwo])

  return (
    <div className="container">
      <Player name={playerOne?.name || "Player 1"} lists={playerOne?.pattern?.map((p, ind) => ({ id: ind, message: `${playerOne.name} has chosen number ${p} position!` }))} />
      <div>
        <Board lists={boardPattern} />
        <br />
        <center>
          <button disabled={gameState !== "initial"} onClick={handleStartGame}>Start Game</button>
          {(playerOne.name && playerTwo.name) && <button disabled={gameState === "end"} onClick={() => chooseBlockPosition(getCurrentPlayerName(), currentPlayer)}>
            Set Position ( {getCurrentPlayerName()} )  
          </button>}
          <button disabled={gameState !== "end"} onClick={() => dispatch(TIC_TAC_TOE_ACTIONS.RESET_GAME)}>End Game</button>
        </center>
      </div>
      <Player name={playerTwo?.name || "Player 2"} lists={playerTwo?.pattern?.map((p, ind) => ({ id: ind, message: `${playerTwo.name} has chosen number ${p} position!` }))} />
    </div>
  )
}