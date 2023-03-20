import { prisma } from '../../lib/prisma'

class UserListService {
  async execute () {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: {
          select: { type: true }
        },
        phone: {
          select: { number: true }
        },
        createdAt: true
      },
      orderBy: {createdAt: 'desc'}
    })
    return { status: 200, data: users }
  }
}

export { UserListService }