import { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Input } from '@messaging/molecules';
import { AuthService } from '@messaging/services/api';
import { authSuccessful } from '@messaging/redux/slices';
import { getErrorMessage } from '@messaging/utils/error-helper';

import './signup.scss';

export const SignupPage: FC = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: { name: string; email: string; username: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const signupResult = await AuthService.signup(values);

      dispatch(authSuccessful({ ...signupResult.data }));
      history.replace('/');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-content">
        <div className="signup-card card bg-blue-400 shadow-lg">
          <figure className="signup-card-header text-purple-800">
            <h2 className="mb-4 font-bold text-xl">Welcome !</h2>
            <span>Sign up to gain access.</span>
          </figure>
          <div className="signup-form">
            <div className="w-full ">
              <form className="bg-white  px-12 pt-10 pb-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                  <Input label="Name" type="text" placeholder="Enter your name" required {...register('name')} />
                </div>

                <div className="mb-6">
                  <Input
                    label="Username"
                    type="text"
                    placeholder="Choose a username"
                    required
                    {...register('username')}
                  />
                </div>

                <div className="mb-6">
                  <Input label="Email" type="email" placeholder="Enter your email" required {...register('email')} />
                </div>

                <div className="mb-6">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...register('password')}
                    required
                  />
                </div>

                {error && <div className="text-red-600">{error}</div>}

                <button
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 mt-10 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={loading}>
                  {loading ? 'Loading...' : 'Signup'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <footer className="place-self-center flex flex-col items-center">
          <div className="text-gray-600">
            Already logged in?
            <Link to="/signup" className="text-blue-600 pl-2 hover:text-blue-800  hover:underline">
              Login to your account!
            </Link>
          </div>
          <a
            className="mt-2 text-sm text-gray-500 hover:text-gray-700 hover:underline"
            href="https://github.com/Arman92/MessagingApp">
            @2021 MERN stack messaging app
          </a>
        </footer>
      </div>
    </div>
  );
};
