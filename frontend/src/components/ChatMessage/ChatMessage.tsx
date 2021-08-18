import { FC } from 'react';
import cl from 'clsx';

import { IMessage } from '@messaging/models';

type Props = {
  message: IMessage;
  className?: string;
};

export const ChatMessage: FC<Props> = ({ message, className }) => {
  return (
    <div className={cl(className, 'w-min max-w-md rounded-md text-md bg-indigo-300 text-indigo-900 my-4 py-2 px-4')}>
      {message.content}
    </div>
  );
};
