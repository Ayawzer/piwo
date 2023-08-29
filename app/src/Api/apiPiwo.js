import axios from 'axios';

export const fetchPiwa = async () => {
    try {
        const res = await axios.get('http://localhost:8080/piwo');
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}