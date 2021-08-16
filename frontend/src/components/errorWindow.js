import React from "react"
import '../styles/addStyles.css'
import { useDispatch } from 'react-redux'
import { CHANGE_STATUS } from '../features/clients/clients'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'

const ErrorWindow = () => {

    const dispatch = useDispatch()

    return (
        <>
            <article className='error-window-container'>
                <div className='error-window'>
                Polisa o takim numerze już istnieje
                    <div className='accept-container' onClick={() => dispatch(CHANGE_STATUS())}>
                        <div className='accept-btn-container'>
                            <CloseRoundedIcon style={{fontSize: 50}} className='accept-btn'></CloseRoundedIcon>
                            <span>Zamknij</span>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}

export default ErrorWindow