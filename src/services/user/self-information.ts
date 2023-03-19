import { prisma } from '../../lib/prisma'

class UserSelfInformationService {
  async execute(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        profile_image: true
      }
    })
    if (!user) return { status: 400, data: 'Informações não encontradas!' }
    return { status: 200, data: user }
  }
}

export { UserSelfInformationService }