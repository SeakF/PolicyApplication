import React, {useState} from "react";
import { Link } from 'react-router-dom'
import '../styles/policyList.css'
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const PolicyListMenu = () => {
    return (
    <article className='policy-list-menu'>
        <div className='policy-list-menu-columns'>
            <label><input type="text" /> Imie</label>
            <label><input type="text" /> Nazwisko</label>
            <label><input type="text" /> Pesel klienta</label>
            <label><input type="text" /> Adres klienta</label>
        </div>
        <div className='policy-list-menu-columns'>
            <label><input type="date" /> Data Rozpoczęcia</label>
            <label><input type="date" /> Data Zakończenia</label>
            <label><input type="date" /> Data Zawarcia</label>
            <label><input type="month" /> miesiąc</label>
        </div>
        <div className='policy-list-menu-columns'>
            <label><input type="text" /> Numer Polisy</label>
            <label><input type="text" /> Szczegóły</label>
            <label><input type="number" min="1" step="any" /> Stawka</label>
            <label><input type="number" min="1" step="any" /> Płatność</label>

        </div>
        <div className='policy-list-menu-columns'>            
            <label>
                <select>
                    <option>komunikacyjna</option>
                    <option>zdrowotna</option>
                    <option>nieruchomościowa</option>
                    <option>inne</option>
                </select> Rodzaj  
            </label>
            <label><input type="text" /> Obiekt</label>
            <label><input type="text" /> Towarzystwo</label>
            <label><input type="text" /> Numer Telefonu</label>
        </div>
        <div className='policy-list-menu-columns'>
            <Link to="/views/addPolicy">
                <NoteAddIcon style={{fontSize: 50}}></NoteAddIcon>
            </Link>
        </div>
    </article>
    )
}


export default PolicyListMenu