import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/home.css'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Navbar from '../components/Navbar'

const Home = () => {

    return (
        <>
        <Navbar></Navbar>
        <section className='home'>
            <article>
                <div className='article-header'>
                Lista Polis
                </div>
                <Link to='/views/policyList' className='arrow-link'>
                    <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </Link>
            </article>

            <article>
                <div className='article-header'>
                Lista Klientów
                </div>
                <Link to='/views/clientList' className='arrow-link'>
                    <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </Link>
            </article>

            <article>
                <div className='article-header'>
                Dodaj Polisę
                </div>
                <Link to='/views/addPolicy' className='arrow-link'>
                    <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </Link>
            </article>

            <article>
                <div className='article-header'>
                Dodaj Klienta
                </div>
                <Link to='/views/addClient' className='arrow-link'>
                    <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </Link>
            </article>

            <article>
                <div className='article-header'>
                Zbliżające sie terminy
                </div>
                <Link to='/views/deadlines' className='arrow-link'>
                    <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </Link>
            </article>
        </section>
        </>
    )
}

export default Home