import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { LoginPage } from '@messaging/containers';
import { PrivateRoute } from '@messaging/components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={LoginPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
