import { FC } from 'react';

import { Input, Modal } from '@messaging/molecules';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export const NewConversationModal: FC<Props> = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-5 pt-10 pb-6 w-screen max-w-xl">
        <Input label="Participant" placeholder="enter participant's email or username" />
      </div>
    </Modal>
  );
};
