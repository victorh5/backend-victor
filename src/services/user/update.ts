import { prisma } from '../../lib/prisma'

interface IUserUpdate {
  id: string
  name?: string
  email?: string
  phone?: string
  address?: {
    cep: string
    number: number
    street: string
    state: string
    city: string
    complement?: string
  }
}

class UserUpdateService {
  async execute ({id, ...data}: IUserUpdate) {
    const userUpdated = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        phone: {
          update: { number: data.phone }
        },
        address: {
          update: data.address
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        profile_image: true,
        phone: {
          select: { number: true }
        },
        address: {
          select: {
            cep: true,
            street: true,
            number: true,
            city: true,
            state: true,
            complement: true
          }
        }
      }
    })
    return { status: 200, data: userUpdated }
  }
}

export { UserUpdateService }