import React, { useState, useEffect } from "react"
import {useLocation} from 'react-router-dom'
import ErrorWindow from '../components/errorWindow'
import '../styles/addStyles.css'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_POLICY_AND_CLIENT, ADD_POLICY, selectClient, statusState, CHANGE_STATUS, getSpecificClient } from '../features/clients/clients'
import Navbar from '../components/navbar'
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
    const [written, setWritten] = useState(true)

    useEffect(() => {
        if (location.state) {
            setPredefinedId(location.state.id)
            setPredefinedName(location.state.name)
            setPredefinedSurname(location.state.surname)
            setPredefinedClientCompany(location.state.clientCompany)
            setWritten(location.state.written)
        }
    }, [])
    

    const [isNewClient, setIsNewClient] = useState(false)
    const [existingClientId, setExistingClientId] = useState('')






    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [pesel, setPesel] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [conjugateName, setConjugateName] = useState('')


    const [policyNumber, setPolicyNumber] = useState('')
    const [policyCompany, setPolicyCompany] = useState('')

    const [policyType, setPolicyType] = useState('komunikacyjna')
    const [typeDetailSt, setTypeDetailsSt] = useState('')
    const [typeDetailNd, setTypeDetailsNd] = useState('')
    const [typeDetailRd, setTypeDetailsRd] = useState('')
    const [typeDetailTh, setTypeDetailsTh] = useState('')
    const [typeDetail5Th, setTypeDetails5Th] = useState('')
    const [policyVariant, setPolicyVariant] = useState('')

    const [policyConfirmDate, setPolicyConfirmDate] = useState('')
    const [policyDateSet, setPolicyDateSet] = useState(null)
    const [policyDateEnd, setPolicyDateEnd] = useState(null)

    const [payment, setPayment] = useState('Gotówka')
    const [amount, setAmount] = useState('')
    const [installments, setInstallments] = useState('Jednorazowo')


    const [clientIsPerson, setClientIsPerson] = useState(true)

    const [clientCompany, setClientCompany] = useState('')
    const [nip, setNip] = useState('')

    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (((name && surname) || clientCompany) && policyNumber && isNewClient) {
            if (clientIsPerson) {
                const newPolicy = {
                    name,
                    surname,
                    pesel: pesel || null,
                    phoneNumber: phoneNumber || null,
                    address: address || null,
                    email: email || null,
                    conjugateName: conjugateName || null,
                    policy: [
                        {
                            policyNumber,
                            policyCompany: policyCompany || null,
                            policyType,
                            typeDetails: (policyType=='komunikacyjna') ? 
                                [typeDetailSt || null, typeDetailNd || null, typeDetailRd || null, null, typeDetail5Th || null] : 
                                [typeDetailSt || null],
                            policyVariant: policyVariant || null,
                            policyConfirmDate: policyConfirmDate || null,
                            policyDateSet: policyDateSet.toString(),
                            policyDateEnd: policyDateEnd.toString(),
                            payment,
                            amount: amount || null,
                            installments: installments || null,
                            written
                        }
                    ]
                }
                dispatch(ADD_POLICY_AND_CLIENT(newPolicy))
            } else if (!clientIsPerson) {
                const newPolicy = {
                    clientCompany,
                    nip: nip || null,
                    name: name || null,
                    surname: surname || null,
                    pesel: pesel || null,
                    phoneNumber: phoneNumber || null,
                    address: address || null,
                    email: email || null,
                    conjugateName: conjugateName || null,
                    policy: [
                        {
                            policyNumber,
                            policyCompany: policyCompany || null,
                            policyType,
                            typeDetails: (policyType=='komunikacyjna') ? 
                                [typeDetailSt || null, typeDetailNd || null, typeDetailRd || null, null, typeDetail5Th || null] : 
                                [typeDetailSt || null],
                            policyVariant: policyVariant || null,
                            policyConfirmDate: policyConfirmDate || null,
                            policyDateSet: policyDateSet.toString(),
                            policyDateEnd: policyDateEnd.toString(),
                            payment,
                            amount: amount || null,
                            installments: installments || null,
                            written
                        }
                    ]
                }
                dispatch(ADD_POLICY_AND_CLIENT(newPolicy))
            } else {
                console.log('uzupełnij dane')
            }
            
        } else if (!isNewClient) {
            const onlyNewPolicy = {
                        policyNumber,
                        policyCompany: policyCompany || null,
                        policyType,
                        typeDetails: (policyType=='komunikacyjna') ? 
                            [typeDetailSt || null, typeDetailNd || null, typeDetailRd || null, null, typeDetail5Th || null] : 
                            [typeDetailSt || null],
                        policyVariant: policyVariant || null,
                        policyConfirmDate: policyConfirmDate || null,
                        policyDateSet: policyDateSet.toString(),
                        policyDateEnd: policyDateEnd.toString(),
                        payment,
                        amount: amount || null,
                        installments: installments || null,
                        written
                    }
            if (existingClientId) {
                dispatch(ADD_POLICY({onlyNewPolicy, existingClientId}))
            } else {
                dispatch(ADD_POLICY({onlyNewPolicy, predefinedId}))
            }
        } else {
            console.log('uzupełnij dane')
        }
    }

    const capitalizeStLetter = (word) => {
        return word && word[0].toUpperCase() + word.slice(1);
    }

    const computeDate = (date) => {
        return new Date(date.getFullYear()+1, date.getMonth(), date.getDate()-1)
    }

    if (status == 'success') {
        if (written === false) {
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
                    <div className='add-section-forms-radio'><input type="radio" name='choseClientStatus' onClick={() => setClientIsPerson(true)} defaultChecked/> Osoba prywatna</div>
                    <div className='add-section-forms-radio'><input type="radio" name='choseClientStatus' onClick={() => setClientIsPerson(false)}/> Firma</div>
                </div> 
                <div className='add-section-forms'>
                    {clientIsPerson ? 

                    <>
                        <label><input className='input-label' value={name} onChange={(e) => setName(capitalizeStLetter(e.target.value))} type="text" required /> <div>Imie*</div></label>
                        <label><input className='input-label' value={surname} onChange={(e) => setSurname(capitalizeStLetter(e.target.value))} type="text" required /> <div>Nazwisko*</div></label>
                        <label><input className='input-label' value={pesel} onChange={(e) => setPesel(e.target.value)} type="text" /> <div>Pesel</div></label>
                        <label><input className='input-label' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" /> <div>Numer Telefonu</div></label>
                        <label><input className='input-label' value={address} onChange={(e) => setAddress(e.target.value)} type="text" /> <div>Adres</div></label>
                        <label><input className='input-label' value={email} onChange={(e) => setEmail(e.target.value)} type="text" /> <div>Email</div></label>
                        <label><input className='input-label' value={conjugateName} onChange={(e) => setConjugateName(e.target.value)} type="text" /> <div>Odmiana (np. Panie "Ryszardzie")</div></label>
                    </>
                    : 
                    <>
                        <label><input className='input-label' value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} type="text" required /> <div>Nazwa firmy*</div></label>
                        <label><input className='input-label' value={nip} onChange={(e) => setNip(e.target.value)} type="text" /> <div>NIP</div></label>
                        <label><input className='input-label' value={name} onChange={(e) => setName(capitalizeStLetter(e.target.value))} type="text" /> <div>Imie właściciela</div></label>
                        <label><input className='input-label' value={surname} onChange={(e) => setSurname(capitalizeStLetter(e.target.value))} type="text" /> <div>Nazwisko właściciela</div></label>
                        <label><input className='input-label' value={pesel} onChange={(e) => setPesel(e.target.value)} type="text" /> <div>Pesel</div></label>
                        <label><input className='input-label' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" /> <div>Numer Telefonu</div></label>
                        <label><input className='input-label' value={address} onChange={(e) => setAddress(e.target.value)} type="text" /> <div>Adres</div></label>
                        <label><input className='input-label' value={email} onChange={(e) => setEmail(e.target.value)} type="text" /> <div>Email</div></label>
                        <label><input className='input-label' value={conjugateName} onChange={(e) => setConjugateName(e.target.value)} type="text" /> <div>Odmiana (np. Panie "Ryszardzie")</div></label>
                    </>
                    
                    }

                </div>
                </>
                : 
                <>
                <div className='add-section-forms'>
                    <label><input className='input-label' value={name} onChange={(e) => {setName(e.target.value); dispatch(getSpecificClient({type: 'name', value: e.target.value}))}} type="text" /> <div>Imie</div></label>
                    <label><input className='input-label' value={surname} onChange={(e) => {setSurname(e.target.value); dispatch(getSpecificClient({type: 'surname', value: e.target.value}))}} type="text" /> <div>Nazwisko</div></label>
                    <label><input className='input-label' value={clientCompany} onChange={(e) => {setClientCompany(e.target.value); dispatch(getSpecificClient({type: 'clientCompany', value: e.target.value}))}} type="text" /> <div>Nazwa firmy</div></label>
                </div>

                {/* podręczna lista istniejących klientów */}
                <div className='add-section-forms'>
                    Zaznacz klienta z listy:
                </div>
                <div className='add-section-forms existing-client-list'>
                    {
                        (name || surname || clientCompany) ? clients.map((client) => {
                            if (name.search("[\\[\\]?*+|{}\\\\()@.\n\r]") && surname.search("[\\[\\]?*+|{}\\\\()@.\n\r]") && clientCompany.search("[\\[\\]?*+|{}\\\\()@.\n\r]")) {
                                const reName = new RegExp('^'+name.toLowerCase())
                                const reSurname = new RegExp('^'+surname.toLowerCase())
                                const reClientCompany = new RegExp('^'+clientCompany.toLowerCase())
                                

                                return ((name ? reName.test(client.name.toLowerCase()) : true) && 
                                        (surname ? reSurname.test(client.surname.toLowerCase()) : true) &&
                                        (clientCompany ? client.clientCompany ? reClientCompany.test(client.clientCompany.toLowerCase()) : false : true)) 
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
                    <label><input className='input-label' value={policyNumber} onChange={(e) => setPolicyNumber(e.target.value)} type="text" required  /> <div>Numer Polisy*</div></label>
                    <label>
                        <select className='input-label' value={policyCompany} onChange={(e) => setPolicyCompany(e.target.value)}>
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
                        {/* <input className='input-label' value={policyCompany} onChange={(e) => setPolicyCompany(e.target.value)} type="text" /> <div>Towarzystwo</div>*/}
                    <label><input className='input-label' value={policyVariant} onChange={(e) => setPolicyVariant(e.target.value)} type="text" /> <div>Typ</div></label>
                    <label>
                        <select className='input-label' value={policyType} onChange={(e) => {setPolicyType(e.target.value); setTypeDetailsSt('')}}>
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

                {policyType == 'komunikacyjna' ?                
                <div className='add-section-forms type-form'>
                    <label><input className='input-label' value={typeDetailSt} onChange={(e) => setTypeDetailsSt(e.target.value)} type="text" /> <div>Numer Rejestracyjny</div></label>
                    <label><input className='input-label' value={typeDetailNd} onChange={(e) => setTypeDetailsNd(e.target.value)} type="text" /> <div>Marka</div></label>
                    <label><input className='input-label' value={typeDetailRd} onChange={(e) => setTypeDetailsRd(e.target.value)} type="text" /> <div>Model</div></label>
                    <label>
                        <select className='input-label' value={typeDetail5Th} onChange={(e) => setTypeDetails5Th(e.target.value)}>
                            <option defaultValue></option>
                            <option>Osobowy</option>
                            <option>Ciężarowy</option>
                        </select> <div>Typ pojazdu</div> 
                    </label>
                </div> :
                <div className='add-section-forms type-form'>
                    <label><input className='input-label' value={typeDetailSt} onChange={(e) => setTypeDetailsSt(e.target.value)} type="text" /> <div>Szczegóły</div></label>
                </div> 
                }


                {/* --------------------------------------------- */}

            </article>
            <article className='add-section'>
                <div className='add-section-title'>
                    <h1>Okres Polisy</h1> 
                </div>   
                <div className='add-section-forms type-form'>
                    <label><DatePicker className='input-label' placeholderText='dzień-miesiąc-rok' onChange={(date) => {setPolicyDateSet(date); setPolicyDateEnd(computeDate(date))}} selected={policyDateSet} dateFormat="dd-MM-yyyy" required></DatePicker> <div>do*</div></label>
                    <label><DatePicker className='input-label' placeholderText='dzień-miesiąc-rok' onChange={(date) => setPolicyDateEnd(date)} selected={policyDateEnd} dateFormat="dd-MM-yyyy" required></DatePicker> <div>do*</div></label>
                    
                </div>
            </article>
            <article className='add-section'>
                <div className='add-section-title'>
                    <h1>Płatność</h1> 
                </div>   
                <div className='add-section-forms'>
                    <label><input className='input-label' value={amount} onChange={(e) => setAmount(e.target.value)} type="number" min="1" step="any" /> <div>Kwota</div></label>
                </div>
                <div className='add-section-forms'>
                    <label>
                        <select className='input-label' value={installments} onChange={(e) => setInstallments(e.target.value)}>
                            <option defaultValue>Jednorazowo</option>
                            <option>Pół roku</option>
                            <option>Kwartał</option>
                        </select> <div> Raty</div> 
                    </label>
                </div>
                <div className='add-section-forms'>
                    <div className='add-section-forms-radio'><input type="radio" name='paymentType' onClick={(e) => setPayment('Gotówka')} defaultChecked/> Gotówka</div>
                    <div className='add-section-forms-radio'><input type="radio" name='paymentType' onClick={(e) => setPayment('Przelew')} /> Przelew</div>
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