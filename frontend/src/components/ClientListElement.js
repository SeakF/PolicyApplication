import React, {useState} from 'react'
import PopUpMessage from '../components/popUpMessage'
import NoteAddComponent from './NoteAdd'
import { Link } from 'react-router-dom'
import '../styles/clientList.css'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined'

const ClientListElement = ({index, client}) => {
    return (
    <div to='/views/clientDetails' className='client-list-element'>
        <div className='client-list-element-option'>
            {index}
        </div>
        <div className='client-list-element-option'>
            {client.clientCompany || `${client.surname} ${client.name}`}
        </div>
        <div className='client-list-element-option'>
            {client.nip || client.pesel || '-'}
        </div>
        <div className='client-list-element-option'>
            {client.address || '-'}
        </div>
        <div className='client-list-element-option'>
            {client.email || '-'}
        </div>
        <ClientListElementMessage clientId={client._id} phoneNumber={client.phoneNumber} data={client}></ClientListElementMessage>
    </div>
    )
}

const ClientListElementMessage = ({phoneNumber, clientId, data}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const switchPopUp = () => {
        if (isOpen == false) setIsOpen(true)
            else setIsOpen(false)
    }

    return (
        <>
        {isOpen && <PopUpMessage switchPopUp={switchPopUp} data={data}></PopUpMessage>}
        {isOpen2 && <NoteAddComponent openValue={{isOpen2, setIsOpen2}} data={data}></NoteAddComponent>}
        <div className='client-list-element-message-container'>
            {phoneNumber || '-'}
            <div className='client-list-element-message-container-inner'>
                <div className='client-list-element-message' onClick={() => setIsOpen2(!isOpen2)}>
                    <NoteOutlinedIcon></NoteOutlinedIcon>
                </div>
                {phoneNumber && <div onClick={() => switchPopUp()} className='client-list-element-message'>
                    SMS
                </div>}
                <Link to={`/views/clientDetails/${clientId}`} className='client-list-element-message'>
                    <ArrowForwardIosIcon style={{fontSize: 15}}></ArrowForwardIosIcon>
                </Link>
            </div>
        </div>
        </>
    )
}


export default ClientListElement