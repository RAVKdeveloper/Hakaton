import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import { globalRouter } from './routes/global.routes.ts'

dotenv.config()

const app = express()
const port = Number(process.env.PORT) ?? 3005
const dbUrl = process.env.DB_URL ?? ''

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())
app.use(cookieParser())
app.use('/api', globalRouter)

async function bootstrap() {
  try {
    await mongoose.connect(dbUrl)
    app.listen(port, () => console.log(`Server listen ${port}`))
  } catch (e) {
    console.log(`Initial error: ${e}`)
  }
}

bootstrap()
