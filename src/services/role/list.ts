import { prisma } from '../../lib/prisma'

class RoleListService {
  async execute () {
    const roles = await prisma.role.findMany({
      select: {
        id: true,
        type: true,
        createdAt: true
      }
    })
    return { status: 200, data: roles }
  }
}

export { RoleListService }