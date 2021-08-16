import React, {useState, useEffect} from "react";
import '../styles/navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { getClients, selectClient, numberOfSpecific } from '../features/clients/clients'
import { Link, useLocation, useHistory } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import HomeIcon from '@material-ui/icons/Home'
import {useAuth} from '../context/AuthContext'

const Navbar = () => {

    const dispatch = useDispatch()
    const [error, setError] = useState('')

    const clients = useSelector(selectClient)
    const numberOfSpec = useSelector(numberOfSpecific)
    const {logout} = useAuth()
    const history = useHistory()
    
    useEffect(() => {
        let mounted = true
        if (mounted) {
            dispatch(getClients({numberOfClients: 0, n: numberOfSpec, isAll: false}))
        }
        return () => mounted = false
    }, [])

    const usePathname = () => {
        const location = useLocation()
        return location.pathname
    } 
    
    const getPreviousPage = () => {
        history.goBack()
    }

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/')
        } catch {
            setError('Błąd wylogowania')
        }
    }


    if(usePathname() === '/home') {    
        return (
            <nav>
                <div className="logout" onClick={() => handleLogout()}>
                    <AccountBoxIcon className="logout-icon" style={{fontSize: 40}}></AccountBoxIcon>
                    Wyloguj
                </div>
            </nav>
        )
    } else {
        return (
            <nav>
                <div onClick={() => getPreviousPage()} className='navbar-link'>
                    <ArrowBackIosIcon style={{fontSize: 35}}></ArrowBackIosIcon>
                </div>
                <Link to="/home" className='navbar-link'>
                    <HomeIcon style={{fontSize: 45}}></HomeIcon>
                </Link>
            </nav>
        )
    }
}

export default Navbar