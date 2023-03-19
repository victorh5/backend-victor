import { prisma } from '../../lib/prisma'
import { app } from '../../server'

interface IAuthenticateRequest {
  email: string;
  password: string;
}
class UserAuthenticateService {
  async execute({ email, password }: IAuthenticateRequest) {
    const user = await prisma.user.findFirst({ where: { email } })
    if (!user) return { status: 401, data: 'E-mail/Senha incorretos!' }
    const passwordMatch = await app.bcrypt.compare(password, user.password)
    if (!passwordMatch) return { status: 401, data: 'E-mail/Senha incorretos!' }
    const token = app.jwt.sign(
      { email: user.email },
      { sub: user.id, expiresIn: '30m' }
    )
    return { status: 200, data: token }
  }
}

export {UserAuthenticateService}