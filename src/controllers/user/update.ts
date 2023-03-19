import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserUpdateService } from '../../services/user'


const saveUser = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.object({
    cep: z.string(),
    number: z.number(),
    street: z.string(),
    state: z.string(),
    city: z.string(),
    complement: z.string().optional()
  }).optional()
})

class UserUpdateController {
  async handle(request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
    const { id } = request.params
    const {
      name,
      email,
      phone,
      address
    } = saveUser.parse(request.body)

    const userUpdateService = new UserUpdateService()
    const {status, data} = await userUpdateService.execute({ id, name, email, phone, address })

    reply
      .code(status)
      .send({ status, data })
  }
}

export { UserUpdateController }