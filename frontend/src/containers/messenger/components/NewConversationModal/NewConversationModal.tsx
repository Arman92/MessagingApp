import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input, Modal } from '@messaging/molecules';
import { ConversationService } from '@messaging/services/api';
import { getErrorMessage } from '@messaging/utils/error-helper';
import { IConversation } from '@messaging/models';

type Props = {
  isOpen: boolean;
  onConversationCreated: (conversation: IConversation) => void;
  onClose: () => void;
};
export const NewConversationModal: FC<Props> = ({ isOpen, onConversationCreated, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (values: { usernameOrEmail: string }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await ConversationService.startConversation(values);

      onConversationCreated(result);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-5 pt-10 pb-6 w-screen max-w-xl">
        <Input
          label="Participant"
          placeholder="enter participant's email or username"
          {...register('usernameOrEmail')}
        />

        {error && <span className="text-red-500 text-sm mt-2">{error}</span>}

        <button
          className="ml-auto mt-5 py-2 px-5 rounded-md bg-emerald-800 text-white"
          type="submit"
          disabled={loading}>
          {loading ? 'Loading...' : 'Start conversation!'}
        </button>
      </form>
    </Modal>
  );
};
