import Navbar from './Navbar';
import Home from './Home';
import NotFound from './NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

function App() {

  const [walletAddress, setWallet] = useState("");

  return (
    <Router>
      <div className="App">
      <Navbar 
      setWallet={setWallet}
      />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
      </div>
    </Router>
  );
}

export default App;
