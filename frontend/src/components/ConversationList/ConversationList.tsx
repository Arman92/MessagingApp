import { FC } from 'react';

import { IConversation } from '@messaging/models';
import { ConversationListItem } from './ConversationListItem';

type Props = {
  conversations: IConversation[];
};

export const ConversationList: FC<Props> = props => {
  const { conversations } = props;

  return (
    <div>
      {conversations?.map(c => (
        <ConversationListItem key={c.id} participants={c.participants} active={false} />
      ))}
    </div>
  );
};
