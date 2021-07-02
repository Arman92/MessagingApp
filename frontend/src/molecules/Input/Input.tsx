import React from 'react';

type Props = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { label, ...rest } = props;

  return (
    <>
      <label className="block text-gray-600 text-md font-normal mb-1" htmlFor={props.id}>
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ref={ref}
        {...rest}
      />
    </>
  );
});
