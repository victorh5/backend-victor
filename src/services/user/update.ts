import { prisma } from '../../lib/prisma'

interface IUserUpdate {
  id: string
  name?: string
  email?: string
  phone?: string
  roleId?: string
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
    await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        roleId: data.roleId,
        phone: {
          update: { number: data.phone }
        },
        address: {
          update: data.address
        }
      }
    })
    return { status: 204, data: 'Informações do usuário atualizadas com sucesso!' }
  }
}

export { UserUpdateService }