import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import cl from 'clsx';

type Props = {
  className?: string;
  onChatSubmit: (text: string) => void;
};

export const ChatInput: FC<Props> = (props: Props) => {
  const { className, onChatSubmit } = props;
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (values: { content: string }) => {
    onChatSubmit(values.content);

    reset();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cl('relative', className)}>
      <input
        type="text"
        placeholder="Write Something"
        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
        required
        {...register('content')}
      />
      <button
        type="button"
        className={cl(
          'inline-flex items-center justify-center',
          'rounded-full h-10 w-10 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none',
          'absolute right-8 top-1'
        )}
        disabled={loading}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-6 w-6 transform rotate-90">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </form>
  );
};
