import { ProfileModelService, UserModelService } from './dataService';

export const resolvers = {
  Query: {
    users: async () => {
      return await UserModelService.getAllUsers()
    },
    user: async (_, args) => {
      return await UserModelService.getUserById(args.id)
    },
    profiles: async () => {
      return await ProfileModelService.getAllProfiles()
    },
    profile: async (_, args) => {
      return await ProfileModelService.getProfileById(args.id)
    }
  },
  Mutation: {
    updateUserLocation: async (_, args) => {
      return await ProfileModelService.updateLocation(args.userId, args.newLocation)
    }
  }
};
