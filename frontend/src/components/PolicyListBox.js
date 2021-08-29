import React, {useState} from "react";
import { getClients } from '../features/clients/clients'
import { sortResults, flattenedClients } from '../features/functions/functions'
import LoadingScreen from './LoadingScreen'
import '../styles/policyList.css'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import PolicyListElement from './PolicyListElement'

const PolicyListBox = ({search, clients, numberOfSpec}) => {

    const [sort, setSort] = useState()
    
    let subArray
    let iteration = -1;

    const stackSinglePolicyAndClient = (data) => {
        const newElement = {
            name: data.name,
            surname: data.surname,
            clientCompany: data.clientCompany,
            nip: data.nip,
            pesel: data.pesel,
            address: data.address,
            phoneNumber: data.phoneNumber,
            conjugateName: data.conjugateName,
            email: data.email,
            clientNote: data.clientNote,
            policy: {
                _id: data._id,
                policyNumber: data.policyNumber,
                policyCompany: data.policyCompany,
                policyType: data.policyType,
                typeDetails: {
                    detail1: data.typeDetails.detail1,
                    detail2: data.typeDetails.detail2,
                    detail3: data.typeDetails.detail3,
                    detail4: data.typeDetails.detail4
                },
                policyVariant: data.policyVariant,
                policyDateSet: data.policyDateSet,
                policyDateEnd: data.policyDateEnd,
                payment: data.payment,
                amount: data.amount,
                installments: data.installments,
                written: data.written
            }
        }
        return newElement
    }

    return <article className='policy-list-list'>
                <div className='policy-list-sort'>
                    <div className='policy-list-sort-option'>
                        Lp. 
                    </div>
                    <div className='policy-list-sort-option' style={{cursor: 'pointer'}} onClick={() => sort == 'clientCompany' ? setSort(null) : setSort('clientCompany') }>
                        Nazwisko i Imie / firma
                        { sort == 'clientCompany' ? <ArrowDropDownIcon></ArrowDropDownIcon> : <ArrowRightIcon></ArrowRightIcon> }
                    </div>
                    <div className='client-list-sort-option'>
                        Pesel / NIP
                    </div>
                    <div className='policy-list-sort-option' style={{cursor: 'pointer'}} onClick={() => sort == 'address' ? setSort(null) : setSort('address') }>
                        Adres
                        { sort == 'address' ? <ArrowDropDownIcon></ArrowDropDownIcon> : <ArrowRightIcon></ArrowRightIcon> }
                    </div>
                    <div className='policy-list-sort-option' style={{cursor: 'pointer'}} onClick={() => sort == 'policyCompany' ? setSort(null) : setSort('policyCompany') }>
                        Towarzystwo i Numer
                        { sort == 'policyCompany' ? <ArrowDropDownIcon></ArrowDropDownIcon> : <ArrowRightIcon></ArrowRightIcon> }
                    </div> 
                    <div className='policy-list-sort-option' style={{cursor: 'pointer'}} onClick={() => sort == 'policyType' ? setSort(null) : setSort('policyType') }>
                        Obiekt Ubezp.
                        { sort == 'policyType' ? <ArrowDropDownIcon></ArrowDropDownIcon> : <ArrowRightIcon></ArrowRightIcon> }
                    </div> 
                    <div className='policy-list-sort-option' style={{cursor: 'pointer'}} onClick={() => sort == 'policyVariant' ? setSort(null) : setSort('policyVariant') }>
                        Szczegóły
                        { sort == 'policyVariant' ? <ArrowDropDownIcon></ArrowDropDownIcon> : <ArrowRightIcon></ArrowRightIcon> }
                    </div>  
                    <div className='policy-list-sort-option' style={{cursor: 'pointer'}} onClick={() => sort == 'payment' ? setSort(null) : setSort('payment') }>
                        Płatność
                        { sort == 'payment' ? <ArrowDropDownIcon></ArrowDropDownIcon> : <ArrowRightIcon></ArrowRightIcon> }
                    </div> 
                    <div className='policy-list-sort-option' style={{cursor: 'pointer'}} onClick={() => sort == 'policyDateSet' ? setSort(null) : setSort('policyDateSet') }>
                        Data od
                        { sort == 'policyDateSet' ? <ArrowDropDownIcon></ArrowDropDownIcon> : <ArrowRightIcon></ArrowRightIcon> }
                    </div> 
                    <div className='policy-list-sort-option' style={{cursor: 'pointer'}} onClick={() => sort == 'policyDateEnd' ? setSort(null) : setSort('policyDateEnd') }>
                        Data do
                        { sort == 'policyDateEnd' ? <ArrowDropDownIcon></ArrowDropDownIcon> : <ArrowRightIcon></ArrowRightIcon> }
                    </div> 
                    <div className='policy-list-sort-option' style={{cursor: 'pointer'}}>
                        Dni do końca / raty
                    </div> 
                    <div className='policy-list-sort-option'>
                        Kontakt
                    </div> 
                </div>
                { 
                    clients ? subArray = flattenedClients(clients).sort(sortResults(sort)).map((policy) => {
                        if ( search.name ? search.name.search("[\\[\\]?*+|{}\\\\()@.\n\r]") : true && search.surname ? search.surname.search("[\\[\\]?*+|{}\\\\()@.\n\r]") : true
                            && search.pesel ? search.pesel.search("[\\[\\]?*+|{}\\\\()@.\n\r]") : true && search.phoneNumber ? search.phoneNumber.search("[\\[\\]?*+|{}\\\\()@.\n\r]") : true
                            && search.address ? search.address.search("[\\[\\]?*+|{}\\\\()@.\n\r]") : true && search.amount ? search.amount.search("[\\[\\]?*+|{}\\\\()@.\n\r]") : true
                            && search.policyNumber ? search.policyNumber.search("[\\[\\]?*+|{}\\\\()@.\n\r]") : true && search.policyVariant ? search.policyVariant.search("[\\[\\]?*+|{}\\\\()@.\n\r]") : true 
                            && search.object ? search.object.search("[\\[\\]?*+|{}\\\\()@.\n\r]") : true && search.policyCompany ? search.policyCompany.search("[\\[\\]?*+|{}\\\\()@.\n\r]") : true
                            && search.clientCompany ? search.clientCompany.search("[\\[\\]?*+|{}\\\\()@.\n\r]") : true && search.nip ? search.nip.search("[\\[\\]?*+|{}\\\\()@.\n\r]") : true ) {
                                
                                
                            const reClientCompany = search.clientCompany && new RegExp('^'+search.clientCompany.toLowerCase())
                            const reNip = search.nip && new RegExp('^'+search.nip.toLowerCase())

                            const reName = search.name && new RegExp('^'+search.name.toLowerCase())
                            const reSurname = search.surname && new RegExp('^'+search.surname.toLowerCase())
                            const rePesel = search.pesel && new RegExp('^'+search.pesel.toLowerCase())
                            const rePhoneNumber = search.phoneNumber && new RegExp('^'+search.phoneNumber.toLowerCase())
                            const reAddress = search.address && new RegExp('^'+search.address.toLowerCase())

                            const reDateSet = search.policyDateSet && new RegExp('^'+search.policyDateSet.toLowerCase())
                            const reDateEnd = search.policyDateEnd && new RegExp('^'+search.policyDateEnd.toLowerCase())

                            const reAmount = search.amount && new RegExp('^'+search.amount.toLowerCase())
                            const rePayment = search.payment && new RegExp('^'+search.payment.toLowerCase())
                            const reInstallments = search.installments && new RegExp('^'+search.installments.toLowerCase())

                            const reType = search.policyType && new RegExp('^'+search.policyType.toLowerCase())
                            const rePolicyNumber = search.policyNumber && new RegExp('^'+search.policyNumber.toLowerCase())
                            const reDetails = search.policyVariant && new RegExp('^'+search.policyVariant.toLowerCase())
                            const reObject = search.object && new RegExp('^'+search.object.toLowerCase())
                            const reCompany = search.policyCompany && new RegExp('^'+search.policyCompany.toLowerCase())
                                
                        iteration++
                        return ((search.name && policy.name) ? reName.test(policy.name.toLowerCase()) : (search.name && !policy.name) ? false : true) && 
                                ((search.surname && policy.surname) ? reSurname.test(policy.surname.toLowerCase()) : (search.surname && !policy.surname) ? false : true) && 
                                ((search.pesel && policy.pesel) ? rePesel.test(policy.pesel.toLowerCase()) : (search.pesel && !policy.pesel) ? false : true) &&
                                ((search.phoneNumber && policy.phoneNumber) ? rePhoneNumber.test(policy.phoneNumber.toLowerCase()) : (search.phoneNumber && !policy.phoneNumber) ? false : true) &&
                                ((search.address && policy.address) ? reAddress.test(policy.address.toLowerCase()) : (search.address && !policy.address) ? false : true) &&
                                ((search.policyDateSet && policy.policyDateSet) ? reDateSet.test(policy.policyDateSet.toLowerCase()) : (search.policyDateSet && !policy.policyDateSet) ? false : true) &&
                                ((search.policyDateEnd && policy.policyDateEnd) ? reDateEnd.test(policy.policyDateEnd.toLowerCase()) : (search.policyDateEnd && !policy.policyDateEnd) ? false : true) &&
                                ((search.amount && policy.amount) ? reAmount.test(policy.amount.toLowerCase()) : (search.amount && !policy.amount) ? false : true) &&
                                ((search.payment && policy.payment) ? rePayment.test(policy.payment.toLowerCase()) : (search.payment && !policy.payment) ? false : true) &&
                                ((search.installments && policy.installments) ? reInstallments.test(policy.installments.toLowerCase()) : (search.installments && !policy.installments) ? false : true) &&
                                ((search.policyType && policy.policyType) ? reType.test(policy.policyType.toLowerCase()) : (search.type && !policy.policyType) ? false : true) &&
                                ((search.policyNumber && policy.policyNumber) ? rePolicyNumber.test(policy.policyNumber.toLowerCase()) : (search.policyNumber && !policy.policyNumber) ? false : true) &&
                                ((search.policyVariant && policy.policyVariant) ? reDetails.test(policy.policyVariant.toLowerCase()) : (search.policyVariant && !policy.policyVariant) ? false : true) &&
                                ((search.object && policy.typeDetails.detail1) ? reObject.test(policy.typeDetails.detail1.toLowerCase()) : (search.object && !policy.typeDetails.detail1) ? false : true) &&
                                ((search.policyCompany && policy.policyCompany) ? reCompany.test(policy.policyCompany.toLowerCase()) : (search.policyCompany && !policy.policyCompany) ? false : true) &&
                                ((search.clientCompany && policy.clientCompany) ? reClientCompany.test(policy.clientCompany.toLowerCase()) : (search.clientCompany && !policy.clientCompany) ? false : true) &&
                                ((search.nip && policy.nip) ? reNip.test(policy.nip.toLowerCase()) : (search.nip && !policy.nip) ? false : true) &&
                                (policy.written === true) && <PolicyListElement index={iteration} key={policy.policyNumber} data={stackSinglePolicyAndClient(policy)}></PolicyListElement>

                        
                        
                }}) : <LoadingScreen></LoadingScreen>
                }
                <button className='load-more' onClick={() => dispatch(getClients({numberOfClients: (clients.length == 0)?0:clients.length, n: numberOfSpec, isAll: false}))}>ZAŁADUJ WIĘCEJ</button>
                <button className='load-more' onClick={() => dispatch(getClients({numberOfClients: (clients.length == 0)?0:clients.length, n: numberOfSpec, isAll: true}))}>ZAŁADUJ WSZYSTKIE</button>
            </article>
}

export default PolicyListBox
