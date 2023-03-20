import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const firstUserId = '0730ffac-d039-4194-9884-01aa2aa0efbd'
const secondUserId = '00880d75-a933-4fef-94hu-e05744435297'
const thirdUserId = 'fa1a1bcf-3d87-4626-83do-d7fd1255ac00'

export async function roleSeed() {
  await prisma.role.deleteMany()
  
  await Promise.all([
    await prisma.role.create({
      data: {
        id: firstUserId,
        type: 'Administrador',
        createdAt: new Date('2023-01-19T03:00:00.000z')
      }
    }),
    await prisma.role.create({
      data: {
        id: secondUserId,
        type: 'Funcionário',
        createdAt: new Date('2023-01-19T04:00:00.000z')
      }
    }),
    await prisma.role.create({
      data: {
        id: thirdUserId,
        type: 'Cliente',
        createdAt: new Date('2023-01-19T05:00:00.000z')
      }
    })
  ])
}