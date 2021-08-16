import React, {useRef, useState} from 'react'
import '../styles/login.css'
import {useAuth} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()

    const [error, setError] = useState('')

    const {login} = useAuth()
    const history = useHistory()


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/home')
        } catch {
            setError('Błąd przy logowaniu')
        }
    }

    return (
    <>
    {error && <div className='error-login' onClick={() => setError(false)}><div>Błędny email lub hasło</div></div>}
    <div className='login-container'>
        <div className='login-card'>
            <form onSubmit={handleSubmit}>
                <div><label className='label-login'><input className='login-forms' type='text' ref={emailRef} required></input> Email</label></div>
                <div><label className='label-login'><input className='login-forms' type='password' ref={passwordRef} required></input> Hasło</label></div>
                <div><button className='login-button' type='submit'>Zaloguj</button></div>
            </form>
        </div>
    </div>
        
    </>
    )
}
