import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { LoginPage, SignupPage } from '@messaging/containers';
import { PrivateRoute } from '@messaging/components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={LoginPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
