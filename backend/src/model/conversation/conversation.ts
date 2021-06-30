import { Types } from 'mongoose';

import { ConversationModel } from './conversation-model';
import { IConversationModel } from './conversation-type';

export class Conversation {
  /**
   * Fetches the Conversation that has the corresponding ID
   *
   * @param conversationId - The Conversation's ID to look for
   * @returns The Conversation fetched from database
   */
  public static async getConversationById(
    conversationId: string | Types.ObjectId
  ): Promise<IConversationModel | null> {
    return ConversationModel.findById(conversationId).exec();
  }

  /**
   * Fetches All Conversations of user
   *
   * @returns List of all conversations on database
   */
  public static async getAllConversationsOfUser(): Promise<
    IConversationModel[]
  > {
    return ConversationModel.find().exec();
  }

  /**
   * Returns all conversations of user count
   *
   * @returns Count of all conversations
   */
  public static async getAllConversationsOfUserCount(): Promise<number> {
    return ConversationModel.countDocuments().exec();
  }

  /**
   * Fetches Conversations with pagination
   *
   * @returns List of all conversations on database
   */
  public static async getConversationsOfUser(
    start: number,
    count: number,
    sort: string,
    sortType: number
  ): Promise<IConversationModel[]> {
    return ConversationModel.find()
      .skip(start)
      .limit(count)
      .sort({ [sort]: sortType })
      .exec();
  }

  /**
   * Creates a new conversation
   *
   * @param title - Title for this conversation
   * @param participantIds - Array of ObjectIDs of users in this conversation
   * @returns The Created Conversation or null
   */
  public static async createConversation(conversationInfo: {
    title?: string;
    participantIds: string[];
  }): Promise<IConversationModel | null> {
    return ConversationModel.create({
      title: conversationInfo.title,
      participants: conversationInfo.participantIds,
    });
  }

  /**
   * Finds and updates conversation
   *
   * @param id - The Conversation's id to update
   * @param title - New title
   * @returns The modified Conversation or null if conversation does not exist
   */
  public static async updateConversation(
    id: string | Types.ObjectId,
    title: string
  ): Promise<IConversationModel | null> {
    return ConversationModel.findByIdAndUpdate(
      id,
      { $set: { title } },
      { new: true, useFindAndModify: false }
    ).exec();
  }
}
