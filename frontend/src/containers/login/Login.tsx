import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Input } from '@messaging/molecules';
import { AuthService } from '@messaging/services/api';
import { authSuccessful } from '@messaging/redux/slices';
import { getErrorMessage } from '@messaging/utils/error-helper';

import './login.scss';

export const LoginPage: FC = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (values: { username: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const loginResult = await AuthService.login({
        emailOrUsername: values.username,
        password: values.password,
      });

      dispatch(authSuccessful({ ...loginResult.data }));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-card card bg-blue-400 shadow-lg">
          <figure className="login-card-header text-purple-800">
            <h2 className="mb-4 font-bold text-3xl">Welcome Back !</h2>
            <h4 className="font-thin">Sign in to continue</h4>
          </figure>
          <div className="login-form">
            <div className="w-full ">
              <form className="bg-white  px-12 pt-10 pb-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                  <Input
                    label="Username"
                    id="text"
                    type="text"
                    placeholder="Enter your username or email"
                    required
                    {...register('username')}
                  />
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
                  {loading ? 'Loading...' : 'Log In'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <footer className="place-self-center flex flex-col items-center">
          <div className="text-gray-600">
            Don&apos;t have an account yet?
            <Link to="/signup" className="text-blue-600 pl-2 hover:text-blue-800  hover:underline">
              Signup now!
            </Link>
          </div>
          <a
            className="mt-2 text-lg text-gray-500 hover:text-gray-700 hover:underline"
            href="https://github.com/Arman92/MessagingApp">
            @2021 MERN stack messaging app
          </a>
        </footer>
      </div>
    </div>
  );
};
