import { PrismaClient } from '@prisma/client'
import { profile } from 'console'

const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { userId: 1 },
    update: {},
    create: {
      dob: new Date(1960, 8, 24),
      name: 'Alice',
      lastName: 'Wonderland',
      profile: {
        create: {
          location: 'usa'
        },
      },
    },
  })
  const avi = await prisma.user.upsert({
    where: { userId: 2 },
    update: {},
    create: {
      dob: new Date(1999, 3, 12),
      name: 'Avi',
      lastName: 'Mehenwal',
      profile: {
        create: {
          location: 'germany'
        },
      },
    },
  })
  console.log({ alice, avi })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
