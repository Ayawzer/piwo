import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Input } from '../Components/Input';

const Update = () => {
    const [piwa, setPiwa] = useState({
        piwoTitle: '',
        piwoDesc: '',
        piwoThumb: '',
        piwoGrade: null
    });

    const [errors, setErrors] = useState({});
    const validateInput = () => {
        let formErrors = {};
        if (!piwa.piwoTitle) {
            formErrors.piwoTitle = "Jakie piwo wariacie?";
        }
        if (!piwa.piwoGrade) {
            formErrors.piwoGrade = "Ocenka tez wazna!";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const navigate = useNavigate();
    const location = useLocation();
    const piwoId = location.pathname.split('/')[2];

    const handleChange = (e) => {
        setPiwa((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    };
    
    const handleClick = async e => {
        if (!validateInput()) return;
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/piwo/${piwoId}`, piwa);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex flex-col gap-12 items-center justify-center text-center'>
            <h1 className='text-3xl font-bold uppercase'>Aktualizuj piwsko</h1>
            <Input type="text" placeholder="Nazwa piwka" onChange={ handleChange } name='piwoTitle' required/>
              {errors.piwoTitle && <p className="text-red-500 mt-2">{errors.piwoTitle}</p>}
            <Input type="text" placeholder="Opis piwka" onChange={ handleChange } name='piwoDesc'/>
            <Input type="text" placeholder="Link do zdjęcia piwka" onChange={ handleChange } name='piwoThumb' />
            <Input type="number" placeholder="Ocena piwka" onChange={ handleChange } name='piwoGrade' required/>
              {errors.piwoGrade && <p className="text-red-500 mt-2">{errors.piwoGrade}</p>}
            <div className='flex flex-col gap-2 items-center justify-center text-center w-full'>
              <button 
                className='bg-blue-300 py-2 rounded-full hover:bg-blue-400 transition-all ease-in-out w-full' 
                onClick={ handleClick }> 
                  Aktualizuj 
              </button>
              <Link to ="/" className='bg-green-300 py-2 rounded-full hover:bg-green-400 transition-all ease-in-out w-full'>
                     Wróć do listy piwek
                </Link>
            </div>
        </div>
    )
}

export default Update;