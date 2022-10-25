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
  Mutation: {
    updateUserLocation: async (_, args) => {
      // console.dir(args, { depth: null })
      const data = await prisma.profile.update({
        where: { userId: parseInt(args.userId) },
        data: { location: args.newLocation }
      })
      // console.dir(data)
      return data
    }
  }
};
