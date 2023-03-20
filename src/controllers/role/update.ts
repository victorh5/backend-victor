import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RoleUpdateService } from '../../services/role'


const updateRole = z.object({
  type: z.string(),
})

class RoleUpdateController {
  async handle(request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
    const { id } = request.params
    const { type } = updateRole.parse(request.body)

    const roleUpdateService = new RoleUpdateService()
    const {status, data} = await roleUpdateService.execute({ id, type })

    reply
      .code(status)
      .send({ status, data })
  }
}

export { RoleUpdateController }