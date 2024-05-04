import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const port = Number(process.env.PORT) ?? 3005
const dbUrl = process.env.DB_URL ?? ''

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

async function bootstrap() {
  try {
    await mongoose.connect(dbUrl)
    app.listen(port, () => console.log(`Server listen ${port}`))
  } catch (e) {
    console.log(`Initial error: ${e}`)
  }
}

bootstrap()
