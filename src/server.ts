import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import jwt from '@fastify/jwt'
import path from 'path'
import bcrypt from 'fastify-bcrypt'
import { userRoutes } from './routes/user'

const __dirname = path.resolve(path.dirname(''))

export const app = Fastify({ logger: true })
app.register(fastifyStatic, {
  root: path.join(__dirname, 'uploads'),
  prefix: '/uploads/'
})
app.register(cors)
app.register(multipart)
app.register(bcrypt, { saltWorkFactor: 8 })
app.register(userRoutes)
app.register(jwt, { secret: '69a94ca2a8c48146d2d40a090db1d196' })

app.listen({ port: 3333 })
  .then(() => console.log('Server is running on port 3333'))