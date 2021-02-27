import {Fragment, useEffect} from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
//import CreateBank from "./components/forms/CreateBank";
import Mortgages from "./components/mortgage/Mortgages";
import AddLoan from "./components/forms/AddLoan";
import PrivateRoute from "./components/routing/PrivateRoute";

import { loadUser } from './actions/auth'
import setAuthToken from "./utils/setAuthToken";

//Redux
import {Provider} from 'react-redux'
import store from './store'
import CreateBank from "./components/forms/CreateBank";


if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(()=> {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path ='/' component={Landing}/>
          <section className={'container'}>
            <Alert />
            <Switch>
              <Route exact path={'/register'} component={Register}/>
              <Route exact path={'/login'} component={Login}/>
              <PrivateRoute exact path={'/dashboard'} component={Dashboard}/>
              <PrivateRoute exact path={'/create-bank'} component={CreateBank}/>
              {/*<PrivateRoute exact path={'/edit-profile'} component={CreateProfile}/>*/}
              <PrivateRoute exact path={'/add-loan'} component={AddLoan}/>
              <PrivateRoute exact path={'/banks'} component={Mortgages}/>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
