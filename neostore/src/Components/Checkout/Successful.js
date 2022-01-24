import React,{useEffect} from 'react'
import {Container,Button,Alert} from 'react-bootstrap'
import { useSelector ,useDispatch} from 'react-redux'
import { getCart } from '../Config/ProductService';
import jwt_decode from 'jwt-decode'
export default function Successful() {
    const dispatch = useDispatch();
    useEffect(()=>{
        let token = localStorage.getItem('_token')
        let decode = jwt_decode(token)
        let data = {id:decode.uid[0]._id}
        getCart(data)
        .then((res) => {
            let count = res.data.count;
            dispatch({ type: 'cart', payload: count })
        })
    },[])
    
    return (
        <>
             <Container>
            <h1>Order has been placed Successfully</h1><br/>
            <Alert varaint="info">You will  receive notification to email with order details</Alert><br/>
            <Button variant="light" className="btn btn-outline-dark my-2 my-sm-0" href="/dashboard">Go an order some other </Button>
        </Container>
        </>
    )
}
