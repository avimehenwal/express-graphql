import { prisma } from './index'

export class UserModelService {
  static async getAllUsers() {
    return await prisma.user.findMany({ include: { profile: true } })
  }
  static async getUserById(id: string) {
    return await prisma.user.findUnique({ where: { userId: parseInt(id) }, include: { profile: true } })
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
}