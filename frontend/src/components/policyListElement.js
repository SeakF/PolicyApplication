import React, {useState} from "react"
import { Link } from 'react-router-dom'
import '../styles/policyList.css'
import PopUpMessage from '../components/popUpMessage'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined'
import NoteAddComponent from '../components/noteAdd'

const PolicyListElement = (props) => {

    const {index, policyData} = props

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
            {policyData.clientCompany || `${policyData.surname} ${policyData.name}`}
        </div>
        <div className='policy-list-element-option'>
            {policyData.nip || policyData.pesel || '-'}
        </div>
        <div className='policy-list-element-option'>
            {policyData.address || '-'}
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
            {(policyData.policyDateEnd && invertDate(policyData.policyDateEnd))  || '-'}
        </div>
        <div className='policy-list-element-option'>
            {convertDate(policyData.policyDateSet, policyData.policyDateEnd, policyData.installments)}
        </div>
        <PolicyListElementMessage phoneNumber={policyData.phoneNumber} policyId={policyData._id} data={policyData}></PolicyListElementMessage>
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