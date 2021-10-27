import "./Player.css";

export default function Player({ name, lists }) {
  return (
    <div className="player">
      <h3>{name}</h3>
      <ul>
        {lists?.map(item => (
          <li key={item.id}>{item.message}</li>
        ))}
      </ul>
    </div>
  )
}