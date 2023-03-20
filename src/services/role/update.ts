import { prisma } from '../../lib/prisma'

interface IRoleUpdate {
  id: string
  type: string
}

class RoleUpdateService {
  async execute ({id, type}: IRoleUpdate) {
    await prisma.role.update({
      where: { id },
      data: { type }
    })
    return { status: 204, data: 'Nível atualizado com sucesso' }
  }
}

export { RoleUpdateService }