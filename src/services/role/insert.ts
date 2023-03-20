import { app } from '../../server'
import { prisma } from '../../lib/prisma'

class RoleInsertService {
  async execute (type: string) {
    const roleAlreadyRegistered = await prisma.role.findFirst({ where: { type } })
    if (roleAlreadyRegistered) return { status: 400, data: 'Tipo de usuário já existente' }
    const newRole = await prisma.role.create({
      data: {
        type
      }
    })
    return { status: 201, data: newRole }
  }
}

export { RoleInsertService }