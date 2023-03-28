import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocalStorage= async (key,value)=>{
    await AsyncStorage.setItem('user', JSON.stringify(value));
}

export const  getLocalStorage = async(key) =>(
    await AsyncStorage.getItem('user')
);

export const deleteLocalStorage = async(key) => {
    await AsyncStorage.removeItem('user');
}