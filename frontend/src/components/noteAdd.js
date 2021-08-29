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
        if (!Array.isArray(data.policy)) {
            clients.map((client) => {
                const found = client.policy.find((policy) => policy.policyNumber === data.policy.policyNumber)
                if (found) setNote(found.policyNote)  
            })
        } else {
            const found = clients.find((client) => client._id === data._id)
            if (found) setNote(found.clientNote)
        }
    }, [clients])

    const addNote = () => {
            if (data && !Array.isArray(data.policy)) {

                const tempClient = clients.find((client) => {
                    return client.policy.find((policy) => policy.policyNumber === data.policy.policyNumber) && client
                })

                const id = tempClient._id
                const policyId = tempClient.policy[0]._id
                const editedPolicy = {
                    policyId: policyId,
                    policyNumber: data.policy.policyNumber,
                    policyCompany: data.policy.policyCompany, 
                    policyType: data.policy.policyType,
                    typeDetails: (data.policy.policyType=='komunikacyjna') ? 
                        {detail1: data.policy.typeDetails.detail1, detail2: data.policy.typeDetails.detail2, detail3: data.policy.typeDetails.detail3, detail4: data.policy.typeDetails.detail4} : 
                        {detail1: data.policy.typeDetails.detail1},
                    policyVariant: data.policy.policyVariant,
                    policyDateSet: data.policy.policyDateSet,
                    policyDateEnd: data.policy.policyDateEnd,
                    payment: data.policy.payment,
                    amount: data.policy.amount,
                    installments: data.policy.installments,
                    written: data.policy.written,
                    policyNote: note || ''
                }
                dispatch(EDIT_POLICY({editedPolicy, id}))
                window.location.reload()
            } else if (data) {
                const editedClient = {
                    id: data._id,
                    name: data.name, 
                    surname: data.surname,
                    pesel: data.pesel,
                    clientCompany: data.clientCompany,
                    nip: data.nip,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    email: data.email,
                    conjugateName: data.conjugateName,
                    clientNote: note || ''
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
