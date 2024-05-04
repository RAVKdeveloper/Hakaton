import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = Number(process.env.PORT) ?? 3005

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

function bootstrap() {
  try {
    app.listen(port, () => console.log(`Server listen ${port}`))
  } catch (e) {
    console.log(`Initial erro: ${e}`)
  }
}

bootstrap()
