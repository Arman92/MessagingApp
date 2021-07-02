import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import cl from 'clsx';

import { IUser } from '@messaging/models';
import { selectUser } from '@messaging/redux/slices';

type Props = {
  active: boolean;
  participants: IUser[];
};

const getConversationTitle = (participants: IUser[], self: IUser) => {
  return participants.find(p => p.id !== self.id);
};

export const ConversationListItem: FC<Props> = props => {
  const { active, participants } = props;
  const user = useSelector(selectUser);

  const otherParticipant = useMemo(() => getConversationTitle(participants, user), [participants, user]);

  return (
    <div>
      <div className={cl('flex flex-row items-center p-5 rounded-sm', active && 'bg-purple-300')}>
        <div className="w-32 h-32 rounded-full bg-purple-400 text-9xl">{otherParticipant.name.charAt(0)}</div>

        <span className="ml-3">{otherParticipant.name}</span>
      </div>
    </div>
  );
};
