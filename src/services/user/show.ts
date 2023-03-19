import { prisma } from '../../lib/prisma'

class UserShowService {
  async execute(id: string) {
    const user = await prisma.user.findUnique({
      where: { id }
    })
    if (!user) return { status: 400, data: 'Usuário não encontrado na nossa base!'}
    return { status: 200, data: user }
  }
}

export { UserShowService }