import { FastifyReply, FastifyRequest } from 'fastify';
import { RoleListService } from '../../services/role'

class RoleListController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const roleListService = new RoleListService()
    const {status, data} = await roleListService.execute()
    reply
      .code(status)
      .send({ status, data })
  }
}

export { RoleListController }