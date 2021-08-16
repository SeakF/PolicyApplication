import React, {useState} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getClients, selectClient, numberOfSpecific, getSpecificClient } from '../features/clients/clients'
import LoadingScreen from '../components/loadingScreen'
import '../styles/policyList.css'
import PolicyListElement from '../components/policyListElement'
import Navbar from '../components/navbar'

const Deadlines = () => {


    const dispatch = useDispatch()
    const clients = useSelector(selectClient)
    const numberOfSpec = useSelector(numberOfSpecific)
    let iteration = -1


    const [clientCompany, setClientCompany] = useState('')
    const [nip, setNip] = useState('')

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [pesel, setPesel] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const [dateSet, setDateSet] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [confirmDate, setConfirmDate] = useState('')

    const [amount, setAmount] = useState('')
    const [payment, setPayment] = useState('')
    const [installments, setInstallments] = useState('')

    const [type, setType] = useState('')
    const [policyNumber, setPolicyNumber] = useState('')
    const [details, setDetails] = useState('')
    const [object, setObject] = useState('')
    const [company, setCompany] = useState('')
    
    let subArray


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
            else if ((date2 > today.getTime()) && (daysLeft <= 45)) return Math.ceil(daysLeft)
                else return false
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
            else if ((periodExactDay.getTime() > today.getTime()) && (((periodExactDay.getTime() - today.getTime()) / (1000 * 3600 * 24)) <= 45)) return Math.ceil(((periodExactDay - today.getTime()) / (1000 * 3600 * 24)))
                return false
        }
    }

    const sortResults = (property) => {
        if (property == 'clientCompany') {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {
                    if (a['clientCompany'] === null || a['surname'] === null) return 1
                    if (b['clientCompany'] === null || b['surname'] === null) return -1
                    let result = ((a['clientCompany'] || a['surname']) < (b['clientCompany'] || b['surname'])) ? -1 : ((a['clientCompany'] || a['surname']) > (b['clientCompany'] || b['surname'])) ? 1 : 0
                    
                    return result * sortOrder
                }
        } else if (property == 'nip') {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {
                    if (a['nip'] === null || a['pesel'] === null) return 1
                    if (b['nip'] === null || b['pesel'] === null) return -1
                    let result = ((a['nip'] || a['pesel']) < (b['nip'] || b['pesel'])) ? -1 : ((a['nip'] || a['pesel']) > (b['nip'] || b['pesel'])) ? 1 : 0
                    
                    return result * sortOrder
                }
        } else if (property == 'policyDateEnd') {
            if (property) {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {

                    let dateForA = convertDate(a['policyDateSet'], a['policyDateEnd'], a['installments'])
                    let dateForB = convertDate(b['policyDateSet'], b['policyDateEnd'], b['installments'])

                    // te z dzisiaj daje na początek
                    if (dateForA == 'dziś') return -1
                    if (dateForB == 'dziś') return 1

                    // te po terminie wyrzuca na koniec
                    if (dateForA == 'po terminie') return 1
                    if (dateForB == 'po terminie') return -1

                    //---------------------------------
                    let result = (dateForA < dateForB) ? -1 : (dateForA > dateForB) ? 1 : 0
                    //let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0 // to na sucho do daty końcowej
                    
                    return result * sortOrder
                }
            }
        } else {
            if (property) {
                let sortOrder = 1
                if(property[0] == null) {
                    sortOrder = -1
                    property = property.substr(1)
                }
                return (a, b) => {
                    if (a[property] === null) return 1
                    if (b[property] === null) return -1
                    let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
                    
                    return result * sortOrder
                }
            }
        }
    }

    const flattenedClients = () => {
        let flattenedTemp = []

        clients.map((client) => {
            client.policy.map((policy) => {
                if(client.clientCompany) {
                    const newElement = {
                        clientCompany: client.clientCompany,
                        nip: client.nip,
                        name: client.name, 
                        surname: client.surname, 
                        pesel: client.pesel, 
                        address: client.address, 
                        phoneNumber: client.phoneNumber,
                        ...policy
                    }
                    if (flattenedTemp == 0) {
                        flattenedTemp = [newElement]
                    } else {
                        flattenedTemp.push(newElement)
                    }
                } else {
                    const newElement = {
                        name: client.name, 
                        surname: client.surname, 
                        pesel: client.pesel, 
                        address: client.address, 
                        phoneNumber: client.phoneNumber,
                        conjugateName: client.conjugateName,
                        ...policy
                    }
                    if (flattenedTemp == 0) {
                        flattenedTemp = [newElement]
                    } else {
                        flattenedTemp.push(newElement)
                    }    
                }
                
            })
        })
        return flattenedTemp
    }


    return (
    <>
    <Navbar></Navbar>
        <article className='policy-list-menu'>
            <div className='policy-list-menu-columns'>
                <label><input type="text" value={name} onChange={(e) => {setName(e.target.value); dispatch(getSpecificClient({type: 'name', value: e.target.value}))}}  /> Imie</label>
                <label><input type="text" value={surname} onChange={(e) => {setSurname(e.target.value); dispatch(getSpecificClient({type: 'surname', value: e.target.value}))}}  /> Nazwisko</label>
                <label><input type="text" value={pesel} onChange={(e) => {setPesel(e.target.value); dispatch(getSpecificClient({type: 'pesel', value: e.target.value}))}}  /> Pesel klienta</label>
            </div>
            {/* <div className='policy-list-menu-columns'>
                <label><input type="date" value={dateEnd} onChange={(e) => {setDateEnd(e.target.value); dispatch(getSpecificClient({type: 'policyDateEnd', value: e.target.value}))}}  /> Data Zakończenia</label>
            </div> tu też jak coś sie uda z tymi datami zrobić nwm*/}
            <div className='policy-list-menu-columns'>
                <label><input type="text" value={policyNumber} onChange={(e) => {setPolicyNumber(e.target.value); dispatch(getSpecificClient({type: 'policyNumber', value: e.target.value}))}}  /> Numer Polisy</label>
                <label><input type="text" value={clientCompany} onChange={(e) => {setClientCompany(e.target.value); dispatch(getSpecificClient({type: 'clientCompany', value: e.target.value}))}} /> Nazwa firmy</label>
                <label><input type="text" value={nip} onChange={(e) => {setNip(e.target.value); dispatch(getSpecificClient({type: 'nip', value: e.target.value}))}} /> NIP</label>
            </div>
            <div className='policy-list-menu-columns'></div>
        </article>
        <article className='policy-list-list'>
            <div className='policy-list-sort'>
                <div className='policy-list-sort-option'>
                    Lp. 
                </div>
                <div className='policy-list-sort-option'>
                    Nazwisko i Imie / firma
                </div>
                <div className='policy-list-sort-option'>
                    Pesel / NIP
                </div>
                <div className='policy-list-sort-option'>
                    Adres
                </div>
                <div className='policy-list-sort-option'>
                    Towarzystwo Ubezpieczeń
                </div> 
                <div className='policy-list-sort-option'>
                    Obiekt Ubezpieczenia
                </div> 
                <div className='policy-list-sort-option'>
                    Szczegóły
                </div> 
                <div className='policy-list-sort-option'>
                    Płatność
                </div> 
                <div className='policy-list-sort-option'>
                    Data od
                </div> 
                <div className='policy-list-sort-option'>
                    Data do
                </div> 
                <div className='policy-list-sort-option'>
                    Dni do końca / raty
                </div> 
                <div className='policy-list-sort-option'>
                    Kontakt
                </div> 
            </div>
            { 
                    clients ? subArray = flattenedClients().sort(sortResults('policyDateEnd')).map((policy) => {
                        if (name.search("[\\[\\]?*+|{}\\\\()@.\n\r]") && surname.search("[\\[\\]?*+|{}\\\\()@.\n\r]")
                            && pesel.search("[\\[\\]?*+|{}\\\\()@.\n\r]") && phoneNumber.search("[\\[\\]?*+|{}\\\\()@.\n\r]")
                            && address.search("[\\[\\]?*+|{}\\\\()@.\n\r]") && amount.search("[\\[\\]?*+|{}\\\\()@.\n\r]") 
                            && policyNumber.search("[\\[\\]?*+|{}\\\\()@.\n\r]") && details.search("[\\[\\]?*+|{}\\\\()@.\n\r]") 
                            && object.search("[\\[\\]?*+|{}\\\\()@.\n\r]") && company.search("[\\[\\]?*+|{}\\\\()@.\n\r]")
                            && clientCompany.search("[\\[\\]?*+|{}\\\\()@.\n\r]") && nip.search("[\\[\\]?*+|{}\\\\()@.\n\r]")) {

                            const reName = new RegExp('^'+name.toLowerCase())
                            const reSurname = new RegExp('^'+surname.toLowerCase())
                            const rePesel = new RegExp('^'+pesel.toLowerCase())
                            const rePhoneNumber = new RegExp('^'+phoneNumber.toLowerCase())
                            const reAddress = new RegExp('^'+address.toLowerCase())

                            const reDateSet = new RegExp('^'+dateSet.toLowerCase())
                            const reDateEnd = new RegExp('^'+dateEnd.toLowerCase())
                            const reConfirmDate = new RegExp('^'+confirmDate.toLowerCase())

                            const reAmount = new RegExp('^'+amount.toLowerCase())
                            const rePayment = new RegExp('^'+payment.toLowerCase())
                            const reInstallments = new RegExp('^'+installments.toLowerCase())

                            const reType = new RegExp('^'+type.toLowerCase())
                            const rePolicyNumber = new RegExp('^'+policyNumber.toLowerCase())
                            const reDetails = new RegExp('^'+details.toLowerCase())
                            const reObject = new RegExp('^'+object.toLowerCase())
                            const reCompany = new RegExp('^'+company.toLowerCase())
                            
                            const reClientCompany = new RegExp('^'+clientCompany.toLowerCase())
                            const reNip = new RegExp('^'+nip.toLowerCase())


                        iteration++
                        return ((name && policy.name) ? reName.test(policy.name.toLowerCase()) : (name && !policy.name) ? false : true) && 
                                ((surname && policy.surname) ? reSurname.test(policy.surname.toLowerCase()) : (surname && !policy.surname) ? false : true) && 
                                ((pesel && policy.pesel) ? rePesel.test(policy.pesel.toLowerCase()) : (pesel && !policy.pesel) ? false : true) &&
                                ((phoneNumber && policy.phoneNumber) ? rePhoneNumber.test(policy.phoneNumber.toLowerCase()) : (phoneNumber && !policy.phoneNumber) ? false : true) &&
                                ((address && policy.address) ? reAddress.test(policy.address.toLowerCase()) : (address && !policy.address) ? false : true) &&
                                ((dateSet && policy.policyDateSet) ? reDateSet.test(policy.policyDateSet.toLowerCase()) : (dateSet && !policy.policyDateSet) ? false : true) &&
                                ((dateEnd && policy.policyDateEnd) ? reDateEnd.test(policy.policyDateEnd.toLowerCase()) : (dateEnd && !policy.policyDateEnd) ? false : true) &&
                                ((confirmDate && policy.policyConfirmDate) ? reConfirmDate.test(policy.policyConfirmDate.toLowerCase()) : (confirmDate && !policy.policyConfirmDate) ? false : true) &&
                                ((amount && policy.amount) ? reAmount.test(policy.amount.toLowerCase()) : (amount && !policy.amount) ? false : true) &&
                                ((payment && policy.payment) ? rePayment.test(policy.payment.toLowerCase()) : (payment && !policy.payment) ? false : true) &&
                                ((installments && policy.installments) ? reInstallments.test(policy.installments.toLowerCase()) : (installments && !policy.installments) ? false : true) &&
                                ((type && policy.policyType) ? reType.test(policy.policyType.toLowerCase()) : (type && !policy.policyType) ? false : true) &&
                                ((policyNumber && policy.policyNumber) ? rePolicyNumber.test(policy.policyNumber.toLowerCase()) : (policyNumber && !policy.policyNumber) ? false : true) &&
                                ((details && policy.policyVariant) ? reDetails.test(policy.policyVariant.toLowerCase()) : (details && !policy.policyVariant) ? false : true) &&
                                ((object && policy.typeDetails[0]) ? reObject.test(policy.typeDetails[0].toLowerCase()) : (object && !policy.typeDetails[0]) ? false : true) &&
                                ((company && policy.policyCompany) ? reCompany.test(policy.policyCompany.toLowerCase()) : (company && !policy.policyCompany) ? false : true) &&
                                ((clientCompany && policy.clientCompany) ? reClientCompany.test(policy.clientCompany.toLowerCase()) : (clientCompany && !policy.clientCompany) ? false : true) && 
                                ((nip && policy.nip) ? reNip.test(policy.nip.toLowerCase()) : (nip && !policy.nip) ? false : true) && 
                                convertDate(policy.policyDateSet, policy.policyDateEnd, policy.installments) &&
                        
                        <PolicyListElement index={iteration} key={policy.policyNumber} policyData={policy}></PolicyListElement>
                }}) : <LoadingScreen></LoadingScreen>
                }
                <button className='load-more' onClick={() => dispatch(getClients({numberOfClients: (clients.length == 0)?0:clients.length, n: numberOfSpec, isAll: false}))}>ZAŁADUJ WIĘCEJ</button>
                <button className='load-more' onClick={() => dispatch(getClients({numberOfClients: (clients.length == 0)?0:clients.length, n: numberOfSpec, isAll: true}))}>ZAŁADUJ WSZYSTKIE</button>
            
        </article>
    </>
    )
}


export default Deadlines