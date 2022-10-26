import { prisma } from './index'

export class UserModelService {
  static async getAllUsers() {
    return await prisma.user.findMany({ include: { profile: true } })
  }
  static async getUserById(id: string) {
    return await prisma.user.findUnique({ where: { userId: parseInt(id) }, include: { profile: true } })
  }
  static async createNewUser(userData) {
    return await prisma.user.create({
      data: {
        name: userData.name,
        lastName: userData.lastName,
        dob: new Date(userData.dob),
        userId: userData.userId
      }
    })
  }
}

export class ProfileModelService {
  static async getAllProfiles() {
    return await prisma.profile.findMany({ include: { user: true } })
  }
  static async getProfileById(id: string) {
    return await prisma.profile.findUnique({ where: { userId: parseInt(id) }, include: { user: true } })
  }
  static async updateLocation(userId, newLocation) {
    return await prisma.profile.update({
      where: { userId: parseInt(userId) },
      data: { location: newLocation }
    })
  }
  static async createNewProfile(profileData) {
    return await prisma.profile.create({
      data: {
        location: profileData.location,
        user: {
          connect: {
            userId: parseInt(profileData.userId),
          }
        }
      },
    })
  }
}