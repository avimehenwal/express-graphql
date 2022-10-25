import { prisma } from './index'

export const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany({ include: { profile: true } })
    },
    user: async (_, args) => {
      return await prisma.user.findUnique({ where: { userId: parseInt(args.id) }, include: { profile: true } })
    }
  },
};
