import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPiwa } from '../Api/apiPiwo';
import axios from 'axios';

const Piwa = () => {
    const [piwa, setPiwa] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPiwa();
            setPiwa(data);
        }
        fetchData();
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/piwo/${id}`);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex flex-col gap-16 items-center justify-center text-center'>
            <div className=''>
                <h1 className='text-3xl font-bold uppercase '>Piwa</h1>
            </div>
            <div className="flex flex-col md:flex-row items-end flex-wrap ">
                {piwa.map(piwo => {
                    const piwoImg = `http://localhost:8080/uploads/${piwo.piwoThumb}`;
                    return (
                    <div className='basis-2/6' key={ piwo.piwoId }>
                        {piwoImg && <img src={piwoImg} alt={piwo.piwoTitle} className='w-60 object-contain inline'/> }
                        <h2 className='uppercase font-bold'>{ piwo.piwoTitle }</h2>
                        <p>{ piwo.piwoDesc }</p>
                        <p>{ piwo.piwoGrade }/10</p>
                        <div className='flex flex-col items-center gap-y-2'>
                            <button className='p-1 bg-red-300 hover:bg-red-400 rounded-full transition ease-in-out w-9/12' onClick={() => handleDelete(piwo.piwoId)}> Usuń piweczko </button>
                                <Link to={`/update/${piwo.piwoId}`} className='p-1 bg-blue-300 hover:bg-blue-400 rounded-full transition ease-in-out  w-9/12'>
                                    Edytuj piweczko
                                </Link>
                        </div>
                    </div>
                )})}
            </div>
                <Link to ="/add" className='bg-yellow-300 w-6/12 py-3 rounded-full hover:bg-orange-400 transition-all ease-in-out'>
                    Dodaj piwsko
                </Link>
        </div>
    )
}

export default Piwa