import React, {useState} from 'react'
import PopUpMessage from '../components/popUpMessage'
import LoadingScreen from '../components/loadingScreen'
import NoteAddComponent from '../components/noteAdd'
import { useDispatch, useSelector } from 'react-redux'
import { getClients, selectClient, numberOfSpecific, getSpecificClient } from '../features/clients/clients'
import { Link } from 'react-router-dom'
import '../styles/clientList.css'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Navbar from '../components/navbar'
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined'

const ClientList = () => {


    const dispatch = useDispatch()
    const clients = useSelector(selectClient)
    const numberOfSpec = useSelector(numberOfSpecific)
    let subArray = [...clients]
    
    const [isOpen, setIsOpen] = useState(false)

    const [clientCompany, setClientCompany] = useState('')
    const [nip, setNip] = useState('')

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [pesel, setPesel] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')


    const [sort, setSort] = useState()

    const switchPopUp = () => {
        if (isOpen == false) setIsOpen(true)
            else setIsOpen(false)
    }

    const sortResults = (property) => {
        if (property == 'clientCompany') {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {
                    if (a['clientCompany'] === null || a['surname'] === null) return 1
                    if (b['clientCompany'] === null || b['surname'] === null) return -1
                    let result = ((a['clientCompany'] || a['surname']) < (b['clientCompany'] || b['surname'])) ? -1 : ((a['clientCompany'] || a['surname']) > (b['clientCompany'] || b['surname'])) ? 1 : 0
                    
                    return result * sortOrder
                }
        } else if (property == 'nip') {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {
                    if (a['nip'] === null || a['pesel'] === null) return 1
                    if (b['nip'] === null || b['pesel'] === null) return -1
                    let result = ((a['nip'] || a['pesel']) < (b['nip'] || b['pesel'])) ? -1 : ((a['nip'] || a['pesel']) > (b['nip'] || b['pesel'])) ? 1 : 0
                    
                    return result * sortOrder
                }
        } else {
            if (property) {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {
                    if (a[property] === null) return 1
                    if (b[property] === null) return -1
                    let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
                    
                    return result * sortOrder
                }
            }
        }
    }
    
   
    return (
    <>
    <Navbar></Navbar>
        {isOpen && <PopUpMessage switchPopUp={switchPopUp}></PopUpMessage>}
        <section className='client-list'>

            <article className='client-list-menu'>
                <div className='client-list-menu-columns'>
                    <label><input type="text" value={name} onChange={(e) => {setName(e.target.value); dispatch(getSpecificClient({type: 'name', value: e.target.value}))}} /> Imie</label>
                    <label><input type="text" value={surname} onChange={(e) => {setSurname(e.target.value); dispatch(getSpecificClient({type: 'surname', value: e.target.value}))}}  /> Nazwisko</label>
                    <label><input type="text" value={pesel} onChange={(e) => {setPesel(e.target.value); dispatch(getSpecificClient({type: 'pesel', value: e.target.value}))}}  /> Pesel klienta</label>
                    <label><input type="text" value={clientCompany} onChange={(e) => {setClientCompany(e.target.value); dispatch(getSpecificClient({type: 'clientCompany', value: e.target.value}))}} /> Nazwa firmy</label>
                    <label><input type="text" value={nip} onChange={(e) => {setNip(e.target.value); dispatch(getSpecificClient({type: 'nip', value: e.target.value}))}} /> NIP</label>
                </div>
                <div className='client-list-menu-columns'>
                    <label><input type="tel" value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value); dispatch(getSpecificClient({type: 'phoneNumber', value: e.target.value}))}}  /> Telefon</label>
                    <label><input type="text" value={address} onChange={(e) => {setAddress(e.target.value); dispatch(getSpecificClient({type: 'address', value: e.target.value}))}}  /> Adres</label>
                    <label><input type="email" value={email} onChange={(e) => {setEmail(e.target.value); dispatch(getSpecificClient({type: 'email', value: e.target.value}))}}  /> Email</label>
                </div>
                <div className='client-list-menu-columns'>
                    <Link to="/views/addClient">
                        <PersonAddIcon style={{fontSize: 50}}></PersonAddIcon>
                    </Link>
                </div>
            </article>

            <article className='client-list-list'>
                <div className='client-list-sort'>
                    <div className='client-list-sort-option'>
                        Lp.
                    </div>
                    <div className='client-list-sort-option' style={{cursor: 'pointer'}} onClick={() => sort == 'clientCompany' ? setSort(null) : setSort('clientCompany') }>
                        Nazwisko i Imie / firma
                        { sort == 'clientCompany' ? <ArrowDropDownIcon></ArrowDropDownIcon> : <ArrowRightIcon></ArrowRightIcon> }
                    </div>
                    <div className='client-list-sort-option'>
                        Pesel / NIP
                    </div>
                    <div className='client-list-sort-option' style={{cursor: 'pointer'}} onClick={() => sort == 'address' ? setSort(null) : setSort('address')}>
                        Adres 
                        { sort == 'address' ? <ArrowDropDownIcon></ArrowDropDownIcon> : <ArrowRightIcon></ArrowRightIcon> }
                    </div> 
                    <div className='client-list-sort-option' style={{cursor: 'pointer'}} onClick={() => sort == 'email' ? setSort(null) : setSort('email')}>
                        Email 
                        { sort == 'email' ? <ArrowDropDownIcon></ArrowDropDownIcon> : <ArrowRightIcon></ArrowRightIcon> }
                    </div> 
                    <div className='client-list-sort-option'>
                        Kontakt
                    </div> 
                </div>

                {
                    clients ? subArray = subArray.sort(sortResults(sort)).map((client, index) => {
                        if (name.search("[\\[\\]?*+|{}\\\\()@.\n\r]") && surname.search("[\\[\\]?*+|{}\\\\()@.\n\r]")
                            && pesel.search("[\\[\\]?*+|{}\\\\()@.\n\r]") && phoneNumber.search("[\\[\\]?*+|{}\\\\()@.\n\r]")
                            && address.search("[\\[\\]?*+|{}\\\\()@.\n\r]") && email.search("[\\[\\]?*+|{}\\\\()@.\n\r]")
                            && clientCompany.search("[\\[\\]?*+|{}\\\\()@.\n\r]") && nip.search("[\\[\\]?*+|{}\\\\()@.\n\r]")) {

                            const reName = new RegExp('^'+name.toLowerCase())
                            const reSurname = new RegExp('^'+surname.toLowerCase())
                            const rePesel = new RegExp('^'+pesel.toLowerCase())
                            const rePhoneNumber = new RegExp('^'+phoneNumber.toLowerCase())
                            const reAddress = new RegExp('^'+address.toLowerCase())
                            const reEmail = new RegExp('^'+email.toLowerCase())
                            const reClientCompany = new RegExp('^'+clientCompany.toLowerCase())
                            const reNip = new RegExp('^'+nip.toLowerCase())

                        return ((name && client.name) ? reName.test(client.name.toLowerCase()) : (name && !client.name) ? false : true) && 
                                ((surname && client.surname) ? reSurname.test(client.surname.toLowerCase()) : (surname && !client.surname) ? false : true) && 
                                ((pesel && client.pesel) ? rePesel.test(client.pesel.toLowerCase()) : (pesel && !client.pesel) ? false : true) &&
                                ((phoneNumber && client.phoneNumber) ? rePhoneNumber.test(client.phoneNumber.toLowerCase()) : (phoneNumber && !client.phoneNumber) ? false : true) &&
                                ((address && client.address) ? reAddress.test(client.address.toLowerCase()) : (address && !client.address) ? false : true) &&
                                ((email && client.email) ? reEmail.test(client.email.toLowerCase()) : (email && !client.email) ? false : true) && 
                                ((clientCompany && client.clientCompany) ? reClientCompany.test(client.clientCompany.toLowerCase()) : (clientCompany && !client.clientCompany) ? false : true) && 
                                ((nip && client.nip) ? reNip.test(client.nip.toLowerCase()) : (nip && !client.nip) ? false : true) && 


                                <ClientListElement key={client._id} index={index} client={client}></ClientListElement>
                    }}) : <LoadingScreen></LoadingScreen>
                }
                <button className='load-more' onClick={() => dispatch(getClients({numberOfClients: (clients.length == 0)?0:clients.length, n: numberOfSpec, isAll: false}))}>ZAŁADUJ WIĘCEJ</button>
                <button className='load-more' onClick={() => dispatch(getClients({numberOfClients: (clients.length == 0)?0:clients.length, n: numberOfSpec, isAll: true}))}>ZAŁADUJ WSZYSTKIE</button>

            </article>
        </section>
    </>
    )
}


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
    //zaimportować edycje klienta, skopiować wszystkie dane klienta, 
    //stworzyć zmienną z notatką i wysłać wszystko razem, zmodyfikować schemat i redux

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


export default ClientList