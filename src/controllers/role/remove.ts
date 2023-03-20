import { FastifyReply, FastifyRequest } from 'fastify'
import { RoleRemoveService } from '../../services/role'


class RoleRemoveController {
  async handle(request: FastifyRequest<{Params: { id: string }}>, reply: FastifyReply) {
    const { id } = request.params
    const roleRemoveService = new RoleRemoveService()
    const { status, data } = await roleRemoveService.execute(id)
    reply
      .code(status)
      .send({ status, data })
  }
}

export { RoleRemoveController }