import { FastifyReply, FastifyRequest } from "fastify";
import {UserSelfInformationService} from '../../services/user/self-information'

class UserSelfInformationController {
  async handle (request: FastifyRequest, reply: FastifyReply) {
    console.log(request.user)
    const userSelfInfoService = new UserSelfInformationService()
    const { status, data } = await userSelfInfoService.execute(request.user_id)
    return reply.code(status).send({ status, data })
  }
}

export { UserSelfInformationController }