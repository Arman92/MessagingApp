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

  /**
   * Fetches the User that has the corresponding Username
   *
   * @param username - The User's username to look for
   * @returns The User fetched from database
   */
  public static async getUserByUsername(
    username: string
  ): Promise<IUserModel | null> {
    return UserModel.findOne({ username }).exec();
  }

  /**
   * Fetches All Users
   *
   * @returns List of all users on database
   */
  public static async getAllUsers(): Promise<IUserModel[]> {
    return UserModel.find().exec();
  }

  /**
   * Returns all users count
   *
   * @returns Count of all users
   */
  public static async getAllUsersCount(): Promise<number> {
    return UserModel.countDocuments().exec();
  }

  /**
   * Fetches Users with pagination
   *
   * @param start - start index
   * @param count - (max) count of records to return
   * @param sort - sort by column
   * @param sortType - sort order, 1 for asc, 0 for desc
   * @returns List of users on database with pagination
   */
  public static async getUsers(
    start: number,
    count: number,
    sort: string,
    sortType: number
  ): Promise<IUserModel[]> {
    return UserModel.find()
      .skip(start)
      .limit(count)
      .sort({ [sort]: sortType })
      .exec();
  }

  /**
   * Creates a new users
   *
   * @param email - Email address of user
   * @param name - User's Name
   * @param lastName - User's Last Name
   * @param password - Password for authentication
   * @returns The Created User or null if the email was a duplicate
   */
  public static async createUser(userInfo: {
    email?: string;
    name: string;
    username: string;
    password: string;
  }): Promise<IUserModel | null> {
    return UserModel.create(userInfo);
  }

  /**
   * Finds and updates user
   *
   * @param id - The User's id to update
   * @param name - New Name
   * @returns The modified User or null if user does not exist
   */
  public static async updateUser(
    id: string | Types.ObjectId,
    name: string
  ): Promise<IUserModel | null> {
    return UserModel.findByIdAndUpdate(
      id,
      { $set: { name } },
      { new: true, useFindAndModify: false }
    ).exec();
  }
}
