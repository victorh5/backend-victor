import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import {UserAuthenticateService} from '../../services/user'

const authUser = z.object({
  email: z.string().email(),
  password: z.string().min(4)
})

class UserAuthenticateController {
  async handle (request: FastifyRequest, reply: FastifyReply) {
    const {email, password} = authUser.parse(request.body)
    const userAuthService = new UserAuthenticateService()
    const { status, data } = await userAuthService.execute({ email, password })
    return reply.code(status).send({ status, data })
  }
}

export { UserAuthenticateController }