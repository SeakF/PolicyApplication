import React, {useEffect, useState} from "react";
import {useParams, Link} from 'react-router-dom'
import LoadingScreen from '../components/loadingScreen'
import { useSelector, useDispatch } from 'react-redux'
import { DELETE_CLIENT, EDIT_CLIENT, selectClient, getSpecificClient } from '../features/clients/clients'
import '../styles/addStyles.css'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import DeleteIcon from '@material-ui/icons/Delete'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import PopUpMessage from '../components/popUpMessage'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Navbar from '../components/navbar'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined'
import NoteAddComponent from '../components/noteAdd'


const ClientDetails = () => {

    
    let params = useParams()

    const dispatch = useDispatch()
    const clients = useSelector(selectClient)

    const [client, setClient] = useState({})
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [pesel, setPesel] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [conjugateName, setConjugateName] = useState('')

    const [clientCompany, setClientCompany] = useState('')
    const [nip, setNip] = useState('')



    const [subName, setSubName] = useState('')
    const [subSurname, setSubSurname] = useState('')
    const [subPesel, setSubPesel] = useState('')
    const [subPhoneNumber, setSubPhoneNumber] = useState('')
    const [subAddress, setSubAddress] = useState('')
    const [subEmail, setSubEmail] = useState('')
    const [subConjugateName, setSubConjugateName] = useState('')

    const [subClientCompany, setSubClientCompany] = useState('')
    const [subNip, setSubNip] = useState('')

    const [clientNote, setClientNote] = useState('')

    


    const [edit, setEdit] = useState(false)
    const [show, setShow] = useState(false)



    useEffect(() => {
        const load = () => {
            const foundClient = clients.find((client) => client._id === params[0])

            if (foundClient) {
                setClient(foundClient)
                setId(foundClient._id)

                setClientCompany(foundClient.clientCompany || '-')
                setNip(foundClient.nip || '-')
                setName(foundClient.name || '-')
                setSurname(foundClient.surname || '-')
                setPesel(foundClient.pesel || '-')
                setPhoneNumber(foundClient.phoneNumber || '-')
                setAddress(foundClient.address || '-')
                setEmail(foundClient.email || '-')
                setConjugateName(foundClient.conjugateName || '-')
                setClientNote(foundClient.clientNote)

                
                setSubClientCompany(foundClient.clientCompany || '-')
                setSubNip(foundClient.nip || '-')
                setSubName(foundClient.name || '-')
                setSubSurname(foundClient.surname || '-')
                setSubPesel(foundClient.pesel || '-')
                setSubPhoneNumber(foundClient.phoneNumber || '-')
                setSubAddress(foundClient.address || '-')
                setSubEmail(foundClient.email || '-')
                setSubConjugateName(foundClient.conjugateName || '-')
            } else {
                dispatch(getSpecificClient({type: '_id', value: params[0]}))
            }
        }
        load()
    }, [clients])

    const saveSubs = () => { 

        if (clientCompany && clientCompany != '-') {
            const editedClient = {
                id,
                clientCompany,
                nip: (subNip=='-' || null) ? null : subNip,
                name: (subName=='-' || null) ? null : subName, 
                surname: (subSurname=='-' || null) ? null : subSurname,
                pesel: (subPesel=='-' || null) ? null : subPesel,
                phoneNumber: (subPhoneNumber=='-' || null) ? null : subPhoneNumber,
                address: (subAddress=='-' || null) ? null : subAddress,
                email: (subEmail=='-' || null) ? null : subEmail,
                note: clientNote
            }

            dispatch(EDIT_CLIENT(editedClient))
            window.location.reload()

        } else {
            const editedClient = {
                id,
                name: subName, 
                surname: subSurname,
                pesel: (subPesel=='-' || null) ? null : subPesel,
                phoneNumber: (subPhoneNumber=='-' || null) ? null : subPhoneNumber,
                address: (subAddress=='-' || null) ? null : subAddress,
                email: (subEmail=='-' || null) ? null : subEmail,
                conjugateName: (subConjugateName=='-' || null) ? null : subConjugateName,
                note: clientNote
            }

            dispatch(EDIT_CLIENT(editedClient))
            window.location.reload()
        }

        
    }

    const clearSubs = () => {
        setSubClientCompany(clientCompany)
        setSubNip(nip)
        setSubName(name)
        setSubSurname(surname)
        setSubPesel(pesel)
        setSubPhoneNumber(phoneNumber)
        setSubAddress(address)
        setSubEmail(email)
        setSubConjugateName(conjugateName)
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
                    <span>{(name=='-' || null) ? '' : name} {(surname=='-' || null) ? '' : surname} {(clientCompany=='-' || null) ? '' : clientCompany}</span>
                </article>
                <article className='add-section'>
                    <div className='add-section-title'>
                        <h1>Dane Klienta</h1> 
                    </div>      
                    <div className='add-section-forms'>
                        {(clientCompany && clientCompany != '-') ? 
                        <>
                            <label><input className='edit-details' onChange={(e) => setSubClientCompany(e.target.value)} value={subClientCompany}></input> <div>Nazwa firmy*</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubNip(e.target.value)} value={subNip}></input> <div>NIP</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubName(e.target.value)} value={subName}></input> <div>Imie</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubSurname(e.target.value)} value={subSurname}></input> <div>Nazwisko</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPesel(e.target.value)} value={subPesel}></input> <div>Pesel</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPhoneNumber(e.target.value)} value={subPhoneNumber}></input> <div>Numer Telefonu (prefiks +48 dodaje sie automatycznie, poprawny zapis: 111222333)</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubAddress(e.target.value)} value={subAddress}></input> <div>Adres</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubEmail(e.target.value)} value={subEmail}></input> <div>Email</div></label>
                        </>
                        : 
                        <>
                            <label><input className='edit-details' onChange={(e) => setSubName(e.target.value)} value={subName}></input> <div>Imie*</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubSurname(e.target.value)} value={subSurname}></input> <div>Nazwisko*</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPesel(e.target.value)} value={subPesel}></input> <div>Pesel</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPhoneNumber(e.target.value)} value={subPhoneNumber}></input> <div>Numer Telefonu (prefiks +48 dodaje sie automatycznie, poprawny zapis: 111222333)</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubAddress(e.target.value)} value={subAddress}></input> <div>Adres</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubEmail(e.target.value)} value={subEmail}></input> <div>Email</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubConjugateName(e.target.value)} value={subConjugateName}></input> <div>Zwrot grzecznościowy do SMS (np. "Panie Ryszardzie", bez nazwiska i do osób prywatnych)</div></label>
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
                <span>{(name=='-' || null) ? '' : name} {(surname=='-' || null) ? '' : surname} {(clientCompany=='-' || null) ? '' : clientCompany}</span>
            </article>
            <article className='add-section'>
                <div className='add-section-title'>
                    <h1>Dane Klienta</h1> 
                </div>      
                <div className='add-section-forms'>
                    {(clientCompany && clientCompany != '-') ? 
                    <>
                        <label><div className='edit-details'>{clientCompany || '-'}</div> <div>Nazwa firmy*</div></label>
                        <label><div className='edit-details'>{nip || '-'}</div> <div>NIP</div></label>
                        <label><div className='edit-details'>{name || '-'}</div> <div>Imie właściciela</div></label>
                        <label><div className='edit-details'>{surname || '-'}</div> <div>Nazwisko właściciela</div></label>
                        <label><div className='edit-details'>{pesel || '-'}</div> <div>Pesel</div></label>
                        <label><div className='edit-details'>{phoneNumber || '-'}</div> <div>Numer Telefonu (prefiks +48 dodaje sie automatycznie, poprawny zapis: 111222333)</div></label>
                        <label><div className='edit-details'>{address || '-'}</div> <div>Adres</div></label>
                        <label><div className='edit-details'>{email || '-'}</div> <div>Email</div></label>
                    </>
                    :
                    <>
                        <label><div className='edit-details'>{name}</div> <div>Imie*</div></label>
                        <label><div className='edit-details'>{surname}</div> <div>Nazwisko*</div></label>
                        <label><div className='edit-details'>{pesel || '-'}</div> <div>Pesel</div></label>
                        <label><div className='edit-details'>{phoneNumber || '-'}</div> <div>Numer Telefonu (prefiks +48 dodaje sie automatycznie, poprawny zapis: 111222333)</div></label>
                        <label><div className='edit-details'>{address || '-'}</div> <div>Adres</div></label>
                        <label><div className='edit-details'>{email || '-'}</div> <div>Email</div></label>
                        <label><div className='edit-details'>{conjugateName || '-'}</div><div>Zwrot grzecznościowy do SMS (np. "Panie Ryszardzie", bez nazwiska i do osób prywatnych)</div></label>
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
                    <Link to={{pathname: `/views/addPolicy`, state: {id, name, surname, clientCompany, written: true}}}  className='accept-btn-container'>
                        <NoteAddIcon style={{fontSize: 50}} className='accept-btn'></NoteAddIcon>
                        <span>Dodaj Polisę</span>
                    </Link>
                </div> 
                <div className='accept-container'>
                    <Link to={{pathname: `/views/addPolicy`, state: {id, name, surname, clientCompany, written: false}}}  className='accept-btn-container'>
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
            <PolicyListList clientData={client}></PolicyListList>
        </section>
    </>
    )
}

const PolicyListList = ({clientData}) => {
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

                    // te z dzisiaj daje na początek
                    if (dateForA == 'dziś') return -1
                    if (dateForB == 'dziś') return 1

                    // te po terminie wyrzuca na koniec
                    if (dateForA == 'po terminie') return 1
                    if (dateForB == 'po terminie') return -1

                    //---------------------------------
                    let result = (dateForA < dateForB) ? -1 : (dateForA > dateForB) ? 1 : 0
                    //let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0 // to na sucho do daty końcowej
                    
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
                    if (a[property] === null) return 1
                    if (b[property] === null) return -1
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
                return <PolicyListElement key={policy.policyNumber} index={index} clientData={clientData} policyData={policy}></PolicyListElement>
            }) : <LoadingScreen></LoadingScreen>
        }
    </article>
    )
}

const PolicyListElement = ({index, policyData, clientData}) => {

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

    const invertDate = (date) => {
        let parseDate = new Date(date)
        let day = parseDate.getDate()
        let month = parseDate.getMonth()+1
        let year = parseDate.getFullYear()

        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }

        return `${day}-${month}-${year}` 
    }

    return (
    <div className='policy-list-element'>
        <div className='policy-list-element-option'>
            {index}
        </div>
        <div className='policy-list-element-option'>
            {clientData.clientCompany || `${clientData.surname} ${clientData.name}`}
        </div>
        <div className='policy-list-element-option'>
            {clientData.nip || clientData.pesel || '-'}
        </div>
        <div className='policy-list-element-option'>
            {clientData.address || '-'}
        </div>
        <div className='policy-list-element-option'>
            {policyData.policyCompany || '-'} <br /> {policyData.policyNumber}
        </div>
        <div className='policy-list-element-option'>
            {policyData.policyType}<br />  
            {policyData.typeDetails && policyData.typeDetails.detail1 ? (policyData.typeDetails.detail1  + ' ') : policyData.typeDetails[0] ? (policyData.typeDetails[0]  + ' ') : (' ') + '\ '}
            {policyData.typeDetails && policyData.typeDetails.detail2 ? (policyData.typeDetails.detail2  + ' ') : policyData.typeDetails[1] ? (policyData.typeDetails[1]  + ' ') : (' ') + '\ '}
            {policyData.typeDetails && policyData.typeDetails.detail3 ? (policyData.typeDetails.detail3  + ' ') : policyData.typeDetails[3] ? (policyData.typeDetails[3]  + ' ') : (' ') + '\ '}
            {policyData.typeDetails && policyData.typeDetails.detail5 ? (policyData.typeDetails.detail5  + ' ') : policyData.typeDetails[4] ? (policyData.typeDetails[4]  + ' ') : (' ') + '\ '}
        </div>
        <div className='policy-list-element-option'>
            {(policyData.policyVariant || '-') + (' ') + '\ '} {(((policyData.written === undefined) || (policyData.written !== true))) ? 'oczekująca' : ''}
        </div>
        <div className='policy-list-element-option'>
            {policyData.payment || '-'}<br /> {policyData.amount ? policyData.amount + ' zł' : '-'}<br /> {policyData.installments || '-'}
        </div>
        <div className='policy-list-element-option'>
            {(policyData.policyDateSet && invertDate(policyData.policyDateSet)) || '-'}
        </div>
        <div className='policy-list-element-option'>
            {(policyData.policyDateEnd && invertDate(policyData.policyDateEnd)) || '-'}
        </div>
        <div className='policy-list-element-option'>
            {convertDate(policyData.policyDateSet, policyData.policyDateEnd, policyData.installments)}
        </div>
        <PolicyListElementMessage phoneNumber={clientData.phoneNumber} data={{clientData, policyData}} policyId={policyData._id}></PolicyListElementMessage>
    </div>
    )
}

const PolicyListElementMessage = ({phoneNumber, data, policyId}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const switchPopUp = () => {
        if (isOpen == false) setIsOpen(true)
            else setIsOpen(false)
    }

    return (
        <>
        {isOpen && <PopUpMessage switchPopUp={switchPopUp} data={data}></PopUpMessage>}
        {isOpen2 && <NoteAddComponent openValue={{isOpen2, setIsOpen2}} data={data.policyData}></NoteAddComponent>}
        <div className='policy-list-element-message-container'>
            {phoneNumber || '-'}
            <div className='policy-list-element-message-container-inner'>
                <div className='policy-list-element-message' onClick={() => setIsOpen2(!isOpen2)}>
                    <NoteOutlinedIcon></NoteOutlinedIcon>
                </div>
                {phoneNumber && <div onClick={() => switchPopUp()} className='policy-list-element-message'>
                    SMS
                </div>}
                <Link to={`/views/policyDetails/${policyId}`} className='policy-list-element-message'>
                    <ArrowForwardIosIcon style={{fontSize: 15}}></ArrowForwardIosIcon>
                </Link>
            </div>
        </div>
        </>
    )
}

export default ClientDetails