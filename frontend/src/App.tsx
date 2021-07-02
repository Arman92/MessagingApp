import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useSelector } from 'react-redux';

import { LoginPage, SignupPage, MessengerPage } from '@messaging/containers';
import { PrivateRoute } from '@messaging/components/PrivateRoute/PrivateRoute';
import { setInterceptors } from '@messaging/services/api/interceptors';
import { selectAccessToken } from '@messaging/redux/slices';

const queryClient = new QueryClient();

function App() {
  const accessToken = useSelector(selectAccessToken);
  setInterceptors(accessToken);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <PrivateRoute exact path="/" component={MessengerPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
        </Switch>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
