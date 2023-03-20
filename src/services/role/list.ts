import { prisma } from '../../lib/prisma'

class UserListService {
  async execute () {
    const users = await prisma.user.findMany({
      where: { roleId: 2 },
      select: {
        id: true,
        name: true,
        email: true,
        phone: {
          select: { number: true }
        },
        createdAt: true
      }
    })
    return { status: 200, data: users }
  }
}

export { UserListService }