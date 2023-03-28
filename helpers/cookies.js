import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken= async(value)=>{
   await AsyncStorage.setItem('token',value)
}

export const getToken = async() => {
   return await AsyncStorage.getItem('token');
}

export const deleteToken = async(key) => {
   await AsyncStorage.removeItem('token');
}
