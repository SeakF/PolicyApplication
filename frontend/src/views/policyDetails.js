import React, {useEffect, useState} from "react"
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import LoadingScreen from '../components/LoadingScreen'
import { useSelector, useDispatch } from 'react-redux'
import { computeDateToString, computeStringToDate, generatePdf, addMonth } from '../features/functions/functions'
import { DELETE_POLICY, EDIT_POLICY, selectClient, statusState, getSpecificClient } from '../features/clients/clients'
import ErrorWindow from '../components/ErrorWindow'
import '../styles/addStyles.css'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import DeleteIcon from '@material-ui/icons/Delete'
import PersonIcon from '@material-ui/icons/Person'
import Navbar from '../components/Navbar'
import DescriptionIcon from '@material-ui/icons/Description'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import NoteAddIcon from '@material-ui/icons/NoteAdd'

const PolicyDetails = () => {

    let params = useParams()

    const dispatch = useDispatch()
    const clients = useSelector(selectClient)
    const status = useSelector(statusState)

    const [client, setClient] = useState({})
    const [id, setId] = useState('')

    const [person, setPerson] = useState({
        name: '',
        surname: '',
        address: ''
    })

    const [policy, setPolicy] = useState({
        policyNumber: '',
        company: '',
        policyType: '',
        typeDetails: {
            detail1: '',
            detail2: '',
            detail3: '',
            detail4: ''
        },
        policyVariant: '',
        policyDateSet: '',
        policyDateEnd: '',
        payment: '',
        amount: '',
        installments: '',
        written: '',
        note: ''
    })

    const [subPolicy, setSubPolicy] = useState({
        policyNumber: '',
        company: '',
        policyType: '',
        typeDetails: {
            detail1: '',
            detail2: '',
            detail3: '',
            detail4: ''
        },
        policyVariant: '',
        policyDateSet: '',
        policyDateEnd: '',
        payment: '',
        amount: '',
        installments: '',
        written: '',
        note: ''
    })

    const [policyId, setPolicyId] = useState('')

    
    const [edit, setEdit] = useState(false)
    const [show, setShow] = useState(false)
    
    useEffect(() => {
        const load = () => {
            let foundPolicy = null
            let foundClient = null

            clients.forEach((client) => {
                if (client.policy.find((policy) => policy._id === params[0])) {
                    foundClient = client
                    foundPolicy = client.policy.find((policy) => policy._id === params[0])
                }
            })
            

            if (foundPolicy && foundClient) {
                setClient(foundClient)
                setPolicy(foundPolicy)

                setId(foundClient._id)
                setPerson({
                    ...person,
                    name: foundClient.name,
                    surname: foundClient.surname,
                    address: foundClient.address 
                })

                setPolicyId(foundPolicy._id)
                setPolicy({
                    policyNumber: foundPolicy.policyNumber,
                    policyCompany: foundPolicy.policyCompany,
                    policyType: foundPolicy.policyType,
                    typeDetails: {
                        detail1: foundPolicy.typeDetails.detail1,
                        detail2: foundPolicy.typeDetails.detail2,
                        detail3: foundPolicy.typeDetails.detail3,
                        detail4: foundPolicy.typeDetails.detail4
                    },
                    policyVariant: foundPolicy.policyVariant,
                    policyDateSet: foundPolicy.policyDateSet,
                    policyDateEnd: foundPolicy.policyDateEnd,
                    payment: foundPolicy.payment,
                    amount: foundPolicy.amount,
                    installments: foundPolicy.installments,
                    note: foundPolicy.note,
                    written: foundPolicy.written
                })
                setSubPolicy({
                    policyNumber: foundPolicy.policyNumber,
                    policyCompany: foundPolicy.policyCompany,
                    policyType: foundPolicy.policyType,
                    typeDetails: {
                        detail1: foundPolicy.typeDetails.detail1,
                        detail2: foundPolicy.typeDetails.detail2,
                        detail3: foundPolicy.typeDetails.detail3,
                        detail4: foundPolicy.typeDetails.detail4
                    },
                    policyVariant: foundPolicy.policyVariant,
                    policyDateSet: foundPolicy.policyDateSet,
                    policyDateEnd: foundPolicy.policyDateEnd,
                    payment: foundPolicy.payment,
                    amount: foundPolicy.amount,
                    installments: foundPolicy.installments,
                    note: foundPolicy.note,
                    written: foundPolicy.written
                })

            } else {
                dispatch(getSpecificClient({type: 'policy._id', value: params[0]}))
            }
        }
        load()
    }, [clients])

    const saveSubs = () => {
        const editedPolicy = {
            policyId,
            ...subPolicy,
        }
        setPolicy({...subPolicy})
        dispatch(EDIT_POLICY({editedPolicy, id}))
        window.location.reload()
    }

    const clearSubs = () => {
        setSubPolicy({...policy})
    } 

    const deletePolicy = (policyNumber) => {
        dispatch(DELETE_POLICY({policyNumber, id, policyId}))
        window.location.href = '../policyList'
    }

    const saveAsSpecific = (boolean) => {
        const editedPolicy = {
            policyId,
            ...subPolicy,
            written: boolean
        }
        setPolicy({...subPolicy})
        dispatch(EDIT_POLICY({editedPolicy, id}))
        window.location.reload()
    }
    
    if (!policy.policyNumber) {
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
                {(status=='failed') && <ErrorWindow></ErrorWindow>}
                {show && <section className='confirm-delete'>
                    <div className='confirm-delete-cont'>
                        Czy na pewno chcesz usunąć polisę?
                        <div className='accept-container'>
                            <div className='delete-btn-container' onClick={() => deletePolicy(policy.policyNumber)}>
                                <DeleteIcon style={{fontSize: 50}} className='accept-btn'></DeleteIcon>
                                <span>Usuń Polisę</span>
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
                        <span>{policy.policyNumber || 'numer polisy'}</span>
                    </article>
                    <article className='add-section'>
                        <div className='add-section-title'>
                            <h1>Dane Polisy</h1> 
                        </div>      
                        <div className='add-section-forms'>
                            <label><div className='edit-details'>{person.name}</div> <div>Imie</div></label>
                            <label><div className='edit-details'>{person.surname}</div> <div>Nazwisko</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPolicy({...subPolicy, policyNumber: e.target.value})} value={subPolicy.policyNumber}></input> <div>Numer*</div></label>
                            <label>
                                <select className='edit-details' value={subPolicy.policyCompany} onChange={(e) => setSubPolicy({...subPolicy, policyCompany: e.target.value || ''})}>
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
                            <label><DatePicker className='edit-details' placeholderText='dzień-miesiąc-rok' onChange={(date) => setSubPolicy({...subPolicy, policyDateSet: computeDateToString(date, false)})} selected={computeStringToDate(subPolicy.policyDateSet)} dateFormat="dd-MM-yyyy" required></DatePicker> <div>od*</div></label>
                            <label><DatePicker className='edit-details' placeholderText='dzień-miesiąc-rok' onChange={(date) => setSubPolicy({...subPolicy, policyDateEnd: computeDateToString(date, false)})} selected={computeStringToDate(subPolicy.policyDateEnd)} dateFormat="dd-MM-yyyy" required></DatePicker> <div>do*</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPolicy({...subPolicy, policyVariant: e.target.value})} value={subPolicy.policyVariant}></input> <div>Typ</div></label>
                        </div>  
                        <div className='add-section-forms'>
                            <label>
                                <select className='edit-details' onChange={(e) => setSubPolicy({...subPolicy, policyType: e.target.value, typeDetails: {detail1: '', detail2: '', detail3: '', detail4: ''}})} value={subPolicy.policyType}>
                                    <option>komunikacyjna</option>
                                    <option>zdrowotna</option>
                                    <option>gospodarcza</option>
                                    <option>turystyczna</option>
                                    <option>uprawy</option>
                                    <option>dom/mieszkanie</option>
                                    <option>rolna</option>
                                    <option>życie</option>
                                    <option>firma</option>
                                </select> <div>Rodzaj ubezpieczenia</div> 
                            </label>
                        </div>
                        {subPolicy.policyType == 'komunikacyjna' ?
                            <div className='add-section-forms type-form'>
                                <label><input className='edit-details' onChange={(e) => setSubPolicy({...subPolicy, typeDetails: {...subPolicy.typeDetails, detail1: e.target.value}})} value={subPolicy.typeDetails.detail1}></input> <div>Numer Rejestracyjny</div></label>
                                <label><input className='edit-details' onChange={(e) => setSubPolicy({...subPolicy, typeDetails: {...subPolicy.typeDetails, detail2: e.target.value}})} value={subPolicy.typeDetails.detail2}></input> <div>Marka</div></label>
                                <label><input className='edit-details' onChange={(e) => setSubPolicy({...subPolicy, typeDetails: {...subPolicy.typeDetails, detail3: e.target.value}})} value={subPolicy.typeDetails.detail3}></input> <div>Model</div></label>
                                <label>
                                    <select className='edit-details' onChange={(e) => setSubPolicy({...subPolicy, typeDetails: {...subPolicy.typeDetails, detail4: e.target.value}})} value={subPolicy.typeDetails.detail4}>
                                        <option defaultValue>Osobowy</option>
                                        <option>Ciężarowy</option>
                                    </select> <div>Typ pojazdu</div> 
                                </label>
                            </div> : 
                            <div className='add-section-forms type-form'>
                                <label><input className='edit-details' onChange={(e) => setSubPolicy({...subPolicy, typeDetails: {...subPolicy.typeDetails, detail1: e.target.value}})} value={subPolicy.typeDetails.detail1}></input> <div>Szczegóły</div></label>
                            </div>
                        }

                        <div className='add-section-forms'>
                                <label>
                                    <select className='edit-details' onChange={(e) => setSubPolicy({...subPolicy, payment: e.target.value})} value={subPolicy.payment}>
                                        <option>Gotówka</option>
                                        <option>Przelew</option>
                                    </select> <div>Płatność</div> 
                                </label>
                                <label><input className='edit-details' onChange={(e) => setSubPolicy({...subPolicy, amount: e.target.value})} value={subPolicy.amount} type="number" min="1" step="any" ></input> <div>Kwota</div></label>
                                <label><input className='edit-details' onChange={(e) => setSubPolicy({...subPolicy, installments: e.target.value})} value={subPolicy.installments}></input> <div>Raty</div></label>
                        </div>



                        <br />
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
                                <span>Usuń Polisę</span>
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
                <span>{policy.policyNumber}</span>
            </article>
            <article className='add-section'>
                <div className='add-section-title'>
                    <h1>Dane Polisy</h1> 
                </div>      
                <div className='add-section-forms'>
                    <label><div className='edit-details'>{person.name || '-'}</div> <div>Imie*</div></label>
                    <label><div className='edit-details'>{person.surname || '-'}</div> <div>Nazwisko*</div></label>
                    <label><div className='edit-details'>{policy.policyNumber || '-'}</div> <div>Numer*</div></label>
                    <label><div className='edit-details'>{policy.policyCompany || '-'}</div> <div>Towarzystwo</div></label>
                    <label><div className='edit-details'>{addMonth(policy.policyDateSet) || '-'}</div> <div>od*</div></label>
                    <label><div className='edit-details'>{addMonth(policy.policyDateEnd) || '-'}</div> <div>do*</div></label>
                    <label><div className='edit-details'>{policy.policyVariant || '-'}</div> <div>Typ</div></label>
                </div>  
                <div className='add-section-forms'>
                    <label><div className='edit-details'>{policy.policyType || '-'}</div> <div>Rodzaj ubezpieczenia</div></label>
                </div>
                {policy.policyType == 'komunikacyjna' ?
                    <div className='add-section-forms type-form'>
                        <label><div className='edit-details'>{policy.typeDetails.detail1 || '-'}</div> <div>Numer Rejestracyjny</div></label>
                        <label><div className='edit-details'>{policy.typeDetails.detail2 || '-'}</div> <div>Marka</div></label>
                        <label><div className='edit-details'>{policy.typeDetails.detail3 || '-'}</div> <div>Model</div></label>
                        <label><div className='edit-details'>{policy.typeDetails.detail4 || '-'}</div> <div>Typ pojazdu</div></label>
                    </div> : 
                    <div className='add-section-forms type-form'>
                        <label><div className='edit-details'>{policy.typeDetails.detail1 || '-'}</div> <div>Szczegóły</div></label>
                    </div>
                }
                <div className='add-section-forms'>
                    <label><div className='edit-details'>{policy.payment || '-'}</div> <div>Płatność</div></label>
                    <label><div className='edit-details'>{policy.amount + ' zł' || '-'}</div> <div>Kwota</div></label>
                    <label><div className='edit-details'>{policy.installments  || '-'}</div> <div>Raty</div></label>
                </div>



                <br />
                { (((policy.written === undefined) || (policy.written !== true))) ? <div className='accept-container'>
                    <div className='accept-btn-container' onClick={() => saveAsSpecific(true)}>
                        <NoteAddIcon style={{fontSize: 50}} className='accept-btn'></NoteAddIcon>
                        <span>Dodaj do listy polis</span>
                    </div>
                </div> 
                :
                <div className='accept-container'>
                    <div className='accept-btn-container' onClick={() => saveAsSpecific(false)}>
                        <NoteAddIcon style={{fontSize: 50}} className='accept-btn'></NoteAddIcon>
                        <span>Dodaj do oczek.</span>
                    </div>
                </div> 
                }
                <div className='accept-container'>
                    <div className='accept-btn-container' onClick={() => setEdit(!edit)}>
                        <EditIcon style={{fontSize: 50}} className='accept-btn'></EditIcon>
                        <span>Edytuj</span>
                    </div>
                </div> 
                <div className='accept-container'>
                    <div className='accept-btn-container' onClick={() => generatePdf({name: person.name, 
                                                                                    surname: person.surname, 
                                                                                    address: person.address, 
                                                                                    company: policy.company, 
                                                                                    typeDetails: policy.typeDetails, 
                                                                                    policyNumber: policy.policyNumber, 
                                                                                    policyDateSet: policy.policyDateSet, 
                                                                                    policyDateEnd: policy.policyDateEnd, 
                                                                                    policyType: policy.policyType})}>
                        <DescriptionIcon style={{fontSize: 50}} className='accept-btn'></DescriptionIcon>
                        <span>Wypowiedzenie</span>
                    </div>
                </div> 
                <div className='accept-container'>
                    <Link to={`/views/clientDetails/${id}`} className='accept-btn-container'>
                        <PersonIcon style={{fontSize: 50}} className='accept-btn'></PersonIcon>
                        <span>Profil Klienta</span>
                    </Link>
                </div> 
            </article>
        </section>
    </>
    )
}

export default PolicyDetails