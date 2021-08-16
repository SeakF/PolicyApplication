import React, {useState} from 'react'
import '../styles/addStyles.css'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useDispatch, useSelector } from 'react-redux'
import { ADD_CLIENT, statusState } from '../features/clients/clients'
import ErrorWindow from '../components/errorWindow'
import Navbar from '../components/navbar'


const AddClient = () => {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [pesel, setPesel] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')

    const [clientIsPerson, setClientIsPerson] = useState(true)

    const [clientCompany, setClientCompany] = useState('')
    const [nip, setNip] = useState('')



    const [conjugateName, setConjugateName] = useState('')






    const handleSubmit = (e) => {
        e.preventDefault()

        if (name && surname) {
            const newClient = {
                name, 
                surname,
                pesel: pesel || null,
                phoneNumber: phoneNumber || null,
                address: address || null,
                email: email || null,
                conjugateName: conjugateName || null,
                policy: []
            }

            dispatch(ADD_CLIENT(newClient))
            window.location.href = '../views/clientList'

        } else if (clientCompany) {
            const newClient = {
                clientCompany,
                nip: nip || null,
                name: name || null, 
                surname: surname || null,
                pesel: pesel || null,
                phoneNumber: phoneNumber || null,
                address: address || null,
                email: email || null,
                conjugateName: conjugateName || null,
                policy: []
            }

            dispatch(ADD_CLIENT(newClient))
            window.location.href = '../views/clientList'

        } else {
            console.log('uzupełnij dane')
        }            
    }

    const capitalizeStLetter = (word) => {
        return word && word[0].toUpperCase() + word.slice(1);
    }

    return (
    <>
    <Navbar></Navbar>
        <section className='add-container'>
            <article className='add-title'>
                <span>Dodaj Klienta</span>
            </article>


            <form onSubmit={handleSubmit}>


            <article className='add-section'>
                <div className='add-section-title'>
                    <h1>Dane Klienta</h1> 
                </div>               
                <div className='add-section-forms'>
                    <div className='add-section-forms-radio'><input type="radio" name='choseClientStatus' onClick={() => setClientIsPerson(true)} defaultChecked/> Osoba prywatna</div>
                    <div className='add-section-forms-radio'><input type="radio" name='choseClientStatus' onClick={() => setClientIsPerson(false)}/> Firma</div>
                </div> 
                <div className='add-section-forms'>
                    {clientIsPerson ? 

                    <>
                        <label><input className='input-label' value={name} onChange={(e) => setName(capitalizeStLetter(e.target.value))} type="text" required /> <div>Imie*</div></label>
                        <label><input className='input-label' value={surname} onChange={(e) => setSurname(capitalizeStLetter(e.target.value))} type="text" required /> <div>Nazwisko*</div></label>
                        <label><input className='input-label' value={pesel} onChange={(e) => setPesel(e.target.value)} type="text" /> <div>Pesel</div></label>
                        <label><input className='input-label' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" /> <div>Numer Telefonu (prefiks +48 dodaje sie automatycznie, poprawny zapis: 111222333)</div></label>
                        <label><input className='input-label' value={address} onChange={(e) => setAddress(e.target.value)} type="text" /> <div>Adres</div></label>
                        <label><input className='input-label' value={email} onChange={(e) => setEmail(e.target.value)} type="text" /> <div>Email</div></label>
                        <label><input className='input-label' value={conjugateName} onChange={(e) => setConjugateName(e.target.value)} type="text" /> <div>Zwrot grzecznościowy do SMS (np. "Panie Ryszardzie", bez nazwiska i do osób prywatnych)</div></label>
                    </>
                    : 
                    <>
                        <label><input className='input-label' value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} type="text" required /> <div>Nazwa firmy*</div></label>
                        <label><input className='input-label' value={nip} onChange={(e) => setNip(e.target.value)} type="text" /> <div>NIP</div></label>
                        <label><input className='input-label' value={name} onChange={(e) => setName(capitalizeStLetter(e.target.value))} type="text" /> <div>Imie właściciela</div></label>
                        <label><input className='input-label' value={surname} onChange={(e) => setSurname(capitalizeStLetter(e.target.value))} type="text" /> <div>Nazwisko właściciela</div></label>
                        <label><input className='input-label' value={pesel} onChange={(e) => setPesel(e.target.value)} type="text" /> <div>Pesel</div></label>
                        <label><input className='input-label' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" /> <div>Numer Telefonu (prefiks +48 dodaje sie automatycznie, poprawny zapis: 111222333)</div></label>
                        <label><input className='input-label' value={address} onChange={(e) => setAddress(e.target.value)} type="text" /> <div>Adres</div></label>
                        <label><input className='input-label' value={email} onChange={(e) => setEmail(e.target.value)} type="text" /> <div>Email</div></label>
                    </>
                    
                    }

                </div>
            </article>
            <article className='add-section'>
                <div className='add-section-title'>
                    <h1>Zatwierdzenie</h1> 
                </div>
                <div className='accept-container'>
                    <button type='submit' className='accept-btn-container'>
                        <PersonAddIcon style={{fontSize: 50}} className='accept-btn'></PersonAddIcon>
                        <span>Dodaj Klienta</span>
                    </button>
                </div>
            </article>


            </form>


        </section>
    </>
    )
}

export default AddClient