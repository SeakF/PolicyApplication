import React, {useState, useEffect} from 'react'
import '../styles/popUpMessage.css'
import CloseIcon from '@material-ui/icons/Close'
import { useSelector } from 'react-redux'
import { selectClient } from '../features/clients/clients'

const PopUpMessage = ({switchPopUp, data}) => {

    const clients = useSelector(selectClient)
    const [foundClient, setFoundClient] = useState()
    const [message, setMessage] = useState('')
    const [charCounter, setCharCounter] = useState('')

    
    const [balance, setBalance] = useState('')

    const getPoints = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent))[0][1]}`
            }
        }

        const smsPointsResponse = await fetch(process.env.REACT_APP_SMSLINK, options)
        try {
            const smsPoints = await smsPointsResponse.json()
            setBalance(smsPoints.points)
        } catch {
            console.log("error z punktami")
        }
        
    }
    getPoints()

    useEffect(() => {
        if (Array.isArray(data.policy)) {
            clients.map((client) => {
                return (client._id === data._id) && setFoundClient(client)
            })
        } else {
            clients.forEach(client => {
                client.policy.map((policy) => {
                    return (policy._id === data.policy._id) && setFoundClient(client)
                })
            })
        }
        simplifyChars()
    }, [clients])

    const addMonth = (date) => {
        if (date == null || date == '') return null
        const values = date.split('-')
        values[1] = parseInt(values[1])
        values[1] = values[1]+1
        if (values[1] < 10) values[1] = '0' + values[1]
        return `${values[0]}-${values[1]}-${values[2]}`
    }

    useEffect(() => {
        if (foundClient) {
            if (Array.isArray(data.policy)) setMessage('')
            else {
                setMessage(`${data.clientCompany || `${data.conjugateName || `${data.name}`}`}, ${addMonth(data.policy.policyDateEnd)} konczy sie ubezpieczenie na ${data.policy.typeDetails.detail1 || '(nr rej)'}.`)
            }
        }
        }, [foundClient])
    
    useEffect(() => {
        setCharCounter(message.length)
        if (message != 0) simplifyChars()
    }, [message])


    const simplifyChars = () => {
        let msg = message
        msg = msg.replace(/ę/g, 'e')
        msg = msg.replace(/ó/g, 'o')
        msg = msg.replace(/ą/g, 'a')
        msg = msg.replace(/ś/g, 's')
        msg = msg.replace(/ż/g, 'z')
        msg = msg.replace(/ź/g, 'z')
        msg = msg.replace(/ć/g, 'c')
        msg = msg.replace(/ł/g, 'l')
        msg = msg.replace(/ń/g, 'n')
        setMessage(msg)
    }


    const sendSms = async (phoneNumber, message) => {
        if (message == 0) {
            console.log('pusta wiadomość')
            return
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent))[0][1]}`
            },
            body: JSON.stringify({phoneNumber, message})
        }

        const response = await fetch(process.env.REACT_APP_SMSLINK, options)
    }

    return (
        <div className='popUp-plate'>
            {foundClient && <div className='popUp-container'>
                <div className='popUp-exit'>
                    <div onClick={() => switchPopUp()}>
                        <CloseIcon style={{fontSize: 40}}></CloseIcon>
                    </div>
                </div>
                <div className='popUp-main'>
                    <div className='popUp-menu no-select'>
                        <div className='popUp-menu-inner'>
                            <span>{data.clientCompany || `${data.name} ${data.surname}`}</span><br />
                            <span>{data.phoneNumber || (data.clientData && data.clientData.phoneNumber)}</span>
                        </div>
                            <div className="balance">{balance || 'ładowanie'} pkt.</div>
                        <div className='popUp-menu-inner'>
                            <button className='popUp-button' onClick={() => sendSms(data.phoneNumber, message)}>
                                wyślij
                            </button> 
                        </div>
                    </div>
                    <div className='popUp-text'>
                        <div>
                            <h4>Wiadomość</h4>
                            <textarea className='sms-textArea' rows={15} cols={50} value={message} onChange={(e) => {setMessage(e.target.value); setCharCounter(e.target.value.length)}}></textarea>
                            <p className='sms-center'><b>{charCounter}</b></p>
                            <p className='sms-center'>(limit na wiad. ze znakami specjalnymi: 70, bez: 140)</p>
                        </div>
                        <div>
                            <h4>Dane klienta</h4>
                            {data.clientCompany && <>
                                <b>nazwa firmy:</b> {data.clientCompany} <br />
                                <b>nip:</b> {data.nip} <br />
                            </>} 
                            <b>imie:</b> {data.name}<br />  
                            <b>nazwisko:</b> {data.surname}<br />  
                            <b>pesel:</b> {data.pesel}<br />  
                            <b>adres:</b> {data.address}  
                        </div>
                        <div>
                            <h4>Dane Polisy</h4>
                            {
                            !Array.isArray(data.policy) ? 
                            <>

                                <b>numer:</b> {data.policy.policyNumber}<br />  
                                <b>okres polisy:</b> {data.policy.policyDateEnd} - {data.policy.policyDateEnd}<br />  
                                <b>raty:</b> {data.policy.installments}<br />  
                                <b>kwota:</b> {data.policy.amount}<br />  
                                <b>płatność:</b> {data.policy.payment}<br /> 
                                <b>towarzystwo:</b> {data.policy.policyCompany}<br />
                                <b>typ:</b> {data.policy.policyType}<br />
                                {(data.policy.policyType == 'komunikacyjna') ?
                                <>
                                    <b>nr rej:</b> {data.policy.typeDetails.detail1}<br />  
                                    <b>marka:</b> {data.policy.typeDetails.detail2}<br />  
                                    <b>model:</b> {data.policy.typeDetails.detail3}<br />  
                                    <b>typ:</b> {data.policy.typeDetails.detail4}<br />  
                                </>
                                :
                                <>
                                    <b>szczegóły:</b> {data.policy.typeDetails.detail1}<br />
                                </>
                                } 
                            </>
                            :
                            <>
                            </>
                            }
                            
                            
                        </div>
                        <div>
                            <h4>Polisy klienta</h4>
                            {foundClient && foundClient.policy.map((policy, idx) => {
                                return (
                                    <div key={idx}>
                                        <b>numer:</b> {policy.policyNumber} <b>okres:</b> {policy.policyDateSet} - {policy.policyDateEnd} <b>raty:</b> {policy.installments}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default PopUpMessage