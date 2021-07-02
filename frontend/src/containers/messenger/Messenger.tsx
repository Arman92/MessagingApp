import { FC, useState } from 'react';
import { useQuery } from 'react-query';

import { ConversationService } from '@messaging/services/api/conversation';
import { ConversationList } from '@messaging/components/ConversationList';
import { NewConversationModal } from './components/NewConversationModal';

import './messenger.scss';

export const MessengerPage: FC = () => {
  const conversations = useQuery('conversations', ConversationService.getConversationList);
  const [newConversationModalOpen, setNewConversationModalOpen] = useState(false);

  const toggleNewConversationModal = () => {
    setNewConversationModalOpen(!newConversationModalOpen);
  };

  const handleConversationCreated = () => {
    toggleNewConversationModal();
    conversations.refetch();
  };

  return (
    <div className="messenger-page shadow-md">
      <div className="conversations-container">
        <NewConversationModal
          isOpen={newConversationModalOpen}
          onClose={toggleNewConversationModal}
          onConversationCreated={handleConversationCreated}
        />
        <button
          className="w-10/12 mx-10 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded mt-3"
          type="button"
          onClick={toggleNewConversationModal}>
          Start new conversation
        </button>
        <ConversationList conversations={conversations.data} />
      </div>
      <div className="chat-container">sadfas</div>
    </div>
  );
};
