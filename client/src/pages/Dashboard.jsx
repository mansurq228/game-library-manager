import {useEffect,useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import API_BASE_URL from "../config"

import GameForm from "../components/GameForm"
import GameItem from "../components/GameItem"

function Dashboard(){

const [games,setGames] = useState([])
const [loading, setLoading] = useState(true)
const navigate = useNavigate()

const token = localStorage.getItem("token")

useEffect(()=>{

if (!token) {
  navigate("/")
  return
}

axios.get(
`${API_BASE_URL}/api/games`,
{
headers:{Authorization:`Bearer ${token}`}
}
)
.then(res => setGames(res.data))
.catch(err => {
  console.error(err)
  navigate("/")
})
.finally(() => setLoading(false))

},[])

const addGame = (game)=>{

setGames([...games,game])

}

const deleteGame = (id)=>{

setGames(games.filter(g => g._id !== id))

}

if (loading) {
  return <div className="page"><p>Загрузка...</p></div>
}

return(

<div className="dashboard">

  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem"}}>
    <h1>Моя Игротека</h1>
    <button onClick={() => {
      localStorage.removeItem("token")
      navigate("/")
    }} style={{backgroundColor: "var(--text-light)"}}>Выход</button>
  </div>

  <GameForm onGameAdded={addGame} />

  {games.length === 0 ? (
    <div className="empty-state">
      <p>Ваша библиотека пуста</p>
      <p style={{fontSize: "0.9rem"}}>Добавьте первую игру, используя форму выше</p>
    </div>
  ) : (
    <div className="games-list">
      {games.map(game => (
        <GameItem
          key={game._id}
          game={game}
          onDelete={deleteGame}
        />
      ))}
    </div>
  )}

</div>

)

}

export default Dashboard