import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IConversation } from '@messaging/models';
import { selectActiveConversation, setActiveConversation } from '@messaging/redux/slices';
import { ConversationListItem } from './ConversationListItem';

type Props = {
  conversations: IConversation[];
};

export const ConversationList: FC<Props> = props => {
  const { conversations } = props;
  const activeConversation = useSelector(selectActiveConversation);
  const dispatch = useDispatch();

  const handleConversationSelected = (conversationId: string) => {
    dispatch(setActiveConversation(conversations.find(c => c.id === conversationId)));
  };

  return (
    <div className="w-full mt-4">
      {conversations?.map(c => (
        <ConversationListItem
          key={c.id}
          participants={c.participants}
          conversationId={c.id}
          active={activeConversation && activeConversation.id === c.id}
          onClick={handleConversationSelected}
        />
      ))}
    </div>
  );
};
