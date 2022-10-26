import { prisma } from './index'
import { GraphQLError } from 'graphql';

function authorizationCheck(context) {
  if (!context.auth || !context.token) {
    throw new GraphQLError('You are not authorized to perform this action.', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }
}

export const authResolvers = {
  Query: {
    users: async (parent, args, context, info) => {
      authorizationCheck(context)
      return await prisma.user.findMany({ include: { profile: true } })
    },
    user: async (_, args, context) => {
      authorizationCheck(context)
      return await prisma.user.findUnique({ where: { userId: parseInt(args.id) }, include: { profile: true } })
    }
  },
  Mutation: {
    updateUserLocation: async (_, args, context) => {
      authorizationCheck(context)
      const data = await prisma.profile.update({
        where: { userId: parseInt(args.userId) },
        data: { location: args.newLocation }
      })
      // console.dir(data)
      return data
    }
  }
};
