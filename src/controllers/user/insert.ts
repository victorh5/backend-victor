import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserInsertService } from '../../services/user'

const saveUser = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  confirmPassword: z.string().min(4),
  phone: z.string(),
  role: z.object({
    id: z.number()
  })
})

class UserInsertController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      role
    } = saveUser.parse(request.body)

    const userInsertService = new UserInsertService()
    const { status, data } = await userInsertService.execute({ name, email, password, confirmPassword, phone, role })

    reply
      .code(status)
      .send({ status, data })
  }
}

export { UserInsertController }