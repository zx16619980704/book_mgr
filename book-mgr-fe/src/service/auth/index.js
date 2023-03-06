import axios from "axios";
export const register = (account, password, inviteCode) => {
  return axios.post("http://localhost:3000/register", {
    account,
    password,
    inviteCode,
  });
};
export const login = (account, password) => {
  return axios.post("http://localhost:3000/login", {
    account,
    password,
  });
};
