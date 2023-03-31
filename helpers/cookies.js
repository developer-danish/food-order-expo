import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async (value) => {
  try {
    await AsyncStorage.setItem("token", value);
  } catch (e) {
    console.log(e);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (e) {
    console.log(e);
  }
};

export const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (e) {
    console.log(e);
  }
};
