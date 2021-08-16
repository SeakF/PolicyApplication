import React, {useEffect, useState} from "react"
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import LoadingScreen from '../components/loadingScreen'
import { useSelector, useDispatch } from 'react-redux'
import { DELETE_POLICY, EDIT_POLICY, selectClient, statusState, getSpecificClient } from '../features/clients/clients'
import ErrorWindow from '../components/errorWindow'
import '../styles/addStyles.css'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import DeleteIcon from '@material-ui/icons/Delete'
import PersonIcon from '@material-ui/icons/Person'
import Navbar from '../components/navbar'
import DescriptionIcon from '@material-ui/icons/Description'
import {saveAs} from 'file-saver'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import NoteAddIcon from '@material-ui/icons/NoteAdd'

const PolicyDetails = () => {

    let params = useParams()

    const dispatch = useDispatch()
    const clients = useSelector(selectClient)
    const status = useSelector(statusState)

    const [client, setClient] = useState({})
    const [policy, setPolicy] = useState({})
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [address, setAddress] = useState('')

    const [policyId, setPolicyId] = useState('')
    const [policyNumber, setPolicyNumber] = useState('')
    const [company, setCompany] = useState('')

    const [policyType, setPolicyType] = useState('')
    const [typeDetailSt, setTypeDetailSt] = useState('')
    const [typeDetailNd, setTypeDetailNd] = useState('')
    const [typeDetailRd, setTypeDetailRd] = useState('')
    const [typeDetailTh, setTypeDetailTh] = useState('')
    const [typeDetail5Th, setTypeDetail5Th] = useState('')
    
    const [policyVariant, setPolicyVariant] = useState('')

    const [policyConfirmDate, setPolicyConfirmDate] = useState('')
    const [policyDateSet, setPolicyDateSet] = useState(null)
    const [policyDateEnd, setPolicyDateEnd] = useState(null)

    const [payment, setPayment] = useState('')
    const [amount, setAmount] = useState('')
    const [installments, setInstallments] = useState('')


    const [subPolicyNumber, setSubPolicyNumber] = useState('')
    const [subCompany, setSubCompany] = useState('')
    const [subPolicyType, setSubPolicyType] = useState('')
    const [subTypeDetailSt, setSubTypeDetailSt] = useState('')
    const [subTypeDetailNd, setSubTypeDetailNd] = useState('')
    const [subTypeDetailRd, setSubTypeDetailRd] = useState('')
    const [subTypeDetail5Th, setSubTypeDetail5Th] = useState('')
    const [subPolicyVariant, setSubPolicyVariant] = useState('')
    const [subPolicyConfirmDate, setSubPolicyConfirmDate] = useState('')
    const [subPolicyDateSet, setSubPolicyDateSet] = useState(null)
    const [subPolicyDateEnd, setSubPolicyDateEnd] = useState(null)
    const [subPayment, setSubPayment] = useState('')
    const [subAmount, setSubAmount] = useState('')
    const [subInstallments, setSubInstallments] = useState('')

    const [written, setWritten] = useState('')
    const [note, setNote] = useState('')

    
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
                setName(foundClient.name)
                setSurname(foundClient.surname)
                setAddress(foundClient.address)

                
                setPolicyId(foundPolicy._id)
                setPolicyNumber(foundPolicy.policyNumber)
                setCompany(foundPolicy.policyCompany || '-')
                setPolicyType(foundPolicy.policyType || '-')
                setTypeDetailSt(foundPolicy.typeDetails.detail1 || foundPolicy.typeDetails[0] || '-')
                setTypeDetailNd(foundPolicy.typeDetails.detail2 || foundPolicy.typeDetails[1] || '-')
                setTypeDetailRd(foundPolicy.typeDetails.detail3 || foundPolicy.typeDetails[2] || '-')
                setTypeDetail5Th(foundPolicy.typeDetails.detail5 || foundPolicy.typeDetails[4] || '-')
                setPolicyVariant(foundPolicy.policyVariant || '-')
                setPolicyConfirmDate(foundPolicy.policyConfirmDate || '-')
                setPolicyDateSet(foundPolicy.policyDateSet)
                setPolicyDateEnd(foundPolicy.policyDateEnd)
                setPayment(foundPolicy.payment || '-')
                setAmount(foundPolicy.amount || '-')
                setInstallments(foundPolicy.installments || '-')
                setNote(foundPolicy.policyNote)



                setSubPolicyNumber(foundPolicy.policyNumber)
                setSubCompany(foundPolicy.policyCompany || '-')
                setSubPolicyType(foundPolicy.policyType || '-')
                setSubTypeDetailSt(foundPolicy.typeDetails.detail1 || foundPolicy.typeDetails[0] || '-')
                setSubTypeDetailNd(foundPolicy.typeDetails.detail2 || foundPolicy.typeDetails[1] || '-')
                setSubTypeDetailRd(foundPolicy.typeDetails.detail3 || foundPolicy.typeDetails[2] || '-')
                setSubTypeDetail5Th(foundPolicy.typeDetails.detail5 || foundPolicy.typeDetails[4] || '-')
                setSubPolicyVariant(foundPolicy.policyVariant || '-')
                setSubPolicyConfirmDate(foundPolicy.policyConfirmDate || '-')
                setSubPolicyDateSet(foundPolicy.policyDateSet)
                setSubPolicyDateEnd(foundPolicy.policyDateEnd)
                setSubPayment(foundPolicy.payment || '-')
                setSubAmount(foundPolicy.amount || '-')
                setSubInstallments(foundPolicy.installments || '-')


                setWritten(foundPolicy.written)
            } else {
                dispatch(getSpecificClient({type: 'policy._id', value: params[0]}))
            }
        }
        load()
    }, [clients])

    const saveSubs = () => {
        const editedPolicy = {
            policyNumber: subPolicyNumber,
            policyCompany: (subCompany=='-' || null || undefined) ? null : subCompany, 
            policyType: (subPolicyType=='-' || null || undefined) ? null : subPolicyType,
            typeDetails: (subPolicyType=='komunikacyjna') ? 
                [(subTypeDetailSt=='-' || null || undefined) ? null : subTypeDetailSt, (subTypeDetailNd=='-' || null || undefined) ? null : subTypeDetailNd, (subTypeDetailRd=='-' || null || undefined) ? null : subTypeDetailRd, null, (subTypeDetail5Th=='-' || null || undefined) ? null : subTypeDetail5Th] : 
                [(subTypeDetailSt=='-' || null || undefined) ? null : subTypeDetailSt],
            policyVariant: (subPolicyVariant=='-' || null || undefined) ? null : subPolicyVariant,
            policyConfirmDate: (policyConfirmDate=='-' || null || undefined) ? null : policyConfirmDate,
            policyDateSet: (subPolicyDateSet=='-' || null || undefined) ? null : subPolicyDateSet.toString(),
            policyDateEnd: (subPolicyDateEnd=='-' || null || undefined) ? null : subPolicyDateEnd.toString(),
            payment: (subPayment=='-' || null || undefined) ? null : subPayment,
            amount: (subAmount=='-' || null || undefined) ? null : subAmount,
            installments: (subInstallments=='-' || null || undefined) ? null : subInstallments,
            written: (written === undefined) ? false : (written === false) ? false : true,
            note: note || null
        }
        dispatch(EDIT_POLICY({editedPolicy, policyNumber, id, policyId}))
        window.location.reload()
    }

    const clearSubs = () => {
        setSubPolicyNumber(policyNumber)
        setSubCompany(company)
        setSubPolicyType(policyType)
        setSubTypeDetailSt(typeDetailSt)
        setSubTypeDetailNd(typeDetailNd)
        setSubTypeDetailRd(typeDetailRd)
        setSubTypeDetail5Th(typeDetail5Th)
        setSubPolicyVariant(policyVariant)
        setSubPolicyConfirmDate(policyConfirmDate)
        setSubPolicyDateSet(policyDateSet)
        setSubPolicyDateEnd(policyDateEnd)
        setSubPayment(payment)
        setSubAmount(amount)
        setSubInstallments(installments)
    } 

    const deletePolicy = (policyNumber) => {
        dispatch(DELETE_POLICY({policyNumber, id, policyId}))
        window.location.href = '../policyList'
    }


    const generatePdf = async (policyData) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent))[0][1]}`
            },
            body: JSON.stringify(policyData)
        }

        const readyPdf = await fetch(process.env.REACT_APP_PDFLINK, options)
            .then(async () => {
                const options2 = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent))[0][1]}`
                    }
                }
                const resolve = await fetch(process.env.REACT_APP_PDFLINK, options2)
                    .then(res => res.blob())
                    .then(res => {return res}) //tu będzie powrotny pdf
                    .catch((err) => console.error(err))
                return resolve
            })
            .then(res => {return res}) //tu musi być return powrotnego pdf
            .catch((err) => console.error(err))

        const pdfBlob = new Blob([readyPdf], {type: 'application/pdf'})
        saveAs(pdfBlob, `${policyData.name}-${policyData.surname}-wypowiedzenie`)
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

    const saveAsSpecific = (boolean) => {
        const editedPolicy = {
            policyNumber: subPolicyNumber,
            policyCompany: (subCompany=='-' || null || undefined) ? null : subCompany, 
            policyType: (subPolicyType=='-' || null || undefined) ? null : subPolicyType,
            typeDetails: (subPolicyType=='komunikacyjna') ? 
                [(subTypeDetailSt=='-' || null || undefined) ? null : subTypeDetailSt, (subTypeDetailNd=='-' || null || undefined) ? null : subTypeDetailNd, (subTypeDetailRd=='-' || null || undefined) ? null : subTypeDetailRd, null, (subTypeDetail5Th=='-' || null || undefined) ? null : subTypeDetail5Th] : 
                [(subTypeDetailSt=='-' || null || undefined) ? null : subTypeDetailSt],
            policyVariant: (subPolicyVariant=='-' || null || undefined) ? null : subPolicyVariant,
            policyConfirmDate: (policyConfirmDate=='-' || null || undefined) ? null : policyConfirmDate,
            policyDateSet: (subPolicyDateSet=='-' || null || undefined) ? null : subPolicyDateSet.toString(),
            policyDateEnd: (subPolicyDateEnd=='-' || null || undefined) ? null : subPolicyDateEnd.toString(),
            payment: (subPayment=='-' || null || undefined) ? null : subPayment,
            amount: (subAmount=='-' || null || undefined) ? null : subAmount,
            installments: (subInstallments=='-' || null || undefined) ? null : subInstallments,
            written: boolean,
            note: note
        }
        dispatch(EDIT_POLICY({editedPolicy, policyNumber, id, policyId}))
        window.location.reload()
    }
    
    if (!policyNumber) {
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
                            <div className='delete-btn-container' onClick={() => deletePolicy(policyNumber)}>
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
                        <span>{policyNumber || 'numer polisy'}</span>
                    </article>
                    <article className='add-section'>
                        <div className='add-section-title'>
                            <h1>Dane Polisy</h1> 
                        </div>      
                        <div className='add-section-forms'>
                            <label><div className='edit-details'>{name || 'imie'}</div> <div>Imie*</div></label>
                            <label><div className='edit-details'>{surname || 'nazwisko'}</div> <div>Nazwisko*</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPolicyNumber(e.target.value)} value={subPolicyNumber}></input> <div>Numer*</div></label>
                            <label>
                                <select className='edit-details' value={subCompany} onChange={(e) => setSubCompany(e.target.value)}>
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
                            <label><DatePicker className='edit-details' placeholderText='dzień-miesiąc-rok' onChange={(date) => setSubPolicyDateSet(date)} selected={new Date(subPolicyDateSet)} dateFormat="dd-MM-yyyy" required></DatePicker> <div>od*</div></label>
                            <label><DatePicker className='edit-details' placeholderText='dzień-miesiąc-rok' onChange={(date) => setSubPolicyDateEnd(date)} selected={new Date(subPolicyDateEnd)} dateFormat="dd-MM-yyyy" required></DatePicker> <div>do*</div></label>
                            <label><input className='edit-details' onChange={(e) => setSubPolicyVariant(e.target.value)} value={subPolicyVariant}></input> <div>Typ</div></label>
                        </div>  
                        <div className='add-section-forms'>
                            <label>
                                <select className='edit-details' onChange={(e) => {setSubPolicyType(e.target.value); setSubTypeDetailSt(''); setSubTypeDetailNd(''); setSubTypeDetailRd(''); setSubTypeDetail5Th('')}} value={subPolicyType}>
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
                        {subPolicyType == 'komunikacyjna' ?
                            <div className='add-section-forms type-form'>
                                <label><input className='edit-details' onChange={(e) => setSubTypeDetailSt(e.target.value)} value={subTypeDetailSt}></input> <div>Numer Rejestracyjny</div></label>
                                <label><input className='edit-details' onChange={(e) => setSubTypeDetailNd(e.target.value)} value={subTypeDetailNd}></input> <div>Marka</div></label>
                                <label><input className='edit-details' onChange={(e) => setSubTypeDetailRd(e.target.value)} value={subTypeDetailRd}></input> <div>Model</div></label>
                                <label>
                                    <select className='edit-details' onChange={(e) => setSubTypeDetail5Th(e.target.value)} value={subTypeDetail5Th}>
                                        <option defaultValue></option>
                                        <option>Osobowy</option>
                                        <option>Ciężarowy</option>
                                    </select> <div>Typ pojazdu</div> 
                                </label>
                            </div> : 
                            <div className='add-section-forms type-form'>
                                <label><input className='edit-details' onChange={(e) => setSubTypeDetailSt(e.target.value)} value={subTypeDetailSt}></input> <div>Szczegóły</div></label>
                            </div>
                        }

                        <div className='add-section-forms'>
                                <label>
                                    <select className='edit-details' onChange={(e) => setSubPayment(e.target.value)} value={subPayment}>
                                        <option>Gotówka</option>
                                        <option>Przelew</option>
                                    </select> <div>Płatność</div> 
                                </label>
                                <label><input className='edit-details' onChange={(e) => setSubAmount(e.target.value)} value={subAmount} type="number" min="1" step="any" ></input> <div>Kwota</div></label>
                                <label><input className='edit-details' onChange={(e) => setSubInstallments(e.target.value)} value={subInstallments}></input> <div>Raty</div></label>
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
                <span>{policyNumber || 'numer polisy'}</span>
            </article>
            <article className='add-section'>
                <div className='add-section-title'>
                    <h1>Dane Polisy</h1> 
                </div>      
                <div className='add-section-forms'>
                    <label><div className='edit-details'>{name || 'imie'}</div> <div>Imie*</div></label>
                    <label><div className='edit-details'>{surname || 'nazwisko'}</div> <div>Nazwisko*</div></label>
                    <label><div className='edit-details'>{policyNumber || 'numer polisy'}</div> <div>Numer*</div></label>
                    <label><div className='edit-details'>{company || '-'}</div> <div>Towarzystwo</div></label>
                    <label><div className='edit-details'>{invertDate(policyDateSet) || '-'}</div> <div>od*</div></label>
                    <label><div className='edit-details'>{invertDate(policyDateEnd) || '-'}</div> <div>do*</div></label>
                    <label><div className='edit-details'>{policyVariant || '-'}</div> <div>Typ</div></label>
                </div>  
                <div className='add-section-forms'>
                    <label><div className='edit-details'>{policyType || '-'}</div> <div>Rodzaj ubezpieczenia</div></label>
                </div>
                {policyType == 'komunikacyjna' ?
                    <div className='add-section-forms type-form'>
                        <label><div className='edit-details'>{typeDetailSt || '-'}</div> <div>Numer Rejestracyjny</div></label>
                        <label><div className='edit-details'>{typeDetailNd || '-'}</div> <div>Marka</div></label>
                        <label><div className='edit-details'>{typeDetailRd || '-'}</div> <div>Model</div></label>
                        <label><div className='edit-details'>{typeDetail5Th || '-'}</div> <div>Typ pojazdu</div></label>
                    </div> : 
                    <div className='add-section-forms type-form'>
                        <label><div className='edit-details'>{typeDetailSt || '-'}</div> <div>Szczegóły</div></label>
                    </div>
                }
                <div className='add-section-forms'>
                    <label><div className='edit-details'>{payment || '-'}</div> <div>Płatność</div></label>
                    <label><div className='edit-details'>{amount + ' zł' || '-'}</div> <div>Kwota</div></label>
                    <label><div className='edit-details'>{installments  || '-'}</div> <div>Raty</div></label>
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
                    <div className='accept-btn-container' onClick={() => generatePdf({name, surname, address, company, typeDetailSt, typeDetailNd, typeDetailRd, policyNumber, policyDateSet, policyDateEnd, policyType})}>
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