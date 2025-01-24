import express from "express"
import birdRoutes from "./routes/bird"
import cors from "cors"

const app = express()

// Enable CORS for all routes
app.use(express.json(), cors())

app.use("/api",birdRoutes)

export default app