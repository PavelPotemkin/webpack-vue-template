import axios from "axios";

const instance = axios.create({
  baseURL: '/',
  timeout: 2000,
});

instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  console.log(response)
  return response;
}, function (error) {
  console.log(error)
  return Promise.reject(error);
});


export default instance
