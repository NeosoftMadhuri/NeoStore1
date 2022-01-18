import axios from "axios";
import { MAIN_URL } from './URL'
let token=localStorage.getItem('_token');
console.log(token)

//LOGIN
export function login(data) {
    return axios.post(`${MAIN_URL}user/login`, data);
}

//user Social Login
export function UserSocialLogin(data) {
    return axios.post(`${MAIN_URL}user/sociallogin`, data);
    
}

//REGISTER
export function register(data) {
    return (console.log(data), axios.post(`${MAIN_URL}user/register`, data));
}

//sendmail
export function sendEmail(user) {
    return (console.log(user), axios.post(`${MAIN_URL}user/sendmail`, user));
}

//recover Password

export function recoverPass(data) {
    return (console.log(data), axios.post(`${MAIN_URL}user/recoverpass`,data));
}

//fetch profile data
export function fetchProfile(data) {
    return (console.log(data), axios.post(`${MAIN_URL}user/profiledata`,data,{headers:{"Authorization":`Bearer ${token}`}}));
}

//Password Change
export function changePass(data) {
    return (console.log(data), axios.post(`${MAIN_URL}user/changepass`, data,{headers:{"Authorization":`Bearer ${token}`}} ));
}

//update Profile
export function updateProfile(data) {
    return (console.log(data), axios.post(`${MAIN_URL}user/updateprofile`, data ,{headers:{"Authorization":`Bearer ${token}`}} ));
}

//add address
export function addAddress(data) {
    return (console.log(data), axios.post(`${MAIN_URL}user/addaddress`, data,{headers:{"Authorization":`Bearer ${token}`}}));
}

//edit address
export function editAddress(data) {
    return (console.log(data), axios.post(`${MAIN_URL}user/editaddress`, data,{headers:{"Authorization":`Bearer ${token}`}}));
}


//delete address
export function deleteAddr(data) {
    return (console.log(data), axios.post(`${MAIN_URL}user/deleteaddress`, data,{headers:{"Authorization":`Bearer ${token}`}}));
}

//upload logo
export function uploadPic(data) {
    return axios.post(`${MAIN_URL}user/uploadlogo`, data, { headers: { 'content-type': 'multipart/form-data' } })
}

export function sendOrder(data){
    return axios.post(`${MAIN_URL}user/sendOrderMail`,data,{headers:{"Authorization":`Bearer ${token}`}}) 
}

