import { FastifyReply, FastifyRequest } from 'fastify'
import { UserShowService } from '../../services/user'

class UserShowController {
  async handle (request: FastifyRequest<{Params: { id: string }}>, reply: FastifyReply) {
    const { id } = request.params
    const userShowService = new UserShowService()
    const { status, data } = await userShowService.execute(id)
    return reply.code(status).send({ status, data })
  }
}

export { UserShowController }