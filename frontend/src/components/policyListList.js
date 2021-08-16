import React from "react"
import PopUpMessage from '../components/popUpMessage'
import LoadingScreen from '../components/loadingScreen'
import '../styles/policyList.css'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PolicyListElement from '../components/policyListElement'


const PolicyListList = ({switchPopUp}) => {

    let iteration = -1;

    return (
    <article className='policy-list-list'>
        <div className='policy-list-sort'>
            <div className='policy-list-sort-option'>
                Lp. 
            </div>
            <div className='policy-list-sort-option'>
                Nazwisko i Imie
                    <PolicyListSortArrows></PolicyListSortArrows>
            </div>
            <div className='policy-list-sort-option'>
                Pesel
                    <PolicyListSortArrows></PolicyListSortArrows>
            </div>
            <div className='policy-list-sort-option'>
                Adres
                    <PolicyListSortArrows></PolicyListSortArrows>
            </div>
            <div className='policy-list-sort-option'>
                Towarzystwo Ubezpieczeń
                <PolicyListSortArrows></PolicyListSortArrows>
            </div> 
            <div className='policy-list-sort-option'>
                Obiekt Ubezpieczenia
            </div> 
            <div className='policy-list-sort-option'>
                Szczegóły
            </div> 
            <div className='policy-list-sort-option'>
                Płatność
                <PolicyListSortArrows></PolicyListSortArrows>
            </div> 
            <div className='policy-list-sort-option'>
                Data od
                <PolicyListSortArrows></PolicyListSortArrows>
            </div> 
            <div className='policy-list-sort-option'>
                Data do
                <PolicyListSortArrows></PolicyListSortArrows>
            </div> 
            <div className='policy-list-sort-option'>
                Kontakt
            </div> 
        </div>
        { 
            // clients.map((client) => {
            //     return (
            //         client.policy.map((policy) => {
            //             iteration++
            //             return <PolicyListElement index={iteration} key={policy.policyNumber} clientData={client} policyData={policy} switchPopUp={switchPopUp}></PolicyListElement>
            //         })
            //     )
            // }) : <LoadingScreen></LoadingScreen>
        }
        
    </article>
    )
}

const PolicyListSortArrows = () => {
    return (
    <div>
        <ArrowRightIcon></ArrowRightIcon>
    </div>        
    )
}

export default PolicyListList