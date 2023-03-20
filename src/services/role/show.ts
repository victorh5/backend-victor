import { prisma } from '../../lib/prisma'

class RoleShowService {
  async execute(id: string) {
    const role = await prisma.role.findUnique({
      where: { id }
    })
    if (!role) return { status: 400, data: 'Tipo de usuário não encontrado na nossa base!'}
    return { status: 200, data: role }
  }
}

export { RoleShowService }