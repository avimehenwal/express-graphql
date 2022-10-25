import { prisma } from './index'

export const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany()
    },
    user: async (_, args) => {
      return await prisma.user.findUnique({ where: { userId: parseInt(args.id) } })
    }
  },
};
