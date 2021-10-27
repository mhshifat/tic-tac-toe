import { FaCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import "./Block.css";

export default function Block({ type, ind }) {
  return (
    <span className="block">
      <span>{ind}</span>
      {type === "circle" ? <FaCircle /> : type === "cross" ? <ImCross /> : null}
    </span>
  )
}