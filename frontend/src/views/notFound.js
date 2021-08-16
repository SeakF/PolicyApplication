import React from 'react'
import '../styles/addStyles.css'
import {Link} from 'react-router-dom'
import Navbar from '../components/navbar'

const NotFound = () => {
    return (
    <>
    <Navbar></Navbar>
        <section className='add-container'>
            <article className='add-title'>Nie ma takiej strony</article>
            <article className='add-section'>
                <div className='accept-container'>
                    <Link to='/home' className='accept-btn-container'>
                        <span>Wróć do strony głównej</span>
                    </Link>
                </div> 
            </article>
        </section>
    </>
    )
}

export default NotFound