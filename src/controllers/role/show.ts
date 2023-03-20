import { FastifyReply, FastifyRequest } from 'fastify'
import { RoleShowService } from '../../services/role'

class RoleShowController {
  async handle (request: FastifyRequest<{Params: { id: string }}>, reply: FastifyReply) {
    const { id } = request.params
    const roleShowService = new RoleShowService()
    const { status, data } = await roleShowService.execute(id)
    return reply.code(status).send({ status, data })
  }
}

export { RoleShowController }