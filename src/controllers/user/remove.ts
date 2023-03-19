import { FastifyReply, FastifyRequest } from 'fastify'
import { UserRemoveService } from '../../services/user'


class UserRemoveController {
  async handle(request: FastifyRequest<{Params: { id: string }}>, reply: FastifyReply) {
    const { id } = request.params
    const userRemoveService = new UserRemoveService()
    const { status, data } = await userRemoveService.execute(id)
    reply
      .code(status)
      .send({ status, data })
  }
}

export { UserRemoveController }