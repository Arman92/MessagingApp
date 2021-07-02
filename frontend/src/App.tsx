import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { LoginPage } from '@messaging/containers';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
