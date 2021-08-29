import React, {useState} from 'react'
import PopUpMessage from '../components/popUpMessage'
import LoadingScreen from '../components/LoadingScreen'
import { useDispatch, useSelector } from 'react-redux'
import { getClients, selectClient, numberOfSpecific, getSpecificClient } from '../features/clients/clients'
import { Link } from 'react-router-dom'
import '../styles/clientList.css'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { sortResultsClients } from '../features/functions/functions'
import Navbar from '../components/Navbar'
import ClientListElement from '../components/ClientListElement'

const ClientList = () => {


    const dispatch = useDispatch()
    const clients = useSelector(selectClient)
    const numberOfSpec = useSelector(numberOfSpecific)
    let subArray = [...clients]
    
    const [isOpen, setIsOpen] = useState(false)

    const [search, setSearch] = useState({
        name: '',
        surname: '',
        pesel: '',
        clientCompany: '',
        nip: '',
        phoneNumber: '',
        address: '',
        email: ''
    })

    const [sort, setSort] = useState()

    const switchPopUp = () => {
        if (isOpen == false) setIsOpen(true)
            else setIsOpen(false)
    }
    
   
    return (
    <>
    <Navbar></Navbar>
        {isOpen && <PopUpMessage switchPopUp={switchPopUp}></PopUpMessage>}
        <section className='client-list'>

            <article className='client-list-menu'>
                <div className='client-list-menu-columns'>
                    <label><input type="text" value={search.name} onChange={(e) => {setSearch({...search, name: e.target.value}); dispatch(getSpecificClient({type: 'name', value: e.target.value}))}} /> Imie</label>
                    <label><input type="text" value={search.surname} onChange={(e) => {setSearch({...search, surname: e.target.value}); dispatch(getSpecificClient({type: 'surname', value: e.target.value}))}}  /> Nazwisko</label>
                    <label><input type="text" value={search.pesel} onChange={(e) => {setSearch({...search, pesel: e.target.value}); dispatch(getSpecificClient({type: 'pesel', value: e.target.value}))}}  /> Pesel klienta</label>
                    <label><input type="text" value={search.clientCompany} onChange={(e) => {setSearch({...search, clientCompany: e.target.value}); dispatch(getSpecificClient({type: 'clientCompany', value: e.target.value}))}} /> Nazwa firmy</label>
                    <label><input type="text" value={search.nip} onChange={(e) => {setSearch({...search, nip: e.target.value}); dispatch(getSpecificClient({type: 'nip', value: e.target.value}))}} /> NIP</label>
                </div>
                <div className='client-list-menu-columns'>
                    <label><input type="tel" value={search.phoneNumber} onChange={(e) => {setSearch({...search, phoneNumber: e.target.value}); dispatch(getSpecificClient({type: 'phoneNumber', value: e.target.value}))}}  /> Telefon</label>
                    <label><input type="text" value={search.address} onChange={(e) => {setSearch({...search, address: e.target.value}); dispatch(getSpecificClient({type: 'address', value: e.target.value}))}}  /> Adres</label>
                    <label><input type="email" value={search.email} onChange={(e) => {setSearch({...search, email: e.target.value}); dispatch(getSpecificClient({type: 'email', value: e.target.value}))}}  /> Email</label>
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
                    clients ? subArray = subArray.sort(sortResultsClients(sort)).map((client, index) => {
                        if (search.name.search("[\\[\\]?*+|{}\\\\()@.\n\r]") && search.surname.search("[\\[\\]?*+|{}\\\\()@.\n\r]")
                            && search.pesel.search("[\\[\\]?*+|{}\\\\()@.\n\r]") && search.phoneNumber.search("[\\[\\]?*+|{}\\\\()@.\n\r]")
                            && search.address.search("[\\[\\]?*+|{}\\\\()@.\n\r]") && search.email.search("[\\[\\]?*+|{}\\\\()@.\n\r]")
                            && search.clientCompany.search("[\\[\\]?*+|{}\\\\()@.\n\r]") && search.nip.search("[\\[\\]?*+|{}\\\\()@.\n\r]")) {

                            const reName = new RegExp('^'+search.name.toLowerCase())
                            const reSurname = new RegExp('^'+search.surname.toLowerCase())
                            const rePesel = new RegExp('^'+search.pesel.toLowerCase())
                            const rePhoneNumber = new RegExp('^'+search.phoneNumber.toLowerCase())
                            const reAddress = new RegExp('^'+search.address.toLowerCase())
                            const reEmail = new RegExp('^'+search.email.toLowerCase())
                            const reClientCompany = new RegExp('^'+search.clientCompany.toLowerCase())
                            const reNip = new RegExp('^'+search.nip.toLowerCase())

                        return (((search.name != '') && client.name) ? reName.test(client.name.toLowerCase()) : ((search.name != '') && !client.name) ? false : true) && 
                                (((search.surname != '') && client.surname) ? reSurname.test(client.surname.toLowerCase()) : ((search.surname != '') && !client.surname) ? false : true) && 
                                (((search.pesel != '') && client.pesel) ? rePesel.test(client.pesel.toLowerCase()) : ((search.pesel != '') && !client.pesel) ? false : true) &&
                                (((search.phoneNumber != '') && client.phoneNumber) ? rePhoneNumber.test(client.phoneNumber.toLowerCase()) : ((search.phoneNumber != '') && !client.phoneNumber) ? false : true) &&
                                (((search.address != '') && client.address) ? reAddress.test(client.address.toLowerCase()) : ((search.address != '') && !client.address) ? false : true) &&
                                (((search.email != '') && client.email) ? reEmail.test(client.email.toLowerCase()) : ((search.email != '') && !client.email) ? false : true) && 
                                (((search.clientCompany != '') && client.clientCompany) ? reClientCompany.test(client.clientCompany.toLowerCase()) : ((search.clientCompany != '') && !client.clientCompany) ? false : true) && 
                                (((search.nip != '') && client.nip) ? reNip.test(client.nip.toLowerCase()) : ((search.nip != '') && !client.nip) ? false : true) && 


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

export default ClientList