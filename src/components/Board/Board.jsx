import Block from "../Block/Block";
import "./Board.css";

export default function Board({ lists }) {
  return (
    <div className="board">
      {lists?.map((blockType, ind) => <Block key={ind} ind={ind} type={blockType} />)}
    </div>
  )
}