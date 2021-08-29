import React, {useState} from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectClient, numberOfSpecific, getSpecificClient } from '../features/clients/clients'
import { computeDateToString, computeStringToDate } from '../features/functions/functions'
import '../styles/policyList.css'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import DatePicker from "react-datepicker"
import Navbar from '../components/Navbar'
import PolicyListBox from '../components/PolicyListBox'

const PolicyList = () => {

    const dispatch = useDispatch()
    const clients = useSelector(selectClient)
    const numberOfSpec = useSelector(numberOfSpecific)

    const [search, setSearch] = useState({
        name: '',
        surname: '',
        pesel: '',
        clientCompany: '',
        nip: '',
        address: '',
        phoneNumber: '',
        policyNumber: '',
        policyDateSet: '',
        policyDateEnd: '',
        amount: '',
        payment: '',
        installments: '',
        policyType: '',
        policyVariant: '',
        object: '',
        policyCompany: ''
    })

        return (
    <>
        <Navbar></Navbar>
        <section className='policy-list'>
            <article className='policy-list-menu'>
                <div className='policy-list-menu-columns'>
                    <label><input type="text" value={search.name} onChange={(e) => {setSearch({...search, name: e.target.value}); dispatch(getSpecificClient({type: 'name', value: e.target.value}))}} /> Imie</label>
                    <label><input type="text" value={search.surname} onChange={(e) => {setSearch({...search, surname: e.target.value}); dispatch(getSpecificClient({type: 'surname', value: e.target.value}))}} /> Nazwisko</label>
                    <label><input type="text" value={search.pesel} onChange={(e) => {setSearch({...search, pesel: e.target.value}); dispatch(getSpecificClient({type: 'pesel', value: e.target.value}))}} /> Pesel klienta</label>
                    <label><input type="text" value={search.address} onChange={(e) => {setSearch({...search, address: e.target.value}); dispatch(getSpecificClient({type: 'address', value: e.target.value}))}} /> Adres klienta</label>
                    <label><input type="tel" value={search.phoneNumber} onChange={(e) => {setSearch({...search, phoneNumber: e.target.value}); dispatch(getSpecificClient({type: 'phoneNumber', value: e.target.value}))}} /> Telefon</label>
                </div>
                <div className='policy-list-menu-columns'>
                    <label><DatePicker placeholderText='dzień-miesiąc-rok' onChange={(date) => {setSearch({...search, policyDateSet: computeDateToString(date, false)}); dispatch(getSpecificClient({type: 'policyDateSet', value: computeDateToString(date, false)}))}} selected={computeStringToDate(search.policyDateSet)} dateFormat="dd-MM-yyyy" isClearable required></DatePicker> Data Rozpoczęcia</label>
                    <label><DatePicker placeholderText='dzień-miesiąc-rok' onChange={(date) => {setSearch({...search, policyDateEnd: computeDateToString(date, false)}); dispatch(getSpecificClient({type: 'policyDateEnd', value: computeDateToString(date, false)}))}} selected={computeStringToDate(search.policyDateEnd)} dateFormat="dd-MM-yyyy" isClearable required></DatePicker> Data Zakończenia</label>
                </div> 
                <div className='policy-list-menu-columns'>
                    <label><input type="text" value={search.clientCompany} onChange={(e) => {setSearch({...search, clientCompany: e.target.value}); dispatch(getSpecificClient({type: 'clientCompany', value: e.target.value}))}} /> Nazwa firmy</label>
                    <label><input type="text" value={search.nip} onChange={(e) => {setSearch({...search, nip: e.target.value}); dispatch(getSpecificClient({type: 'nip', value: e.target.value}))}} /> NIP</label>
                    <label><input type="number" value={search.amount} onChange={(e) => {setSearch({...search, amount: e.target.value}); dispatch(getSpecificClient({type: 'amount', value: e.target.value}))}} min="1" step="any" /> Stawka zł</label>
                    <label>
                        <select value={search.payment} onChange={(e) => {setSearch({...search, payment: e.target.value}); dispatch(getSpecificClient({type: 'payment', value: e.target.value}))}}>
                            <option defaultValue></option>
                            <option>Gotówka</option>
                            <option>Przelew</option>
                        </select> Płatność  
                    </label>
                    <label>
                        <select value={search.installments} onChange={(e) => {setSearch({...search, installments: e.target.value}); dispatch(getSpecificClient({type: 'installments', value: e.target.value}))}}>
                            <option defaultValue></option>
                            <option>Jednorazowo</option>
                            <option>Pół roku</option>
                            <option>Kwartał</option>
                        </select> Raty  
                    </label>
                </div>
                <div className='policy-list-menu-columns'>            
                    <label>
                        <select value={search.policyType} onChange={(e) => {setSearch({...search, policyType: e.target.value}); dispatch(getSpecificClient({type: 'policyType', value: e.target.value}))}}>
                            <option defaultChecked></option>
                            <option>komunikacyjna</option>
                            <option>zdrowotna</option>
                            <option>gospodarcza</option>
                            <option>turystyczna</option>
                            <option>uprawy</option>
                            <option>dom/mieszkanie</option>
                            <option>rolna</option>
                            <option>życie</option>
                            <option>firma</option>
                        </select> Rodzaj  
                    </label>
                    <label><input type="text" value={search.policyNumber} onChange={(e) => {setSearch({...search, policyNumber: e.target.value}); dispatch(getSpecificClient({type: 'policyNumber', value: e.target.value}))}} /> Numer Polisy</label>
                    <label><input type="text" value={search.policyVariant} onChange={(e) => {setSearch({...search, policyVariant: e.target.value}); dispatch(getSpecificClient({type: 'policyVariant', value: e.target.value}))}} /> Szczegóły</label>
                    <label><input type="text" value={search.object} onChange={(e) => {setSearch({...search, object: e.target.value}); dispatch(getSpecificClient({type: 'typeDetails.detail1', value: e.target.value}))}} /> Obiekt</label>
                    <label>
                        <select value={search.policyCompany} onChange={(e) => {setSearch({...search, policyCompany: e.target.value}); dispatch(getSpecificClient({type: 'policyCompany', value: e.target.value}))}}>
                            <option defaultValue></option>
                            <option>Allianz</option>
                            <option>Aviva</option>
                            <option>Axa</option>
                            <option>Balcia</option>
                            <option>Benefia</option>
                            <option>Bre Ubezpieczenia (mBank)</option>
                            <option>Compensa</option>
                            <option>Concordia</option>
                            <option>Ergo Hestia</option>
                            <option>Gefion</option>
                            <option>Generali</option>
                            <option>InterRisk</option>
                            <option>Link4</option>
                            <option>MTU</option>
                            <option>Proama</option>
                            <option>PZU</option>
                            <option>TUW Pocztowe</option>
                            <option>TUW TUW</option>
                            <option>TUW WUZ</option>
                            <option>Uniqa</option>
                            <option>VH Polska</option>
                            <option>Warta/HDI</option>
                            <option>WIENER</option>
                            <option>You Can Drive</option>
                        </select> Towarzystwo 
                    </label> 
                </div>
                <div className='policy-list-menu-columns'>
                    <Link to="/views/addPolicy">
                        <NoteAddIcon style={{fontSize: 50}}></NoteAddIcon>
                    </Link>
                </div>
            </article>
            <PolicyListBox search={search} clients={clients} numberOfSpec={numberOfSpec}></PolicyListBox>
        </section>
    </>
    )
}

export default PolicyList