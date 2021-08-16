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

    const simplifyDate = (inputedDate) => {
        let date = new Date(inputedDate)

        let day = date.getDate()
        let month = date.getMonth()+1
        let year = date.getFullYear()

        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }

        return `${day}-${month}-${year}`
    }
    
    useEffect(() => {
        if (data.clientData) {
            clients.map((client) => {
                (client._id === data.clientData._id) && setFoundClient(client)//setFoundClient(client) 
            })
        } else {
            if (data.policy) {
                clients.map((client) => {
                    (client._id === data._id) && setFoundClient(client)
                }) 
                
            } else {
                clients.map((client) => {
                    client.policy.map((policy) => {
                        (policy.policyNumber === data.policyNumber) && setFoundClient(client)
                    })
                })
            }
        }

        
        simplifyChars()
    }, [clients])

    useEffect(() => {
        if (foundClient) {
            if (data.policy) setMessage('')
            else {
                if (data.clientData) setMessage(`${data.clientData.clientCompany || `${data.clientData.conjugateName ||`${data.clientData.name}`}`},${simplifyDate(data.policyData.policyDateEnd)} konczy sie ubezpieczenie na ${data.policyData.typeDetails.detail1 && data.policyData.typeDetails.detail1 || '(nr rej)'}.Zapraszamy do:Ubezpieczenia A.Sawicka Biszcza94D(Stokrotka)Tel.535003019`)
                else setMessage(`${data.clientCompany || `${data.conjugateName ||`${data.name}`}`},${simplifyDate(data.policyDateEnd)} konczy sie ubezpieczenie na ${data.typeDetails.detail1 && data.typeDetails.detail1 || '(nr rej)'}.Zapraszamy do:Ubezpieczenia A.Sawicka Biszcza94D(Stokrotka)Tel.535003019`)
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
        console.log(phoneNumber, message)

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
                            <span>{data.clientCompany || (data.clientData && data.clientData.clientCompany) || `${data.name || (data.clientData && data.clientData.name)} ${data.surname || (data.clientData && data.clientData.surname)}`}</span><br />
                            <span>{data.phoneNumber || (data.clientData && data.clientData.phoneNumber)}</span>
                        </div>
                            <div className="balance">{balance || 'ładowanie'} pkt.</div>
                        <div className='popUp-menu-inner'>
                            <button className='popUp-button' onClick={() => sendSms(data.phoneNumber || data.clientData && data.clientData.phoneNumber, message)}>
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
                            {data.clientCompany || (data.clientData && data.clientData.clientCompany) && <>
                                <b>nazwa firmy:</b> {data.clientCompany || (data.clientData && data.clientData.clientCompany) && data.clientData.clientCompany} <br />
                            </>} 
                            {data.clientCompany || (data.clientData && data.clientData.clientCompany) && <>
                                <b>nip:</b> {data.nip || (data.clientData && data.clientData.clientCompany) && data.clientData.clientCompany} <br />
                            </>} 
                            <b>imie:</b> {data.name || (data.clientData && data.clientData.name) && data.clientData.name}<br />  
                            <b>nazwisko:</b> {data.surname || (data.clientData && data.clientData.surname) && data.clientData.surname}<br />  
                            <b>pesel:</b> {data.pesel || (data.clientData && data.clientData.pesel) && data.clientData.pesel}<br />  
                            <b>adres:</b> {data.address || (data.clientData && data.clientData.address) && data.clientData.address}  
                        </div>
                        <div>
                            <h4>Dane Polisy</h4>
                            {
                            !data.policy || data.policyData ? 
                            <>

                                <b>numer:</b> {data.policyNumber || (data.policyData && data.policyData.policyNumber) && data.policyData.policyNumber}<br />  
                                <b>okres polisy:</b> {(data.policyDateSet && simplifyDate(data.policyDateSet)) || (data.policyData && data.policyData.policyDateSet) && simplifyDate(data.policyData.policyDateSet)} - {(data.policyDateEnd && simplifyDate(data.policyDateEnd)) || (data.policyData && data.policyData.policyDateEnd) && simplifyDate(data.policyData.policyDateEnd)}<br />  
                                <b>raty:</b> {data.installments || (data.policyData && data.policyData.installments) && data.policyData.installments}<br />  
                                <b>kwota:</b> {data.amount || (data.policyData && data.policyData.amount) && data.policyData.amount}<br />  
                                <b>płatność:</b> {data.payment || (data.policyData && data.policyData.payment) && data.policyData.payment}<br /> 
                                <b>towarzystwo:</b> {data.policyCompany || (data.policyData && data.policyData.policyCompany) && data.policyData.policyCompany}<br />
                                <b>typ:</b> {data.policyType || (data.policyData && data.policyData.policyType) && data.policyData.policyType}<br />
                                {(data.policyType == 'komunikacyjna') || ((data.policyData && data.policyData.policyType) && data.policyData.policyType == 'komunikacyjna') ?
                                <>
                                    <b>nr rej:</b> {(data.typeDetails && data.typeDetails.detail1) || (data.policyData && data.policyData.typeDetails.detail1) && data.policyData.typeDetails.detail1}<br />  
                                    <b>marka:</b> {(data.typeDetails && data.typeDetails.detail2) || (data.policyData && data.policyData.typeDetails.detail2) && data.policyData.typeDetails.detail2}<br />  
                                    <b>model:</b> {(data.typeDetails && data.typeDetails.detail3) || (data.policyData && data.policyData.typeDetails.detail3) && data.policyData.typeDetails.detail3}<br />  
                                    <b>typ:</b> {(data.typeDetails && data.typeDetails.detail5) || (data.policyData && data.policyData.typeDetails.detail5) && data.policyData.typeDetails.detail5}<br />  
                                </>
                                :
                                <>
                                    <b>szczegóły:</b> {(data.typeDetails && data.typeDetails.detail1) || (data.policyData && data.policyData.typeDetails.detail1) && data.policyData.typeDetails.detail1}<br />
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
                                        <b>numer:</b> {policy.policyNumber} <b>okres:</b> {simplifyDate(policy.policyDateSet)} - {simplifyDate(policy.policyDateEnd)} <b>raty:</b> {policy.installments}
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