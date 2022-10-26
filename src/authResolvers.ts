import { GraphQLError } from 'graphql';
import { ProfileModelService, UserModelService } from './dataService';
import { IContext } from './index';

function authorizationCheck(context: IContext) {
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
      return await UserModelService.getAllUsers()
    },
    user: async (_, args, context) => {
      authorizationCheck(context)
      return await UserModelService.getUserById(args.id)
    },
    profiles: async (_, args, context) => {
      authorizationCheck(context)
      return await ProfileModelService.getAllProfiles()
    },
    profile: async (_, args, context) => {
      authorizationCheck(context)
      return await ProfileModelService.getProfileById(args.id)
    }
  },
  Mutation: {
    updateUserLocation: async (_, args, context) => {
      authorizationCheck(context)
      return ProfileModelService.updateLocation(args.userId, args.newLocation)
    },
    createUser: async (_, args, context) => {
      authorizationCheck(context)
      return await UserModelService.createNewUser(args.userData)
    },
    createProfile: async (_, args, context) => {
      authorizationCheck(context)
      return await ProfileModelService.createNewProfile(args.profileData)
    }
  }
};
