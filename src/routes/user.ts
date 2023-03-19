import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import FastifyAuth from '@fastify/auth'
import {
  UserInsertController,
  UserInsertProfileImageController,
  UserListController,
  UserUpdateController,
  UserAuthenticateController,
  UserSelfInformationController,
  UserShowController,
  UserRemoveController
} from '../controllers/user'
import {UserAuthenticateService} from '../services/user'

const userInsertController = new UserInsertController()
const userInsertProfileImage = new UserInsertProfileImageController()
const userList = new UserListController()
const userSelfInfo = new UserSelfInformationController()
const userUpdate = new UserUpdateController()
const userAuth = new UserAuthenticateController()
const userShow = new UserShowController()
const userRemove = new UserRemoveController()

export async function userRoutes(app: FastifyInstance) {
  app
    .decorate('asyncVerifyJWT', async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        if (!request.headers.authorization) throw new Error('Token de verificação não enviado!')
        const token = request.headers.authorization.replace('Bearer', '')
        const user: {email: string, sub: string} = app.jwt.verify(token)
        request.user = user
        request.user_id = user.sub
      } catch (error: any) {
        reply.code(401).send(error)
      }
    })
    .decorate('asyncVerifyEmailAndPassword', async (request: FastifyRequest<{Body: {email: string, password: string}}>, reply: FastifyReply) => {
      try {
        if (!request.body) throw new Error('E-mail e senha são obrigatórios')
        const { email, password } = request.body
        const userAuthService = new UserAuthenticateService()
        const user = await userAuthService.execute({ email, password })
        request.user = user
      } catch (error: any) {
        reply.code(400).send(error)
      }
    })
    .register(FastifyAuth)
    .after(() => {
      app.post('/users/auth', userAuth.handle)
      app.get('/users', { onRequest: [app.asyncVerifyJWT] }, userList.handle)
      app.get('/users/me', { onRequest: [app.asyncVerifyJWT] }, userSelfInfo.handle)
      app.get('/users/:id', { onRequest: [app.asyncVerifyJWT] }, userShow.handle)
      app.post('/users', { onRequest: [app.asyncVerifyJWT] }, userInsertController.handle)
      app.put('/user-avatar/:id', { onRequest: [app.asyncVerifyJWT] }, userInsertProfileImage.handle)
      app.put('/users/:id', { onRequest: [app.asyncVerifyJWT] }, userUpdate.handle)
      app.delete('/users/:id', { onRequest: [app.asyncVerifyJWT] }, userRemove.handle)
    })
}