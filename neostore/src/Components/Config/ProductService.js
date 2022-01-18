import axios from "axios";
import { MAIN_URL } from './URL'
let token=localStorage.getItem('_token');
console.log(token)

//fetch Product Data
export function fetchProduct() {
    return (console.log("fetch Product"), axios.get(`${MAIN_URL}product/productdata`));
}
export function getCategory() {
    return (console.log("fetch category"), axios.get(`${MAIN_URL}category/categorydata`));
}
export function getColor() {
    return (console.log("fetch color"), axios.get(`${MAIN_URL}color/colordata`));
}

//get by Color
export function getColorProd(col) {
    return (console.log("fetch color product",col), axios.post(`${MAIN_URL}product/sorteddata`,col));
}

//get by Category
export function getCategoryProd(cat) {
    return (console.log(cat), axios.post(`${MAIN_URL}product/sorteddata`,cat));
}
//get Single Product
export function getSingleProduct(id) {
    return (console.log(id), axios.get(`${MAIN_URL}product/getsingleitem/${id}`));
}

//Edid Id
export function changeId(data) {
    return (console.log(data), axios.post(`${MAIN_URL}cart/editid`,data));
}

//update Rating
export function updateRating(data) {
    return (console.log(data), axios.post(`${MAIN_URL}product/updaterating`,data));
}


//Add to cart
export function Addcart(data) {
    return (console.log(data), axios.post(`${MAIN_URL}cart/addcart`,data));
}
export function getCart(data) {
    return (console.log(data), axios.post(`${MAIN_URL}cart/getcart`,data));
}
//get cart
// export function getCart(data) {
//     return (console.log(data), axios.post(`${MAIN_URL}cart/getcart`,data));
// }
//get all cart details
export function getAllCart(data) {
    return (console.log(data), axios.post(`${MAIN_URL}cart/getallcart`,data));
}

//increment quantity
export function incproduct(data) {
    return (console.log(data), axios.post(`${MAIN_URL}cart/incrementproduct`,data));
}
//decrement quantity
export function decproduct(data) {
    return (console.log(data), axios.post(`${MAIN_URL}cart/decrementproduct`,data));
}
//decrement quantity
export function delCart(data) {
    return (console.log(data), axios.post(`${MAIN_URL}cart/deletecart`,data));
}

//place order
export function placeOrder(data) {
    return (console.log(data), axios.post(`${MAIN_URL}cart/placeorder`,data));
}
export function getAllOrder(data) {
    return (console.log(data), axios.post(`${MAIN_URL}cart/getallorder`,data));
}

