import React, {useState} from "react"
import { Link } from 'react-router-dom'
import '../styles/policyList.css'
import PopUpMessage from './popUpMessage'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined'
import NoteAddComponent from './NoteAdd'

const PolicyListElement = ({index, data}) => {

    const convertDate = (dateSet, dateEnd, installments) => {
        const stringToDate = (date) => {
            try {
                if (date == null || date == '') return null
                const values = date.split('-')
                return new Date(values[2], values[1], values[0])
            } catch {
                return ''
            }
            
        }
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
        let date1 = new Date(stringToDate(dateSet))
        let date2 = new Date(stringToDate(dateEnd)) 
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

    const addMonth = (date) => {
        if (date == null || date == '') return null
        const values = date.split('-')
        values[1] = parseInt(values[1])
        values[1] = values[1]+1
        if (values[1] < 10) values[1] = '0' + values[1]
        return `${values[0]}-${values[1]}-${values[2]}`
    }
    
    return (
    <div className='policy-list-element'>
        <div className='policy-list-element-option'>
            {index}
        </div>
        <div className='policy-list-element-option'>
            {data.clientCompany || `${data.surname} ${data.name}`}
        </div>
        <div className='policy-list-element-option'>
            {data.nip || data.pesel || '-'}
        </div>
        <div className='policy-list-element-option'>
            {data.address || '-'}
        </div>
        <div className='policy-list-element-option'>
            {data.policy.policyCompany || '-'} <br /> {data.policy.policyNumber}
        </div>
        <div className='policy-list-element-option'>
            {data.policy.policyType}<br />  
            {data.policy.typeDetails && data.policy.typeDetails.detail1 ? (data.policy.typeDetails.detail1  + ' ') : (' ') + '\ '}
            {data.policy.typeDetails && data.policy.typeDetails.detail2 ? (data.policy.typeDetails.detail2  + ' ') : (' ') + '\ '}
            {data.policy.typeDetails && data.policy.typeDetails.detail3 ? (data.policy.typeDetails.detail3  + ' ') : (' ') + '\ '}
            {data.policy.typeDetails && data.policy.typeDetails.detail5 ? (data.policy.typeDetails.detail5  + ' ') : (' ') + '\ '}
        </div>
        <div className='policy-list-element-option'>
            {(data.policy.policyVariant || '-') + (' ') + '\ '} {(((data.policy.written === undefined) || (data.policy.written !== true))) ? 'oczekująca' : ''}
        </div>
        <div className='policy-list-element-option'>
            {data.policy.payment || '-'}<br /> {data.policy.amount ? data.policy.amount + ' zł' : '-'}<br /> {data.policy.installments || '-'}
        </div>
        <div className='policy-list-element-option'>
            {addMonth(data.policy.policyDateSet)}
        </div>
        <div className='policy-list-element-option'>
            {addMonth(data.policy.policyDateEnd)}
        </div>
        <div className='policy-list-element-option'>
            {convertDate(data.policy.policyDateSet, data.policy.policyDateEnd, data.policy.installments)}
        </div>
        <PolicyListElementMessage phoneNumber={data.phoneNumber} policyId={data.policy._id} data={data}></PolicyListElementMessage>
    </div>
    )
}

const PolicyListElementMessage = ({phoneNumber, policyId, data}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const switchPopUp = () => {
        if (isOpen == false) setIsOpen(true)
            else setIsOpen(false)
    }

    return (
        <>
        {isOpen && <PopUpMessage switchPopUp={switchPopUp} data={data}></PopUpMessage>}
        {isOpen2 && <NoteAddComponent openValue={{isOpen2, setIsOpen2}} data={data}></NoteAddComponent>}
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

export default PolicyListElement