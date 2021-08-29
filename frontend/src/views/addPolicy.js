import React, { useState, useEffect } from "react"
import {useLocation} from 'react-router-dom'
import ErrorWindow from '../components/ErrorWindow'
import '../styles/addStyles.css'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import { useSelector, useDispatch } from 'react-redux'
import { computeDateToString, computeStringToDate } from '../features/functions/functions'
import { ADD_POLICY_AND_CLIENT, ADD_POLICY, selectClient, statusState, CHANGE_STATUS, getSpecificClient } from '../features/clients/clients'
import Navbar from '../components/Navbar'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"



const AddPolicy = () => {

    const location = useLocation()
    
    const dispatch = useDispatch()
    const clients = useSelector(selectClient)
    const status = useSelector(statusState)

    const [predefinedId, setPredefinedId] = useState('')
    const [predefinedName, setPredefinedName] = useState('')
    const [predefinedSurname, setPredefinedSurname] = useState('')
    const [predefinedClientCompany, setPredefinedClientCompany] = useState('')


    const [isNewClient, setIsNewClient] = useState(false)
    const [existingClientId, setExistingClientId] = useState('')

    const [person, setPerson] = useState({
        name: '',
        surname: '',
        pesel: '',
        phoneNumber: '',
        address: '',
        email: '',
        conjugateName: '',
        clientIsPerson: true,
        clientCompany: '',
        nip: '',
        policy: []
    })

    const [policy, setPolicy] = useState({
        policyNumber: '',
        policyCompany: '',
        policyType: 'komunikacyjna',
        typeDetails: {
            detail1: '',
            detail2: '',
            detail3: '',
            detail4: ''
        },
        policyVariant: '',
        policyDateSet: '',
        policyDateEnd: '',
        payment: 'Gotówka',
        amount: '',
        installments: 'Jednorazowo',
        policyNote: '',
        written: true
    })

    const [search, setSearch] = useState({
        name: '',
        surname: '',
        clientCompany: ''
    })

    useEffect(() => {
        if (location.state) {
            setPredefinedId(location.state.id)
            setPredefinedName(location.state.name)
            setPredefinedSurname(location.state.surname)
            setPredefinedClientCompany(location.state.clientCompany)
            setPolicy({...policy, written: location.state.written})
        }
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isNewClient) {
            const newPolicy = {
                ...person,
                policy: [
                    {...policy}
                ]
            }
            dispatch(ADD_POLICY_AND_CLIENT(newPolicy))
        } else if (!isNewClient) {
            const onlyNewPolicy = {...policy}
            if (existingClientId) {
                dispatch(ADD_POLICY({onlyNewPolicy, existingClientId}))
            } else {
                dispatch(ADD_POLICY({onlyNewPolicy, predefinedId}))
            }
        }
    }

    const clearProps = (object) => {
        for (const key in object) {
            if (key != 'clientIsPerson' && key != 'policy') object[key] = ''
        }
        return object
    }

    if (status == 'success') {
        if (policy.written === false) {
            dispatch(CHANGE_STATUS()) 
            window.location.href = `../views/clientDetails/${predefinedId}`
        } else {
            dispatch(CHANGE_STATUS()) 
            window.location.href = '../views/policyList'
        }
        
    }
    return (
    <>
    <Navbar></Navbar>
        {(status=='failed') && <ErrorWindow></ErrorWindow>}
        <section className='add-container'>
            <article className='add-title'>
                <span>Dodaj Polisę</span>
            </article>


            <form onSubmit={handleSubmit}>


            <article className='add-section'>
                <div className='add-section-title'>
                    <h1>Dane Klienta</h1> 
                </div>

                {predefinedId ? <>
                <br></br>
                <div className='add-section-title'>
                    <h1>{predefinedName} {predefinedSurname} {predefinedClientCompany}</h1>
                </div>
                </> : <>
                <div className='add-section-forms'>
                    <div className='add-section-forms-radio'><input type="radio" name='choseClientType' onClick={() => setIsNewClient(false)} defaultChecked/> Istniejący Klient</div>
                    <div className='add-section-forms-radio'><input type="radio" name='choseClientType' onClick={() => {setIsNewClient(true); setExistingClientId('')}}/> Nowy Klient</div>
                </div> 
            
                { isNewClient ? 
                <>
                <div className='add-section-forms'>
                    <div className='add-section-forms-radio'><input type="radio" name='choseClientStatus' onClick={() => {setPerson(clearProps(person)); setPerson({...person, clientIsPerson: true});}} defaultChecked/> Osoba prywatna</div>
                    <div className='add-section-forms-radio'><input type="radio" name='choseClientStatus' onClick={() => {setPerson(clearProps(person)); setPerson({...person, clientIsPerson: false});}}/> Firma</div>
                </div> 
                <div className='add-section-forms'>
                    {person.clientIsPerson ? 

                    <>
                        <label><input className='input-label' value={person.name} onChange={(e) => setPerson({...person, name: e.target.value})} type="text" required /> <div>Imie*</div></label>
                        <label><input className='input-label' value={person.surname} onChange={(e) => setPerson({...person, surname: e.target.value})} type="text" required /> <div>Nazwisko*</div></label>
                        <label><input className='input-label' value={person.pesel} onChange={(e) => setPerson({...person, pesel: e.target.value})} type="text" /> <div>Pesel</div></label>
                        <label><input className='input-label' value={person.phoneNumber} onChange={(e) => setPerson({...person, phoneNumber: e.target.value})} type="text" /> <div>Numer Telefonu</div></label>
                        <label><input className='input-label' value={person.address} onChange={(e) => setPerson({...person, address: e.target.value})} type="text" /> <div>Adres</div></label>
                        <label><input className='input-label' value={person.email} onChange={(e) => setPerson({...person, email: e.target.value})} type="text" /> <div>Email</div></label>
                        <label><input className='input-label' value={person.conjugateName} onChange={(e) => setPerson({...person, conjugateName: e.target.value})} type="text" /> <div>Odmiana (np. Panie "Ryszardzie")</div></label>
                    </>
                    : 
                    <>
                        <label><input className='input-label' value={person.clientCompany} onChange={(e) => setPerson({...person, clientCompany: e.target.value})} type="text" required /> <div>Nazwa firmy*</div></label>
                        <label><input className='input-label' value={person.nip} onChange={(e) => setPerson({...person, nip: e.target.value})} type="text" /> <div>NIP</div></label>
                        <label><input className='input-label' value={person.name} onChange={(e) => setPerson({...person, name: e.target.value})} type="text" /> <div>Imie właściciela</div></label>
                        <label><input className='input-label' value={person.surname} onChange={(e) => setPerson({...person, surname: e.target.value})} type="text" /> <div>Nazwisko właściciela</div></label>
                        <label><input className='input-label' value={person.pesel} onChange={(e) => setPerson({...person, pesel: e.target.value})} type="text" /> <div>Pesel</div></label>
                        <label><input className='input-label' value={person.phoneNumber} onChange={(e) => setPerson({...person, phoneNumber: e.target.value})} type="text" /> <div>Numer Telefonu</div></label>
                        <label><input className='input-label' value={person.address} onChange={(e) => setPerson({...person, address: e.target.value})} type="text" /> <div>Adres</div></label>
                        <label><input className='input-label' value={person.email} onChange={(e) => setPerson({...person, email: e.target.value})} type="text" /> <div>Email</div></label>
                        <label><input className='input-label' value={person.conjugateName} onChange={(e) => setPerson({...person, conjugateName: e.target.value})} type="text" /> <div>Odmiana (np. Panie "Ryszardzie")</div></label>
                    </>
                    
                    }

                </div>
                </>
                : 
                <>
                <div className='add-section-forms'>
                    <label><input className='input-label' value={search.name} onChange={(e) => {setSearch({...search, name: e.target.value}); dispatch(getSpecificClient({type: 'name', value: e.target.value}))}} type="text" /> <div>Imie</div></label>
                    <label><input className='input-label' value={search.surname} onChange={(e) => {setSearch({...search, surname: e.target.value}); dispatch(getSpecificClient({type: 'surname', value: e.target.value}))}} type="text" /> <div>Nazwisko</div></label>
                    <label><input className='input-label' value={search.clientCompany} onChange={(e) => {setSearch({...search, clientCompany: e.target.value}); dispatch(getSpecificClient({type: 'clientCompany', value: e.target.value}))}} type="text" /> <div>Nazwa firmy</div></label>
                </div>

                {/* podręczna lista istniejących klientów */}
                <div className='add-section-forms'>
                    Zaznacz klienta z listy:
                </div>
                <div className='add-section-forms existing-client-list'>
                    {
                        (search.name || search.surname || search.clientCompany) ? clients.map((client) => {
                            if (search.name.search("[\\[\\]?*+|{}\\\\()@.\n\r]") && search.surname.search("[\\[\\]?*+|{}\\\\()@.\n\r]") && search.clientCompany.search("[\\[\\]?*+|{}\\\\()@.\n\r]")) {
                                const reName = new RegExp('^'+search.name.toLowerCase())
                                const reSurname = new RegExp('^'+search.surname.toLowerCase())
                                const reClientCompany = new RegExp('^'+search.clientCompany.toLowerCase())
                                

                                return ((search.name ? reName.test(client.name.toLowerCase()) : true) && 
                                        (search.surname ? reSurname.test(client.surname.toLowerCase()) : true) &&
                                        (search.clientCompany ? client.clientCompany ? reClientCompany.test(client.clientCompany.toLowerCase()) : false : true)) 
                                        && <div onClick={(e) => {
                                                setExistingClientId(client.id); 
                                                document.querySelectorAll('.existing-client-list-element').forEach((element) => {
                                                    element.style.backgroundColor = 'rgba(255, 255, 255, 1)'
                                                })
                                                e.target.parentElement.style.backgroundColor == 'rgba(0, 180, 219, 0.3)' ? 
                                                e.target.parentElement.style.backgroundColor = 'rgba(255, 255, 255, 1)' : 
                                                e.target.parentElement.style.backgroundColor = 'rgba(0, 180, 219, 0.3)'
                                                setExistingClientId(client._id)
                                            }} className='existing-client-list-element' key={client._id}>
                                    <div>{client.clientCompany ? ' ' : client.name}</div>
                                    <div>{client.clientCompany || client.surname}</div>
                                    <div>{client.nip || client.pesel || '-'}</div>
                                    <div>{client.address || '-'}</div>
                                    <div>{client.email || '-'}</div>
                                    <div>{client.phoneNumber || '-'}</div>
                                </div>
                            }

                        }) : <div className='existing-client-list-element'>
                            <div>Wpisz dane Klienta żeby wyszukać go z listy</div>
                        </div>
                    }
                </div>
                    
                </>
                
            }
            </>
            }

            </article>
            <article className='add-section'>
                <div className='add-section-title'>
                    <h1>Dane Polisy</h1> 
                </div>   
                <div className='add-section-forms'>
                    <label><input className='input-label' value={policy.policyNumber} onChange={(e) => setPolicy({...policy, policyNumber: e.target.value})} type="text" required  /> <div>Numer Polisy*</div></label>
                    <label>
                        <select className='input-label' value={policy.policyCompany} onChange={(e) => setPolicy({...policy, policyCompany: e.target.value || ''})}>
                            <option defaultValue></option>
                            <option>Allianz</option>
                            <option>Aviva</option>
                            <option>Axa</option>
                            <option>Balcia</option>
                            <option>Benefia</option>
                            <option>Bre Ubezpieczenia (mBank)</option>
                            <option>Compensa</option>
                            <option>Concordia</option>
                            <option>Ergo Hestia</option>
                            <option>Gefion</option>
                            <option>Generali</option>
                            <option>InterRisk</option>
                            <option>Link4</option>
                            <option>MTU</option>
                            <option>Proama</option>
                            <option>PZU</option>
                            <option>TUW Pocztowe</option>
                            <option>TUW TUW</option>
                            <option>TUW WUZ</option>
                            <option>Uniqa</option>
                            <option>VH Polska</option>
                            <option>Warta/HDI</option>
                            <option>WIENER</option>
                            <option>You Can Drive</option>
                        </select> <div>Towarzystwo </div> 
                    </label> 
                    <label><input className='input-label' value={policy.policyVariant} onChange={(e) => setPolicy({...policy, policyVariant: e.target.value})} type="text" /> <div>Typ</div></label>
                    <label>
                        <select className='input-label' value={policy.policyType} onChange={(e) => setPolicy({...policy, typeDetails: {detail1: '', detail2: '', detail3: '', detail4: ''}, policyType: e.target.value})}>
                            <option defaultChecked>komunikacyjna</option>
                            <option>zdrowotna</option>
                            <option>gospodarcza</option>
                            <option>turystyczna</option>
                            <option>uprawy</option>
                            <option>dom/mieszkanie</option>
                            <option>rolna</option>
                            <option>życie</option>
                            <option>firma</option>
                        </select> <div>Rodzaj </div> 
                    </label>
                </div>

                {/* ---------formularze zależne od typu--------- */}

                {policy.policyType == 'komunikacyjna' ?                
                <div className='add-section-forms type-form'>
                    <label><input className='input-label' value={policy.typeDetails.detail1} onChange={(e) => setPolicy({...policy, typeDetails: {...typeDetails, detail1: e.target.value}})} type="text" /> <div>Numer Rejestracyjny</div></label>
                    <label><input className='input-label' value={policy.typeDetails.detail2} onChange={(e) => setPolicy({...policy, typeDetails: {...typeDetails, detail2: e.target.value}})} type="text" /> <div>Marka</div></label>
                    <label><input className='input-label' value={policy.typeDetails.detail3} onChange={(e) => setPolicy({...policy, typeDetails: {...typeDetails, detail3: e.target.value}})} type="text" /> <div>Model</div></label>
                    <label>
                        <select className='input-label' value={policy.typeDetails.detail4} onChange={(e) => setPolicy({...policy, typeDetails: {...typeDetails, detail4: e.target.value}})}>
                            <option defaultValue></option>
                            <option>Osobowy</option>
                            <option>Ciężarowy</option>
                        </select> <div>Typ pojazdu</div> 
                    </label>
                </div> :
                <div className='add-section-forms type-form'>
                    <label><input className='input-label' value={policy.typeDetails.detail1} onChange={(e) => setPolicy({...policy, typeDetails: {...typeDetails, detail1: e.target.value}})} type="text" /> <div>Szczegóły</div></label>
                </div> 
                }


                {/* --------------------------------------------- */}

            </article>
            <article className='add-section'>
                <div className='add-section-title'>
                    <h1>Okres Polisy</h1> 
                </div>   
                <div className='add-section-forms type-form'>
                    <label><DatePicker className='input-label' placeholderText='dzień-miesiąc-rok' onChange={(date) => setPolicy({...policy, policyDateSet: computeDateToString(date, false), policyDateEnd: computeDateToString(date, true) })} selected={computeStringToDate(policy.policyDateSet)} dateFormat="dd-MM-yyyy" required></DatePicker> <div>do*</div></label>
                    <label><DatePicker className='input-label' placeholderText='dzień-miesiąc-rok' onChange={(date) => setPolicy({...policy, policyDateEnd: computeDateToString(date, false)})} selected={computeStringToDate(policy.policyDateEnd)} dateFormat="dd-MM-yyyy" required></DatePicker> <div>do*</div></label>
                </div>
            </article>
            <article className='add-section'>
                <div className='add-section-title'>
                    <h1>Płatność</h1> 
                </div>   
                <div className='add-section-forms'>
                    <label><input className='input-label' value={policy.amount} onChange={(e) => setPolicy({...policy, amount: e.target.value})} type="number" min="1" step="any" /> <div>Kwota</div></label>
                </div>
                <div className='add-section-forms'>
                    <label>
                        <select className='input-label' value={policy.installments} onChange={(e) => setPolicy({...policy, installments: e.target.value})}>
                            <option defaultValue>Jednorazowo</option>
                            <option>Pół roku</option>
                            <option>Kwartał</option>
                        </select> <div> Raty</div> 
                    </label>
                </div>
                <div className='add-section-forms'>
                    <div className='add-section-forms-radio'><input type="radio" name='paymentType' onClick={(e) => setPolicy({...policy, payment: 'Gotówka'})} defaultChecked/> Gotówka</div>
                    <div className='add-section-forms-radio'><input type="radio" name='paymentType' onClick={(e) => setPolicy({...policy, payment: 'Przelew'})} /> Przelew</div>
                </div>

                

            </article>
            <article className='add-section'>
                <div className='add-section-title'>
                    <h1>Zatwierdzenie</h1> 
                </div>
                <div className='accept-container'>
                    <button type='submit' className='accept-btn-container'>
                        <NoteAddIcon style={{fontSize: 50}} className='accept-btn'></NoteAddIcon>
                        <span>Dodaj Polisę</span>
                    </button>
                </div>
            </article>


            </form>


        </section>
    </>
    )
}

export default AddPolicy