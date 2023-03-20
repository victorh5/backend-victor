import { PrismaClient } from '@prisma/client'
import { roleSeed } from './seed/role'
import { userSeed } from './seed/user'

const prisma = new PrismaClient()

async function run() {
  await roleSeed()
  await userSeed()
}
run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })