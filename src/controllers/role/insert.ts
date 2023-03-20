import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RoleInsertService } from '../../services/role'

const insertRole = z.object({
  type: z.string(),
})

class RoleInsertController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { type } = insertRole.parse(request.body)

    const roleInsertService = new RoleInsertService()
    const { status, data } = await roleInsertService.execute(type)

    reply
      .code(status)
      .send({ status, data })
  }
}

export { RoleInsertController }