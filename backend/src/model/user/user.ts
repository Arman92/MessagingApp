import { Types } from 'mongoose';

import { UserModel } from './user-model';
import { IUserModel } from './user-type';

export class User {
  /**
   * Fetches the User that has the corresponding ID
   *
   * @param userId - The User's ID to look for
   * @returns The User fetched from database
   */
  public static async getUserById(
    userId: string | Types.ObjectId
  ): Promise<IUserModel | null> {
    return UserModel.findById(userId).exec();
  }

  /**
   * Fetches the User that has the corresponding Email
   *
   * @param email - The User's email to look for
   * @returns The User fetched from database
   */
  public static async getUserByEmail(
    email: string
  ): Promise<IUserModel | null> {
    return UserModel.findOne({ email }).exec();
  }
}
