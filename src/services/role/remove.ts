import { prisma } from '../../lib/prisma'

class RoleRemoveService {
  async execute (id: string) {
    await prisma.role.delete({ where: { id } })
    return {status: 204, data: 'Usuário removido com sucesso!'}
  }
}

export { RoleRemoveService }