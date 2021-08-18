import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { selectUser } from '@messaging/redux/slices';

interface IProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
}
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  const user = useSelector(selectUser);

  return (
    <Route
      {...rest}
      render={props => {
        if (!user) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }

        return <Component {...props} />;
      }}
    />
  );
};
