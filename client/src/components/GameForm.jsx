import {useState} from "react"
import axios from "axios"
import API_BASE_URL from "../config"

function GameForm({onGameAdded}){

const [title,setTitle] = useState("")
const [platform,setPlatform] = useState("")
const [status,setStatus] = useState("planned")
const [loading, setLoading] = useState(false)

const token = localStorage.getItem("token")

const submit = async e => {

e.preventDefault()
setLoading(true)

try {
const res = await axios.post(
`${API_BASE_URL}/api/games`,
{title,platform,status},
{
headers:{Authorization:`Bearer ${token}`}
}
)

onGameAdded(res.data)

setTitle("")
setPlatform("")
setStatus("planned")
} catch (err) {
console.error(err)
} finally {
setLoading(false)
}

}

return(

<div className="form-section">
  <h2>Добавить игру</h2>
  <form onSubmit={submit}>
    <div className="input-row">
      <div className="form-group">
        <input
          placeholder="Название игры"
          value={title}
          onChange={e=>setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <input
          placeholder="Платформа (PC, PS5, Xbox...)"
          value={platform}
          onChange={e=>setPlatform(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <select
          value={status}
          onChange={e=>setStatus(e.target.value)}
        >
          <option value="planned">Планирую</option>
          <option value="playing">Играю</option>
          <option value="completed">Пройдена</option>
        </select>
      </div>

      <button type="submit" disabled={loading}>{loading ? "Добавление..." : "Добавить"}</button>
    </div>
  </form>
</div>

)

}

export default GameForm