import { app } from '../../server'
import { prisma } from '../../lib/prisma'

interface IUserInsert {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  roleId: string
}

class UserInsertService {
  async execute ({ name, email, password, confirmPassword, phone, roleId }: IUserInsert) {
    if (password !== confirmPassword) return { status: 400, data: 'Senhas não coincidem!'}
    const emailAlreadyRegistered = await prisma.user.findFirst({ where: { email } })
    if (emailAlreadyRegistered) return { status: 400, data: 'E-mail já cadastrado no sistema! Tente outro :)' }

    const hashPassword = await app.bcrypt.hash(password)
    
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        phone: {
          create: {
            number: phone
          }
        },
        roleId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })
    return { status: 201, data: newUser }
  }
}

export { UserInsertService }