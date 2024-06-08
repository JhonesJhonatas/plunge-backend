import 'reflect-metadata'
import 'express-async-errors'

import './shared/container'

import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'

import { AppError } from '@/errors/app-error'
import { routes } from '@/shared/routes'

const app = express()
const port = process.env.PORT || 80

app.use(express.json())

const corsOptions = {
  origin: [
    'https://plunge-frontend.vercel.app',
    'https://www.plunge.app.br',
    'https://plunge.app.br',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(routes)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      })
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    })
  },
)

app.listen(port, () => {
  console.log(`Server running on port: ${port}. 🚀🚀`)
})
