import {BrowserRouter as Router,Route, Switch } from 'react-router-dom'
import dashboard from '../src/components/Dashboard/dashboard';
import addUserDetails from './components/addUserDetails/addUserDetails';
import viewUserDetails from './components/viewUserDetails/viewUserDetails';
import updateUserDetails from './components/updateUserDetails/updateUserDetails';
//import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={dashboard}/>
          <Route exact path='/add-user' component={addUserDetails}/>
          <Route exact path='/view-user/:id' component={viewUserDetails}/>
          <Route exact path='/update-user/:id' component={updateUserDetails}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
