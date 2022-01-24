import axios from "axios";
import { MAIN_URL } from './URL'
let token=localStorage.getItem('_token');


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
    return  axios.post(`${MAIN_URL}user/register`, data);
}

//sendmail
export function sendEmail(data) {
    return  axios.post(`${MAIN_URL}user/sendmail`, data);
}

//recover Password

export function recoverPass(data) {
    return axios.post(`${MAIN_URL}user/recoverpass`,data);
}

//fetch profile data
export function fetchProfile(data) {
    return  axios.post(`${MAIN_URL}user/profiledata`,data,{headers:{"Authorization":`Bearer ${localStorage.getItem('_token')}`}});
}

//Password Change
export function changePass(data) {
    return  axios.post(`${MAIN_URL}user/changepass`, data,{headers:{"Authorization":`Bearer ${localStorage.getItem('_token')}`}} );
}

//update Profile
export function updateProfile(data) {
    return  axios.post(`${MAIN_URL}user/updateprofile`, data ,{headers:{"Authorization":`Bearer ${localStorage.getItem('_token')}`}} );
}

//add address
export function addAddress(data) {
    return axios.post(`${MAIN_URL}user/addaddress`, data,{headers:{"Authorization":`Bearer ${localStorage.getItem('_token')}`}});
}

//edit address
export function editAddress(data) {
    return  axios.post(`${MAIN_URL}user/editaddress`, data,{headers:{"Authorization":`Bearer ${localStorage.getItem('_token')}`}});
}


//delete address
export function deleteAddr(data) {
    return  axios.post(`${MAIN_URL}user/deleteaddress`, data,{headers:{"Authorization":`Bearer ${localStorage.getItem('_token')}`}});
}

//upload logo
export function uploadPic(data) {
    return axios.post(`${MAIN_URL}user/uploadlogo`, data, { headers: { 'content-type': 'multipart/form-data' } })
}

export function sendOrder(data){
    return axios.post(`${MAIN_URL}user/sendOrderMail`,data,{headers:{"Authorization":`Bearer ${localStorage.getItem('_token')}`}}) 
}

