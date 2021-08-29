import React, {useState} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { computeDateToString, computeStringToDate } from '../features/functions/functions'
import { selectClient, numberOfSpecific, getSpecificClient } from '../features/clients/clients'
import '../styles/policyList.css'
import DatePicker from "react-datepicker"
import Navbar from '../components/Navbar'
import PolicyListBox from '../components/PolicyListBox'

const Deadlines = () => {


    const dispatch = useDispatch()
    const clients = useSelector(selectClient)
    const numberOfSpec = useSelector(numberOfSpecific)

    const [search, setSearch] = useState({
        name: '',
        surname: '',
        pesel: '',
        clientCompany: '',
        nip: '',
        policyNumber: '',
        policyDateEnd: ''
    })
    
    let subArray
    

    return (
    <>
    <Navbar></Navbar>
        <article className='policy-list-menu'>
            <div className='policy-list-menu-columns'>
                <label><input type="text" value={search.name} onChange={(e) => {setSearch({...search, name: e.target.value}); dispatch(getSpecificClient({type: 'name', value: e.target.value}))}}  /> Imie</label>
                <label><input type="text" value={search.surname} onChange={(e) => {setSearch({...search, surname: e.target.value}); dispatch(getSpecificClient({type: 'surname', value: e.target.value}))}}  /> Nazwisko</label>
                <label><input type="text" value={search.pesel} onChange={(e) => {setSearch({...search, pesel: e.target.value}); dispatch(getSpecificClient({type: 'pesel', value: e.target.value}))}}  /> Pesel klienta</label>
            </div>
            <div className='policy-list-menu-columns'>
                <label><DatePicker placeholderText='dzień-miesiąc-rok' onChange={(date) => {setSearch({...search, policyDateEnd: computeDateToString(date, false)}); dispatch(getSpecificClient({type: 'policyDateEnd', value: computeDateToString(date, false)}))}} selected={computeStringToDate(search.policyDateEnd)} dateFormat="dd-MM-yyyy" isClearable required></DatePicker> Data Zakończenia</label>
            </div>
            <div className='policy-list-menu-columns'>
                <label><input type="text" value={search.policyNumber} onChange={(e) => {setSearch({...search, policyNumber: e.target.value}); dispatch(getSpecificClient({type: 'policyNumber', value: e.target.value}))}}  /> Numer Polisy</label>
                <label><input type="text" value={search.clientCompany} onChange={(e) => {setSearch({...search, clientCompany: e.target.value}); dispatch(getSpecificClient({type: 'clientCompany', value: e.target.value}))}} /> Nazwa firmy</label>
                <label><input type="text" value={search.nip} onChange={(e) => {setSearch({...search, nip: e.target.value}); dispatch(getSpecificClient({type: 'nip', value: e.target.value}))}} /> NIP</label>
            </div>
            <div className='policy-list-menu-columns'></div>
        </article>
        <PolicyListBox search={search} clients={clients} numberOfSpec={numberOfSpec}></PolicyListBox>
    </>
    )
}


export default Deadlines