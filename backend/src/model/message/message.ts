import { Types } from 'mongoose';

import { MessageModel } from './message-model';
import { IMessageModel } from './message-type';

export class Message {
  /**
   * Fetches the Message that has the corresponding ID
   *
   * @param messageId - The Message's ID to look for
   * @returns The Message fetched from database
   */
  public static async getMessageById(
    messageId: string | Types.ObjectId
  ): Promise<IMessageModel | null> {
    return MessageModel.findById(messageId).exec();
  }

  /**
   * Fetches All Messages of conversation
   *
   * @param conversationId - id of target conversation
   * @returns List of all messages corresponding to the conversation
   */
  public static async getAllMessagesOfConversation(
    conversationId: string
  ): Promise<IMessageModel[]> {
    return MessageModel.find({
      conversation: Types.ObjectId(conversationId),
    }).exec();
  }

  /**
   * Returns all messages of conversation count
   *
   * @param conversationId - id of target conversation
   * @returns Count of all messages
   */
  public static async getAllMessagesOfConversationCount(
    conversationId: string
  ): Promise<number> {
    return MessageModel.countDocuments({
      conversation: Types.ObjectId(conversationId),
    }).exec();
  }

  /**
   * Fetches Messages with pagination
   *
   * @param conversationId - id of target conversation
   * @param start - start index
   * @param count - (max) count of records to return
   * @param sort - sort by column
   * @param sortType - sort order, 1 for asc, 0 for desc
   * @returns List of messages of this user with pagination
   */
  public static async getMessagesOfConversation(
    conversationId: string,
    start: number,
    count: number,
    sort: string,
    sortType: number
  ): Promise<IMessageModel[]> {
    return MessageModel.find({
      conversation: Types.ObjectId(conversationId),
    })
      .skip(start)
      .limit(count)
      .sort({ [sort]: sortType })
      .exec();
  }

  /**
   * Creates a new message
   *
   * @param fromUserId - id of sender user
   * @param conversationId - id of conversation
   * @param content - text content
   * @returns The Created Message or null
   */
  public static async createMessage(messageInfo: {
    fromUserId: string;
    conversationId: string;
    content: string;
  }): Promise<IMessageModel | null> {
    return MessageModel.create({
      from: Types.ObjectId(messageInfo.fromUserId),
      conversation: Types.ObjectId(messageInfo.conversationId),
      content: messageInfo.content,
    });
  }

  /**
   * Finds and updates message
   *
   * @param id - the message's id to update
   * @param content - new content
   * @returns The modified Message or null if message does not exist
   */
  public static async updateMessage(
    id: string | Types.ObjectId,
    content: string
  ): Promise<IMessageModel | null> {
    return MessageModel.findByIdAndUpdate(
      id,
      { $set: { content } },
      { new: true, useFindAndModify: false }
    ).exec();
  }
}
