import {useState} from "react"
import axios from "axios"
import {useNavigate, Link} from "react-router-dom"

function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [error, setError] = useState("")

const navigate = useNavigate()

const submit = async e =>{

e.preventDefault()

try {
const res = await axios.post(
"http://localhost:3000/api/auth/login",
{email,password}
)

localStorage.setItem("token",res.data.token)

navigate("/dashboard")
} catch (err) {
setError(err.response?.data?.message || "Ошибка входа")
}

}

return(

<div className="page">
  <div className="form-container">
    <h2>Игротека</h2>
    <p style={{textAlign: "center", color: "var(--text-light)", marginBottom: "1.5rem"}}>
      Войдите в свой аккаунт
    </p>
    
    {error && <div style={{
      padding: "0.75rem",
      backgroundColor: "#fee2e2",
      color: "#991b1b",
      borderRadius: "8px",
      marginBottom: "1rem",
      fontSize: "0.9rem"
    }}>{error}</div>}

    <form onSubmit={submit}>
      <div className="form-group">
        <label>Почта</label>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Пароль</label>
        <input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">Вход</button>
    </form>

    <div className="link-text">
      Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
    </div>
  </div>
</div>

)

}

export default Login