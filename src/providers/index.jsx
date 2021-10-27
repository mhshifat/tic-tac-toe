import TicTacToeProvider from "./TicTacToeProvider";

export default function Providers({ children }) {
  return (
    <TicTacToeProvider>
      {children}   
    </TicTacToeProvider>
  )
}