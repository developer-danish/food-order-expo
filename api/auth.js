import axios from 'axios';

export const signup = async (data) => {
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    // const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    const response = await axios.post("https://food-order-b6n5.onrender.com/api/auth/signup",data,config);
    return response;
}

export const signin = async (data)=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const response = await axios.post("https://food-order-b6n5.onrender.com/api/auth/signin",data,config);
    return response;
}