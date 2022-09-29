import axios from "axios";

const BASE_URL = 'https://dry-fortress-44491.herokuapp.com/api';


export default axios.create({
    baseURL:BASE_URL,
    headers:{
        'Content-Type': 'application/json',
        
    }
})
