import React, {useState} from 'react'
import '../styles/addStyles.css'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useDispatch } from 'react-redux'
import { ADD_CLIENT } from '../features/clients/clients'
import Navbar from '../components/Navbar'


const AddClient = () => {

    const dispatch = useDispatch()

    const [person, setPerson] = useState({
        name: '',
        surname: '',
        pesel: '',
        phoneNumber: '',
        address: '',
        email: '',
        conjugateName: '',
        clientIsPerson: true,
        clientCompany: '',
        nip: '',
        clientNote: '',
        policy: []
    })

    const clearProps = (object) => { // do eksportowania chyba
        for (const key in object) {
            if (key != 'clientIsPerson' && key != 'policy') object[key] = ''
        }
        return object
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (person.clientCompany !== '' || person.name !== '' && person.surname !== '') {
            dispatch(ADD_CLIENT(person))
            window.location.href = '../views/clientList'
        } else {
            console.log('uzupełnij dane')
        }            
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
                    <div className='add-section-forms-radio'><input type="radio" name='choseClientStatus' onClick={() => {setPerson(clearProps(person)); setPerson({...person, clientIsPerson: true});}} defaultChecked/> Osoba prywatna</div>
                    <div className='add-section-forms-radio'><input type="radio" name='choseClientStatus' onClick={() => {setPerson(clearProps(person)); setPerson({...person, clientIsPerson: false});}}/> Firma</div>
                </div> 
                <div className='add-section-forms'>
                    {person.clientIsPerson ? 

                    <>
                        <label><input className='input-label' value={person.name} onChange={(e) => setPerson({...person, name: e.target.value})} type="text" required /> <div>Imie*</div></label>
                        <label><input className='input-label' value={person.surname} onChange={(e) => setPerson({...person, surname: e.target.value})} type="text" required /> <div>Nazwisko*</div></label>
                        <label><input className='input-label' value={person.pesel} onChange={(e) => setPerson({...person, pesel: e.target.value})} type="text" /> <div>Pesel</div></label>
                        <label><input className='input-label' value={person.phoneNumber} onChange={(e) => setPerson({...person, phoneNumber: e.target.value})} type="text" /> <div>Numer Telefonu (prefiks +48 dodaje sie automatycznie, poprawny zapis: 111222333)</div></label>
                        <label><input className='input-label' value={person.address} onChange={(e) => setPerson({...person, address: e.target.value})} type="text" /> <div>Adres</div></label>
                        <label><input className='input-label' value={person.email} onChange={(e) => setPerson({...person, email: e.target.value})} type="text" /> <div>Email</div></label>
                        <label><input className='input-label' value={person.conjugateName} onChange={(e) => setPerson({...person, conjugateName: e.target.value})} type="text" /> <div>Zwrot grzecznościowy do SMS (np. "Panie Ryszardzie", bez nazwiska i do osób prywatnych)</div></label>
                    </>
                    : 
                    <>
                        <label><input className='input-label' value={person.clientCompany} onChange={(e) => setPerson({...person, clientCompany: e.target.value})} type="text" required /> <div>Nazwa firmy*</div></label>
                        <label><input className='input-label' value={person.nip} onChange={(e) => setPerson({...person, nip: e.target.value})} type="text" /> <div>NIP</div></label>
                        <label><input className='input-label' value={person.name} onChange={(e) => setPerson({...person, name: e.target.value})} type="text" /> <div>Imie właściciela</div></label>
                        <label><input className='input-label' value={person.surname} onChange={(e) => setPerson({...person, surname: e.target.value})} type="text" /> <div>Nazwisko właściciela</div></label>
                        <label><input className='input-label' value={person.pesel} onChange={(e) => setPerson({...person, pesel: e.target.value})} type="text" /> <div>Pesel</div></label>
                        <label><input className='input-label' value={person.phoneNumber} onChange={(e) => setPerson({...person, phoneNumber: e.target.value})} type="text" /> <div>Numer Telefonu (prefiks +48 dodaje sie automatycznie, poprawny zapis: 111222333)</div></label>
                        <label><input className='input-label' value={person.address} onChange={(e) => setPerson({...person, address: e.target.value})} type="text" /> <div>Adres</div></label>
                        <label><input className='input-label' value={person.email} onChange={(e) => setPerson({...person, email: e.target.value})} type="text" /> <div>Email</div></label>
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