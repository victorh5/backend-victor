import { PrismaClient } from '@prisma/client'
import { app } from '../../src/server'
const prisma = new PrismaClient()

const firstUserId = '0730ffac-d039-4194-9571-01aa2aa0efbd'
const secondUserId = '00880d75-a933-4fef-94ab-e05744435297'
const thirdUserId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00'
const fourthUserId = 'fb2c2bcf-3d87-4626-8c0d-d7fd1255ac00'
  
export async function userSeed () {
  await prisma.user.deleteMany()
  await Promise.all([
    await prisma.user.create({
      data: {
        id: firstUserId,
        name: 'Victor Hugo',
        email: 'victorh5900@gmail.com',
        password: await app.bcrypt.hash('victor10'),
        address: {
          create: {
            cep: '79034-240',
            street: 'Rua Jorge Pedro Bedoglim',
            number: 1282,
            city: 'Campo Grande',
            state: 'Mato Grosso do Sul',
            complement: 'Casa de portão branco'
          }
        },
        role: { connect: { id: '0730ffac-d039-4194-9884-01aa2aa0efbd' } },
        phone: {
          create: {
            number: '(67) 98159-6482'
          }
        },
        profile_image: 'https://media.licdn.com/dms/image/C4E03AQHm_uwAoZK03Q/profile-displayphoto-shrink_200_200/0/1616996718950?e=1684972800&v=beta&t=vYRDnFlv4VOffM_q0m97xhELQTq-qM-vKYjMNc1q84A',
        createdAt: new Date('2023-01-19T03:00:00.000z')
      }
    }),
    await prisma.user.create({
      data: {
        id: secondUserId,
        name: 'Matheus Gonçalves Rojas',
        email: 'matheus.jmv@gmail.com',
        password: await app.bcrypt.hash('matheus10'),
        address: {
          create: {
            cep: '79034-240',
            street: 'Rua Jorge Pedro Bedoglim',
            number: 1282,
            city: 'Campo Grande',
            state: 'Mato Grosso do Sul',
            complement: 'Casa de portão branco'
          }
        },
        role: { connect: { id: '0730ffac-d039-4194-9884-01aa2aa0efbd' } },
        phone: {
          create: {
            number: '(67) 94523-5748'
          }
        },
        profile_image: 'https://media.licdn.com/dms/image/C4D03AQG6WDtECJcurw/profile-displayphoto-shrink_800_800/0/1646792799268?e=2147483647&v=beta&t=z5hP3Me-bzwhWJ3tXKZTvT99oB81kzSJo0LPwsY9BTI',
        createdAt: new Date('2023-01-19T03:00:00.000z')
      }
    }),
    await prisma.user.create({
      data: {
        id: thirdUserId,
        name: 'Juliano Maciel de Lima',
        email: 'juliano1525@gmail.com',
        password: await app.bcrypt.hash('juliano10'),
        address: {
          create: {
            cep: '79034-240',
            street: 'Rua Jorge Pedro Bedoglim',
            number: 1282,
            city: 'Campo Grande',
            state: 'Mato Grosso do Sul',
            complement: 'Casa de portão branco'
          }
        },
        role: { connect: { id: '0730ffac-d039-4194-9884-01aa2aa0efbd' } },
        phone: {
          create: {
            number: '(67) 95826-6935'
          }
        },
        profile_image: 'https://static.cdninstagram.com/rsrc.php/v3/yx/r/H1l_HHqi4p6.png',
        createdAt: new Date('2023-01-19T03:00:00.000z')
      }
    }),
    await prisma.user.create({
      data: {
        id: fourthUserId,
        name: 'Jucilene Gonçalves Mendes Maciel',
        email: 'jucilene.maciel@gmail.com',
        password: await app.bcrypt.hash('jucilene10'),
        address: {
          create: {
            cep: '79034-240',
            street: 'Rua Jorge Pedro Bedoglim',
            number: 1282,
            city: 'Campo Grande',
            state: 'Mato Grosso do Sul',
            complement: 'Casa de portão branco'
          }
        },
        role: { connect: { id: '0730ffac-d039-4194-9884-01aa2aa0efbd' } },
        phone: {
          create: {
            number: '(67) 99900-2057'
          }
        },
        profile_image: 'https://www.enfoquems.com.br/wp-content/uploads/2021/08/559809c3-9d9a-448a-a43d-ec5bca35adc8-1024x682.jpg',
        createdAt: new Date('2023-01-19T03:00:00.000z')
      }
    })
  ])
}
