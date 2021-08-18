/* eslint-disable no-underscore-dangle */
import { FC, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import io, { Socket } from 'socket.io-client';

import config from '@messaging/config';
import { ChatInput } from '@messaging/components/ChatInput';
import { ChatMessage } from '@messaging/components/ChatMessage';
import { ConversationService } from '@messaging/services/api';
import { IConversation, IUser } from '@messaging/models';
import { selectAccessToken, selectUser } from '@messaging/redux/slices';

type Props = {
  conversation: IConversation;
};

const getConversationTitle = (participants: IUser[], self: IUser) => {
  return participants.find(p => p._id !== self.id).name;
};

export const ConversationDetails: FC<Props> = (props: Props) => {
  const { conversation } = props;

  const socket = useRef<Socket>(null);

  const user = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);

  const title = useMemo(() => getConversationTitle(conversation.participants, user), [conversation.participants, user]);

  const messages = useQuery(['messages', conversation?.id], () =>
    ConversationService.getConversationMessages(conversation.id)
  );

  const handleChatInput = async (content: string) => {
    try {
      if (socket.current) {
        socket.current.emit('newMessage', {
          conversationId: conversation.id,
          content,
        });
      }

      messages.refetch();
    } catch {
      console.log('failed to post message');
    }
  };

  useEffect(() => {
    socket.current = io(config.app.apiServer, {
      auth: {
        token: accessToken,
      },
    });

    socket.current.on('newMessage', msg => {
      messages?.data?.push(msg);
    });

    return () => {
      socket.current.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center mt-4 ml-3">
        <div className="w-12 h-12 rounded-full bg-rose-500 text-white text-2xl flex items-center justify-center">
          {title.charAt(0)}
        </div>
        <span className="ml-3 text-rose-800 text-2xl">{title}</span>
      </div>

      <div className="mx-6">
        {messages?.data?.map(msg => (
          <ChatMessage key={msg.id} message={msg} className={msg.from === user.id ? 'ml-auto' : 'mr-auto'} />
        ))}
      </div>

      <ChatInput onChatSubmit={handleChatInput} className="max-w-full mx-10 mt-auto mb-8" />
    </div>
  );
};
