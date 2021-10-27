import { createContext, useCallback, useContext, useReducer } from "react";

export const TIC_TAC_TOE_ACTIONS = {
  GAME_START: "GAME_START",
  GAME_END: "GAME_END",
  PLAYER_ONE: "PLAYER_ONE",
  PLAYER_TWO: "PLAYER_TWO",
  SET_BLOCK_POSITION: "SET_BLOCK_POSITION",
  SET_BOARD_PATTERN: "SET_BOARD_PATTERN",
  RESET_GAME: "RESET_GAME",
}

export const WINING_PATTERNS = ["012", "345", "678", "036", "147", "258", "048", "246", "2458", "2468", "0346", "0468", "0346", "0246", "2458", "0248"];

const INITIAL_STATE = {
  gameState: "initial",
  playerOne: {
    name: "",
    pattern: []
  },
  playerTwo: {
    name: "",
    pattern: []
  },
  boardPattern: ["", "", "", "", "", "", "", "", ""]
};

const TicTacToeState = createContext({});
const TicTacToeDispatch = createContext(null);

function TicTacToeReducer(state, { type, payload }) {
  switch (type) {
    case TIC_TAC_TOE_ACTIONS.GAME_START:
      return { ...state, gameState: "start" };
    case TIC_TAC_TOE_ACTIONS.GAME_END:
      return { ...state, gameState: "end" };
    case TIC_TAC_TOE_ACTIONS.RESET_GAME:
      return {...INITIAL_STATE};
    case TIC_TAC_TOE_ACTIONS.PLAYER_ONE:
      return { ...state, playerOne: { ...state.playerOne, ...payload } };
    case TIC_TAC_TOE_ACTIONS.PLAYER_TWO:
      return { ...state, playerTwo: { ...state.playerTwo, ...payload } };
    case TIC_TAC_TOE_ACTIONS.SET_BLOCK_POSITION:
      return { ...state, [payload.player]: { ...state[payload.player], pattern: [...state[payload.player].pattern, payload.position] } };
    case TIC_TAC_TOE_ACTIONS.SET_BOARD_PATTERN:
      const newArray = [...state.boardPattern];
      newArray.splice(+payload.position, 1, payload.player === "playerOne" ? "circle" : payload.player === "playerTwo" ? "cross" : "");
      return { ...state, boardPattern: newArray };
    default:
      return state;
  }
}

export default function TicTacToeProvider({ children }) {
  const [state, dispatch] = useReducer(TicTacToeReducer, INITIAL_STATE);
  const dispatchAsync = useCallback(async (type, payload) => dispatch({ type, payload }), []);
  
  return (
    <TicTacToeState.Provider value={state}>
      <TicTacToeDispatch.Provider value={dispatchAsync}>
        {children}
      </TicTacToeDispatch.Provider>
    </TicTacToeState.Provider>
  )
}

export const useTicTacToeState = () => {
  const state = useContext(TicTacToeState);
  if (!state) throw new Error("");
  return state;
}

export const useTicTacToeDispatch = () => {
  const dispatch = useContext(TicTacToeDispatch);
  if (!dispatch) throw new Error("");
  return dispatch;
}