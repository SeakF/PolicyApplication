import React, {useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getClients } from '../features/clients/clients'

import Navbar from '../components/Navbar'

import Home from './home'
import PolicyList from './policyList'
import ClientList from './clientList'
import AddPolicy from './addPolicy'
import AddClient from './addClient'
import Deadlines from './deadlines'
import PolicyDetails from './policyDetails'
import ClientDetails from './clientDetails'
import NotFound from './notFound'


const Main = () => {


    

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getClients())
    }, [dispatch])

    return (   
        <Router>
        <Navbar></Navbar>
        

        <Switch>
            <Route exact path='/menu'>
            <Home></Home>
            </Route>
            <Route exact path='/views/policyList'>
            <PolicyList></PolicyList>
            </Route>
            <Route exact path='/views/clientList'>
            <ClientList></ClientList>
            </Route>
            <Route exact path='/views/addPolicy'>
            <AddPolicy></AddPolicy>
            </Route>
            <Route exact path='/views/addClient'>
            <AddClient></AddClient>
            </Route>
            <Route exact path='/views/deadlines'>
            <Deadlines></Deadlines>
            </Route>
            <Route exact path='/views/policyDetails/*'>
            <PolicyDetails></PolicyDetails>
            </Route>
            <Route exact path='/views/clientDetails/*'>
            <ClientDetails></ClientDetails>
            </Route>
            <Route path='*'>
            <NotFound></NotFound>
            </Route>
        </Switch>
        </Router>
    )
}

export default Main