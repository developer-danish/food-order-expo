import axios from 'axios';
import { getToken } from '../helpers/cookies';


export const apiObject = {
    config : {
        headers:{
            "Content-Type":"application/json",
            Authorization:  async () => (
                await getToken()
            )
        },
    },
    signin: async (data) => {
        const response = await axios.post("https://food-order-b6n5.onrender.com/api/auth/signin",data,{
            headers:{
                "Content-Type":"application/json"
            },
        });
        return response;
    },
    signup: async (data) => {
        const response = await axios.post("https://food-order-b6n5.onrender.com/api/auth/signup", data,{
            headers:{
                "Content-Type":"application/json"
            },
        });
        return response;
    },
    post: async (url, data) => {
        const response = await axios.post(url,data,config);
        return response;
    },
    get: async (url) => {
        const response = await axios.get(url, config);
        return response;
    },
    put: async (url, data) => {
        const response = await axios.put(url, data, config);
        return response;
    },
    delete:  async (url, id) => {
        const response = await axios.delete(url, id, config);
        return response;
    },

}