import axios from "axios"
import {useState} from "react"
import API_BASE_URL from "../config"

function GameItem({game,onDelete}){

const token = localStorage.getItem("token")
const [loading, setLoading] = useState(false)

const deleteGame = async () => {

if (!window.confirm("Вы уверены, что хотите удалить эту игру?")) return

setLoading(true)

try {
await axios.delete(
`${API_BASE_URL}/api/games/${game._id}`,
{
headers:{Authorization:`Bearer ${token}`}
}
)

onDelete(game._id)
} catch (err) {
console.error(err)
} finally {
setLoading(false)
}

}

const getStatusBadgeClass = (status) => {
  switch(status) {
    case 'completed': return 'status-completed'
    case 'playing': return 'status-playing'
    default: return 'status-planned'
  }
}

return(

<div className="game-card">
  <h3>{game.title}</h3>
  
  <div className="game-info">
    <p><strong>Платформа:</strong> {game.platform}</p>
    <p><strong>Статус:</strong> <span className={`status-badge ${getStatusBadgeClass(game.status)}`}>{game.status.charAt(0).toUpperCase() + game.status.slice(1)}</span></p>
  </div>

  <div className="game-actions">
    <button onClick={deleteGame} className="delete-btn" disabled={loading}>
      {loading ? "Удаление..." : "Удалить"}
    </button>
  </div>
</div>

)

}

export default GameItem