import {setToken} from "../../config/Token";
import {getAxiosInstance} from "../../config/Axios";

const axios = getAxiosInstance('/account');

export async function login({name, pass}) {
  try {
    const res = await axios.post(`/login`, {name, pass});
    const jwt = res.data.jwt;
    setToken(jwt);
    return true;
  } catch (error) {
    return false;
  }
}

export async function createAccount({name, pass}) {
  try {
    await axios.post(`/create`, {name, pass});
    return true;
  } catch (error) {
    return false;
  }
}

export async function getStatus() {
  try {
    return (await axios.get(`/status`)).data;
  } catch (error) {
    return false;
  }
}