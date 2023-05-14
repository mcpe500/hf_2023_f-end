import axios from 'axios';

export const axiosGet = (url, token) => {
    const axios_req = axios.create({
        baseURL: 'https://6618-182-253-199-42.ngrok-free.app',
        headers: {
            'Access-Control-Allow-Origin': 'https://6618-182-253-199-42.ngrok-free.app',
            'x-auth-token': token,
        }
    })
    return axios_req.get(
        url
    )
}