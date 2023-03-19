import { FastifyReply, FastifyRequest } from 'fastify';
import { UserListService } from '../../services/user'

class UserListController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const userListService = new UserListService()
    const users = await userListService.execute()
    reply
      .code(200)
      .send(users)
  }
}

export { UserListController }