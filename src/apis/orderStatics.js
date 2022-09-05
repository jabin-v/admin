import axios from 'axios';
const BASE_URL = 'http://localhost:3500/api/';


//axios instance
export default axios.create({

    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Authorization':'Bearer '+

    }
});