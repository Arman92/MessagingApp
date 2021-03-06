import { Router, Request, Response, NextFunction } from 'express';

import { authGuard } from '@messaging/middleware/auth-guard';
import { Conversation, Message, User } from '@messaging/model';
import { NotFoundError } from './api-errors';

const conversationRouter = Router();

conversationRouter.get(
  '/list',
  authGuard,
  async (req: Request, res: Response) => {
    const userId = req.context.userId;

    const conversations = await Conversation.getAllConversationsOfUser(userId);

    res.status(200).send(conversations);
  }
);

// Create a new conversation
conversationRouter.post(
  '/',
  authGuard,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.context.userId;

    const { title, usernameOrEmail } = req.body as {
      title: string;
      usernameOrEmail: string;
    };

    const participantUser =
      (await User.getUserByEmail(usernameOrEmail.toLowerCase())) ||
      (await User.getUserByUsername(usernameOrEmail.toLowerCase()));
    if (!participantUser) {
      return next(new NotFoundError('Participant user not found!'));
    }

    const participantIds = [userId, participantUser.id];

    const conversation = await Conversation.createConversation({
      title,
      participantIds,
    });

    res.status(200).send(conversation);
  }
);

// Get messages in a conversation
conversationRouter.get(
  '/:conversationId/messages',
  authGuard,
  async (req: Request, res: Response) => {
    const { conversationId } = req.params;

    // TODO: should check to only get conversations related to the user
    // otherwise everyone can read other person's messages
    const conversations = await Message.getAllMessagesOfConversation(
      conversationId
    );

    res.status(200).send(conversations);
  }
);

// Create new message in a conversation
conversationRouter.post(
  '/:conversationId/message',
  authGuard,
  async (req: Request, res: Response, next: NextFunction) => {
    const { conversationId } = req.params;
    const { userId } = req.context;

    const { content } = req.body;

    try {
      // TODO: should check to only send message to conversations related to the user
      const conversations = await Message.createMessage({
        conversationId,
        content,
        fromUserId: userId,
      });

      res.status(200).send(conversations);
    } catch (err) {
      return next(new NotFoundError('Conversation not found!', { err }));
    }
  }
);

export { conversationRouter };
