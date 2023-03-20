import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import FastifyAuth from '@fastify/auth'
import {
  RoleInsertController,
  RoleListController,
  RoleRemoveController,
  RoleShowController,
  RoleUpdateController
} from '../controllers/role'

const roleInsertController = new RoleInsertController()
const roleList = new RoleListController()
const roleUpdate = new RoleUpdateController()
const roleShow = new RoleShowController()
const roleRemove = new RoleRemoveController()

export async function roleRoutes(app: FastifyInstance) {
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
    .register(FastifyAuth)
    .after(() => {
      app.get('/roles', { onRequest: [app.asyncVerifyJWT] }, roleList.handle)
      app.get('/roles/:id', { onRequest: [app.asyncVerifyJWT] }, roleShow.handle)
      app.post('/roles', { onRequest: [app.asyncVerifyJWT] }, roleInsertController.handle)
      app.put('/roles/:id', { onRequest: [app.asyncVerifyJWT] }, roleUpdate.handle)
      app.delete('/roles/:id', { onRequest: [app.asyncVerifyJWT] }, roleRemove.handle)
    })
}