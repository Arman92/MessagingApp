import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import cl from 'clsx';

import { IUser } from '@messaging/models';
import { selectUser } from '@messaging/redux/slices';

type Props = {
  active: boolean;
  participants: IUser[];
  conversationId: string;
  onClick: (conversationId: string) => void;
};

const getConversationTitle = (participants: IUser[], self: IUser) => {
  return participants.find(p => p.id !== self.id);
};

export const ConversationListItem: FC<Props> = props => {
  const { active, participants, conversationId, onClick } = props;
  const user = useSelector(selectUser);

  const otherParticipant = useMemo(() => getConversationTitle(participants, user), [participants, user]);

  const handleOnClick = () => {
    onClick(conversationId);
  };

  return (
    <div
      className={cl(
        'flex w-full flex-row items-center p-5 rounded-sm hover:bg-green-200 cursor-pointer transition-colors',
        active && 'bg-purple-300'
      )}
      onClick={handleOnClick}>
      <div className="w-10 h-10 rounded-full bg-purple-400 text-md flex items-center justify-center">
        {otherParticipant.name.charAt(0)}
      </div>

      <span className="ml-3">{otherParticipant.name}</span>
    </div>
  );
};
