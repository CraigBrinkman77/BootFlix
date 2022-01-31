import './App.css';
import Home from './views/Home';
import EditUser from './views/EditUser';
import SignUp from './views/SignUp';
import Login from './views/Login';
import {BrowserRouter, Switch, Route} from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
            <Route exact path="/home">
              <Home/>
            </Route>
            <Route exact path="/edit/user/:id">
              <EditUser/>
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>


            <Route exact path="/signup">
              <SignUp />
            </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;