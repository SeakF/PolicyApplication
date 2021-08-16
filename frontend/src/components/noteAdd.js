import React, {useState, useEffect} from 'react'
import '../styles/popUpMessage.css'
import CloseIcon from '@material-ui/icons/Close'
import { useSelector, useDispatch } from 'react-redux'
import { selectClient, EDIT_CLIENT, EDIT_POLICY } from '../features/clients/clients'


const NoteAddComponent = ({openValue, data}) => {
    const clients = useSelector(selectClient)
    const dispatch = useDispatch()

    const [note, setNote] = useState('')
    
    useEffect(() => {
        if (data.policyNumber) {
            clients.map((client) => {
                const found = client.policy.find((policy) => policy.policyNumber === data.policyNumber)
                if (found) setNote(found.policyNote)
                
            })
        } else {
            const found = clients.find((client) => client._id === data._id)
            if (found) setNote(found.clientNote)
        }
    }, [clients])

    const addNote = () => {

            if (data && data.policyNumber) {
                const policyNumber = data.policyNumber

                const tempClient = clients.find((client) => {
                    return client.policy.find((policy) => policy.policyNumber === data.policyNumber) && client
                })

                const id = tempClient._id
                const policyId = data._id
                const editedPolicy = {
                    policyNumber: data.policyNumber,
                    policyCompany: (data.policyCompany=='-' || data.policyCompany==null || data.policyCompany==undefined) ? null : data.policyCompany, 
                    policyType: (data.policyType=='-' || data.policyType==null || data.policyType==undefined) ? null : data.policyType,
                    typeDetails: (data.policyType=='komunikacyjna') ? 
                        [data.typeDetails.detail1 || data.typeDetails[0], data.typeDetails.detail2 || data.typeDetails[1], data.typeDetails.detail3 || data.typeDetails[2], data.typeDetails.detail4 || data.typeDetails[3], data.typeDetails.detail5 || data.typeDetails[4]] : 
                        [data.typeDetails.detail1 || data.typeDetails[0]],
                    policyVariant: (data.policyVariant=='-' || data.policyVariant==null || data.policyVariant==undefined) ? null : data.policyVariant,
                    policyConfirmDate: (data.policyConfirmDate=='-' || data.policyConfirmDate==null || data.policyConfirmDate==undefined) ? null : data.policyConfirmDate,
                    policyDateSet: (data.policyDateSet=='-' || data.policyDateSet==null || data.policyDateSet==undefined) ? null : data.policyDateSet,
                    policyDateEnd: (data.policyDateEnd=='-' || data.policyDateEnd==null || data.policyDateEnd==undefined) ? null : data.policyDateEnd,
                    payment: (data.payment=='-' || data.payment==null || data.payment==undefined) ? null : data.payment,
                    amount: (data.amount=='-' || data.amount==null || data.amount==undefined) ? null : data.amount,
                    installments: (data.installments=='-' || data.installments==null || data.installments==undefined) ? null : data.installments,
                    written: data.written,
                    note: note || null
                }
                dispatch(EDIT_POLICY({editedPolicy, policyNumber, id, policyId}))
                window.location.reload()
            } else if (data && data.clientCompany) {
                const editedClient = {
                    id: data._id,
                    clientCompany: data.clientCompany,
                    nip: (data.nip=='-' || data.nip==null) ? null : data.nip,
                    name: (data.name=='-' || data.name==null) ? null : data.name, 
                    surname: (data.surname=='-' || data.surname==null) ? null : data.surname,
                    pesel: (data.pesel=='-' || data.pesel==null) ? null : data.pesel,
                    phoneNumber: (data.phoneNumber=='-' || data.phoneNumber==null) ? null : data.phoneNumber,
                    address: (data.address=='-' || data.address==null) ? null : data.address,
                    email: (data.email=='-' || data.email==null) ? null : data.email,
                    note: note || null
                }
                dispatch(EDIT_CLIENT(editedClient))
                window.location.reload()
            } else if (data) {
                const editedClient = {
                    id: data._id,
                    name: data.name, 
                    surname: data.surname,
                    pesel: (data.pesel=='-' || data.pesel==null) ? null : data.pesel,
                    phoneNumber: (data.phoneNumber=='-' || data.phoneNumber==null) ? null : data.phoneNumber,
                    address: (data.address=='-' || data.address==null) ? null : data.address,
                    email: (data.email=='-' || data.email==null) ? null : data.email,
                    conjugateName: (data.conjugateName=='-' || data.conjugateName==null) ? null : data.conjugateName,
                    note: note || null
                }
                dispatch(EDIT_CLIENT(editedClient))
                window.location.reload()
            }
            

            
    }

    return (
        <div className='popUp-plate'>
            <div className='popUp-container'>
                <div className='popUp-exit'>
                    <div onClick={() => openValue.setIsOpen2(!openValue.isOpen2)}>
                        <CloseIcon style={{fontSize: 40}}></CloseIcon>
                    </div>
                </div>
                <div className='popUp-main'>
                    <div className='popUp-menu no-select'>
                        <div className='popUp-menu-inner'>
                            <button className='popUp-button' onClick={() => addNote()}>
                                zapisz
                            </button> 
                        </div>
                    </div>
                    <div className='popUp-text'>
                        <textarea className='note-textarea' value={note || ''} onChange={(e) => setNote(e.target.value)}></textarea>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default NoteAddComponent
