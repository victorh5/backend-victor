import { prisma } from '../../lib/prisma'

class UserRemoveService {
  async execute (id: string) {
    await prisma.user.delete({ where: { id } })
    return {status: 204, data: 'Usuário removido com sucesso!'}
  }
}

export { UserRemoveService }