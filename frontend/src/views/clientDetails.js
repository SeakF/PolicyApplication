import React, {useEffect, useState} from "react";
import {useParams, Link} from 'react-router-dom'
import LoadingScreen from '../components/LoadingScreen'
import { useSelector, useDispatch } from 'react-redux'
import { DELETE_CLIENT, EDIT_CLIENT, selectClient, getSpecificClient } from '../features/clients/clients'
import '../styles/addStyles.css'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import DeleteIcon from '@material-ui/icons/Delete'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Navbar from '../components/Navbar'
import PolicyListElement from '../components/PolicyListElement'


const ClientDetails = () => {

    
    let params = useParams()

    const dispatch = useDispatch()
    const clients = useSelector(selectClient)

    const [client, setClient] = useState({})
    const [id, setId] = useState('')

    const [person, setPerson] = useState({
        name: '',
        surname: '',
        pesel: '',
        clientCompany: '',
        nip: '',
        phoneNumber: '',
        address: '',
        email: '',
        conjugateName: ''
    })

    const [subPerson, setSubPerson] = useState({
        name: '',
        surname: '',
        pesel: '',
        clientCompany: '',
        nip: '',
        phoneNumber: '',
        address: '',
        email: '',
        conjugateName: ''
    })

    const [edit, setEdit] = useState(false)
    const [show, setShow] = useState(false)



    useEffect(() => {
        const load = () => {
            const foundClient = clients.find((client) => client._id === params[0])

            if (foundClient) {
                setClient(foundClient)
                setId(foundClient._id)

                setPerson({
                    ...person, 
                    name: foundClient.name, 
                    surname: foundClient.surname,
                    pesel: foundClient.pesel,
                    clientCompany: foundClient.clientCompany,
                    nip: foundClient.nip,
                    phoneNumber: foundClient.phoneNumber,
                    address: foundClient.address,
                    email: foundClient.email,
                    conjugateName: foundClient.conjugateName,
                    clientNote: foundClient.clientNote
                })

                setSubPerson({
                    ...subPerson, 
                    name: foundClient.name, 
                    surname: foundClient.surname,
                    pesel: foundClient.pesel,
                    clientCompany: foundClient.clientCompany,
                    nip: foundClient.nip,
                    phoneNumber: foundClient.phoneNumber,
                    address: foundClient.address,
                    email: foundClient.email,
                    conjugateName: foundClient.conjugateName,
                    clientNote: foundClient.clientNote
                })
            } else {
                dispatch(getSpecificClient({type: '_id', value: params[0]}))
            }
        }
        load()
    }, [clients])

    const saveSubs = () => { 
        const editedClient = {
            id,
            ...subPerson
        }
        setPerson({...subPerson})
        dispatch(EDIT_CLIENT(editedClient))
        window.location.reload()
    }

    const clearSubs = () => {
        setSubPerson({...person})
    }

    const deleteClient = (id) => {
        dispatch(DELETE_CLIENT(id))
        window.location.href = '../clientList'
    }


    if (!id) {
        return (
            <>
                <Navbar></Navbar>
                <LoadingScreen></LoadingScreen>
            </>
        )
    }

    if (edit) {
        return (
        <>

        <Navbar></Navbar>
            { show &&  <section className='confirm-delete'>
                    <div className='confirm-delete-cont'>
                        Czy na pewno chcesz usunąć klienta i wszystkie jego polisy?
                        <div className='accept-container'>
                            <div className='delete-btn-container' onClick={() => deleteClient(id)}>
                                <DeleteIcon style={{fontSize: 50}} className='accept-btn'></DeleteIcon>
                                <span>Usuń Klienta</span>
                            </div>
                        </div> 
                        <div className='accept-container'>
                            <div className='accept-btn-container' onClick={() => setShow(!show)}>
                                <CancelIcon style={{fontSize: 50}} className='accept-btn'></CancelIcon>
                                <span>Anuluj</span>
                            </div>
                        </div>    
                    </div>
                </section>}



            <section className='add-container'>
                <article className='add-title'>
                    <span>{person.name + ' '}{person.surname + ' '}{person.clientCompany}</span>
                </article>
                <article className='add-section'>
                    <div className='add-section-title'>
                        <h1>Dane Klienta</h1> 
                    </div>      
                    <div className='add-section-forms'>
                        {(person.clientCompany != '') ? 
                        <>
                            <label><input className='edit-details' onChange={(e) => setSubPerson({...subPerson, clientCompany: e.target.value})} value={subPerson.clientCompany}></input> <div>Nazwa firmy*</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPerson({...subPerson, nip: e.target.value})} value={subPerson.nip}></input> <div>NIP</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPerson({...subPerson, name: e.target.value})} value={subPerson.name}></input> <div>Imie</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPerson({...subPerson, surname: e.target.value})} value={subPerson.surname}></input> <div>Nazwisko</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPerson({...subPerson, pesel: e.target.value})} value={subPerson.pesel}></input> <div>Pesel</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPerson({...subPerson, phoneNumber: e.target.value})} value={subPerson.phoneNumber}></input> <div>Numer Telefonu (prefiks +48 dodaje sie automatycznie, poprawny zapis: 111222333)</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPerson({...subPerson, address: e.target.value})} value={subPerson.address}></input> <div>Adres</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPerson({...subPerson, email: e.target.value})} value={subPerson.email}></input> <div>Email</div></label>
                        </>
                        : 
                        <>
                            <label><input className='edit-details' onChange={(e) => setSubPerson({...subPerson, name: e.target.value})} value={subPerson.name}></input> <div>Imie*</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPerson({...subPerson, surname: e.target.value})} value={subPerson.surname}></input> <div>Nazwisko*</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPerson({...subPerson, pesel: e.target.value})} value={subPerson.pesel}></input> <div>Pesel</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPerson({...subPerson, phoneNumber: e.target.value})} value={subPerson.phoneNumber}></input> <div>Numer Telefonu (prefiks +48 dodaje sie automatycznie, poprawny zapis: 111222333)</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPerson({...subPerson, address: e.target.value})} value={subPerson.address}></input> <div>Adres</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPerson({...subPerson, email: e.target.value})} value={subPerson.email}></input> <div>Email</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPerson({...subPerson, conjugateName: e.target.value})} value={subPerson.conjugateName}></input> <div>Zwrot grzecznościowy do SMS (np. "Panie Ryszardzie", bez nazwiska i do osób prywatnych)</div></label>
                        </>
                        }
                        
                    </div>        
                    <div className='accept-container'>
                        <div className='accept-btn-container' onClick={() => {saveSubs(); setEdit(!edit)}}>
                            <SaveIcon style={{fontSize: 50}} className='accept-btn'></SaveIcon>
                            <span>Zapisz</span>
                        </div>
                    </div>    
                    <div className='accept-container'>
                        <div className='accept-btn-container' onClick={() => {clearSubs(); setEdit(!edit)}}>
                            <CancelIcon style={{fontSize: 50}} className='accept-btn'></CancelIcon>
                            <span>Anuluj</span>
                        </div>
                    </div>        
                    <div className='accept-container'>
                        <div className='delete-btn-container' onClick={() => setShow(!show)}>
                            <DeleteIcon style={{fontSize: 50}} className='accept-btn'></DeleteIcon>
                            <span>Usuń Klienta</span>
                        </div>
                    </div> 
                </article>
            </section>
        </>
        )
    }

    return (
    <>
    <Navbar></Navbar>
        <section className='add-container'>
            <article className='add-title'>
                <span>{person.name + ' '}{person.surname + ' '}{person.clientCompany}</span>
            </article>
            <article className='add-section'>
                <div className='add-section-title'>
                    <h1>Dane Klienta</h1> 
                </div>      
                <div className='add-section-forms'>
                    {(person.clientCompany != '') ? 
                    <>
                        <label><div className='edit-details'>{person.clientCompany || '-'}</div> <div>Nazwa firmy*</div></label>
                        <label><div className='edit-details'>{person.nip || '-'}</div> <div>NIP</div></label>
                        <label><div className='edit-details'>{person.name || '-'}</div> <div>Imie właściciela</div></label>
                        <label><div className='edit-details'>{person.surname || '-'}</div> <div>Nazwisko właściciela</div></label>
                        <label><div className='edit-details'>{person.pesel || '-'}</div> <div>Pesel</div></label>
                        <label><div className='edit-details'>{person.phoneNumber || '-'}</div> <div>Numer Telefonu (prefiks +48 dodaje sie automatycznie, poprawny zapis: 111222333)</div></label>
                        <label><div className='edit-details'>{person.address || '-'}</div> <div>Adres</div></label>
                        <label><div className='edit-details'>{person.email || '-'}</div> <div>Email</div></label>
                    </>
                    :
                    <>
                        <label><div className='edit-details'>{person.name || '-'}</div> <div>Imie*</div></label>
                        <label><div className='edit-details'>{person.surname || '-'}</div> <div>Nazwisko*</div></label>
                        <label><div className='edit-details'>{person.pesel || '-'}</div> <div>Pesel</div></label>
                        <label><div className='edit-details'>{person.phoneNumber || '-'}</div> <div>Numer Telefonu (prefiks +48 dodaje sie automatycznie, poprawny zapis: 111222333)</div></label>
                        <label><div className='edit-details'>{person.address || '-'}</div> <div>Adres</div></label>
                        <label><div className='edit-details'>{person.email || '-'}</div> <div>Email</div></label>
                        <label><div className='edit-details'>{person.conjugateName || '-'}</div><div>Zwrot grzecznościowy do SMS (np. "Panie Ryszardzie", bez nazwiska i do osób prywatnych)</div></label>
                    </>
                    }
                    
                </div>        
                <div className='accept-container'>
                    <div className='accept-btn-container' onClick={() => setEdit(!edit)}>
                        <EditIcon style={{fontSize: 50}} className='accept-btn'></EditIcon>
                        <span>Edytuj</span>
                    </div>
                </div> 
                <div className='accept-container'>
                    <Link to={{pathname: `/views/addPolicy`, state: {id, name: person.name, surname: person.surname, clientCompany: person.clientCompany, written: true}}}  className='accept-btn-container'>
                        <NoteAddIcon style={{fontSize: 50}} className='accept-btn'></NoteAddIcon>
                        <span>Dodaj Polisę</span>
                    </Link>
                </div> 
                <div className='accept-container'>
                    <Link to={{pathname: `/views/addPolicy`, state: {id, name: person.name, surname: person.surname, clientCompany: person.clientCompany, written: false}}}  className='accept-btn-container'>
                        <NoteAddIcon style={{fontSize: 50}} className='accept-btn'></NoteAddIcon>
                        <span>Dodaj Oczekującą</span>
                    </Link>
                </div> 
            </article>
            <article className='add-section special-title-client'>
                <div className='add-section-title special-title-client'>
                    <h1>Polisy klienta</h1> 
                </div>      
            </article>
            <PolicyListBox clientData={client}></PolicyListBox>
        </section>
    </>
    )
}

const PolicyListBox = ({clientData}) => {
    const {name, surname, clientCompany} = clientData

    const [sort, setSort] = useState('policyDateEnd')

    let subArray = clientData.policy

    const convertDate = (dateSet, dateEnd, installments) => {

        switch (installments) {
            case 'Jednorazowo':
                installments = 1
                break;
            case 'Pół roku':
                installments = 2   
                break;
            case 'Kwartał':
                installments = 4
                break;

            default:
                break;
        }
        let date1 = new Date(dateSet)
        let date2 = new Date(dateEnd) 
        let today = new Date()


        let timeLeft = date2.getTime() - today.getTime()
        let daysLeft = timeLeft / (1000 * 3600 * 24)

        if (installments == 1) {
            if ((date2.getDate() == today.getDate()) && (date2.getMonth() == today.getMonth()) && (date2.getFullYear() == today.getFullYear())) return 'dziś'
            else if (date2 > today.getTime()) return Math.ceil(daysLeft)
                else return 'po terminie'
        } else {
            let policyPeriodPlain = date2.getTime() - date1.getTime()

            let onePeriod = policyPeriodPlain/installments
            let periodStack = onePeriod

            let installmentsCounter = 0
            while (((date1.getTime() + periodStack) < today.getTime()) && (installmentsCounter < installments-1)) {
                periodStack += onePeriod
                installmentsCounter++
            }

            let periodExactDay = new Date((date1.getTime() + periodStack))

            if ((periodExactDay.getDate() == today.getDate()) && (periodExactDay.getMonth() == today.getMonth()) && (periodExactDay.getFullYear() == today.getFullYear())) return 'dziś'
            else if (periodExactDay.getTime() > today.getTime()) return Math.ceil(((periodExactDay - today.getTime()) / (1000 * 3600 * 24)))
                return 'po terminie'
        }
    }

    const sortResults = (property) => {
        const stringToDate = (date) => {
            if (date == null || date == '') return null
            const values = date.split('-')
            return new Date(values[2], values[1], values[0]).getTime()
        }

        if (property == 'clientCompany') {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {
                    if (!a['clientCompany'] || !a['surname']) return 1
                    if (!b['clientCompany'] || !b['surname']) return -1
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
                    if (!a['nip'] || !a['pesel']) return 1
                    if (!b['nip'] || !b['pesel']) return -1
                    let result = ((a['nip'] || a['pesel']) < (b['nip'] || b['pesel'])) ? -1 : ((a['nip'] || a['pesel']) > (b['nip'] || b['pesel'])) ? 1 : 0
                    
                    return result * sortOrder
                }
        } else if (property == 'policyDateSet') {
            if (property) {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {

                    let dateForA = stringToDate(a['policyDateSet'])
                    let dateForB = stringToDate(b['policyDateSet'])

                    //---------------------------------
                    let result = (dateForA < dateForB) ? -1 : (dateForA > dateForB) ? 1 : 0
                    
                    return result * sortOrder
                }
            }
        } else if (property == 'policyDateEnd') {
            if (property) {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {

                    let dateForA = convertDate(a['policyDateSet'], a['policyDateEnd'], a['installments'])
                    let dateForB = convertDate(b['policyDateSet'], b['policyDateEnd'], b['installments'])

                    let dateForSortA = stringToDate(a['policyDateEnd'])
                    let dateForSortB = stringToDate(b['policyDateEnd'])

                    // te z dzisiaj daje na początek
                    if (dateForA == 'dziś') return -1
                    if (dateForB == 'dziś') return 1

                    // te po terminie wyrzuca na koniec
                    if (dateForA == 'po terminie') return 1
                    if (dateForB == 'po terminie') return -1

                    //---------------------------------
                    let result = (dateForSortA < dateForSortB) ? -1 : (dateForSortA > dateForSortB) ? 1 : 0
                    
                    return result * sortOrder
                }
            }
        } else {
            if (property) {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {
                    if (!a[property]) return 1
                    if (!b[property]) return -1
                    let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
                    
                    return result * sortOrder
                }
            }
        }
    }

    return (
    <article className='policy-list-list'>
        <div className='policy-list-sort'>
            <div className='policy-list-sort-option'>
                Lp. 
            </div>
            <div className='policy-list-sort-option'>
                Nazwisko i Imie / firma
            </div>
            <div className='policy-list-sort-option'>
                Pesel / NIP
            </div>
            <div className='policy-list-sort-option'>
                Adres
            </div>
            <div className='policy-list-sort-option' style={{cursor: 'pointer'}} onClick={() => sort == 'policyCompany' ? setSort(null) : setSort('policyCompany') }>
                Towarzystwo Ubezpieczeń
                { sort == 'policyCompany' ? <ArrowDropDownIcon></ArrowDropDownIcon> : <ArrowRightIcon></ArrowRightIcon> }
            </div> 
            <div className='policy-list-sort-option' style={{cursor: 'pointer'}} onClick={() => sort == 'policyType' ? setSort(null) : setSort('policyType') }>
                Obiekt Ubezp.
                { sort == 'policyType' ? <ArrowDropDownIcon></ArrowDropDownIcon> : <ArrowRightIcon></ArrowRightIcon> }
            </div> 
            <div className='policy-list-sort-option' style={{cursor: 'pointer'}} onClick={() => sort == 'policyVariant' ? setSort(null) : setSort('policyVariant') }>
                Szczegóły
                { sort == 'policyVariant' ? <ArrowDropDownIcon></ArrowDropDownIcon> : <ArrowRightIcon></ArrowRightIcon> }
            </div> 
            <div className='policy-list-sort-option' style={{cursor: 'pointer'}} onClick={() => sort == 'payment' ? setSort(null) : setSort('payment') }>
                Płatność
                { sort == 'payment' ? <ArrowDropDownIcon></ArrowDropDownIcon> : <ArrowRightIcon></ArrowRightIcon> }
            </div> 
            <div className='policy-list-sort-option' style={{cursor: 'pointer'}} onClick={() => sort == 'policyDateSet' ? setSort(null) : setSort('policyDateSet') }>
                Data od
                { sort == 'policyDateSet' ? <ArrowDropDownIcon></ArrowDropDownIcon> : <ArrowRightIcon></ArrowRightIcon> }
            </div> 
            <div className='policy-list-sort-option' style={{cursor: 'pointer'}} onClick={() => sort == 'policyDateEnd' ? setSort(null) : setSort('policyDateEnd') }>
                Data do
                { sort == 'policyDateEnd' ? <ArrowDropDownIcon></ArrowDropDownIcon> : <ArrowRightIcon></ArrowRightIcon> }
            </div> 
            <div className='policy-list-sort-option'>
                Dni do końca / raty
            </div> 
            <div className='policy-list-sort-option'>
                Kontakt
            </div> 
        </div>
        
        {
            (clientCompany || (name && surname)) && clientData.policy ? [...subArray].sort(sortResults(sort)).map((policy, index) => {
                return <PolicyListElement key={policy.policyNumber} index={index} data={{...clientData, policy: {...policy}}}></PolicyListElement>
            }) : <LoadingScreen></LoadingScreen>
        }
    </article>
    )
}

export default ClientDetails