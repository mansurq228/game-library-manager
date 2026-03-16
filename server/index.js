require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const authRoutes = require("./routes/auth")
const gameRoutes = require("./routes/games")

const app = express()

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3000",
      process.env.CLIENT_URL
    ].filter(Boolean)
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(null, true)
    }
  },
  credentials: true
}))
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err))

app.use("/api/auth", authRoutes)
app.use("/api/games", gameRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
)