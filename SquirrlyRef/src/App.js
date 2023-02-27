import Navbar from './Navbar';
import Home from './Home';
import NotFound from './NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

//ETH Denver 2023

function App() {

  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  return (
    <Router>
      <div className="App">
      <Navbar 
        walletAddress={walletAddress}
        status={status}
        setWallet={setWallet}
        setStatus={setStatus}
      />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home 
              walletAddress={walletAddress}
              status={status}
            />
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
