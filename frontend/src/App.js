import React from 'react'
import Login from './views/login'
import { AuthProvider } from './context/AuthContext'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PrivateRoute from './components/privateRoute'

import Home from './views/home'
import PolicyList from './views/policyList'
import ClientList from './views/clientList'
import AddPolicy from './views/addPolicy'
import AddClient from './views/addClient'
import Deadlines from './views/deadlines'
import PolicyDetails from './views/policyDetails'
import ClientDetails from './views/clientDetails'
import NotFound from './views/notFound'


function App() {
  return (
    <>
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path='/' component={Login}></Route>
          <PrivateRoute path='/home' component={Home}></PrivateRoute>
          <PrivateRoute path='/views/policyList' component={PolicyList}></PrivateRoute>
          <PrivateRoute path='/views/clientList' component={ClientList}></PrivateRoute>
          <PrivateRoute path='/views/addPolicy' component={AddPolicy}></PrivateRoute>
          <PrivateRoute path='/views/addClient' component={AddClient}></PrivateRoute>
          <PrivateRoute path='/views/Deadlines' component={Deadlines}></PrivateRoute>
          <PrivateRoute path='/views/policyDetails/*' component={PolicyDetails}></PrivateRoute>
          <PrivateRoute path='/views/clientDetails/*' component={ClientDetails}></PrivateRoute>
          <PrivateRoute path='*' component={NotFound}></PrivateRoute>
        </Switch>
      </AuthProvider>
    </Router>
    </>
  )
}

export default App;
