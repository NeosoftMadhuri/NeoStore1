import React,{useEffect, useState} from 'react'
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap'
import { getAllCart,incproduct,decproduct,delCart,getCart,placeOrder } from '../Config/ProductService'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from '../Checkout/Checkout.module.css'
import Footer from '../Footer/Footer'
import jwt_decode from 'jwt-decode'
import { useSelector ,useDispatch} from 'react-redux'
import { sendOrder } from '../Config/Myservice'

export default function Checkout() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [account_no,setAccount_no]=useState('');
    const [expiry,setExpiry]=useState('');
    
    console.log(state)

    useEffect(()=>{
        let token = localStorage.getItem('_token')
        let decode = jwt_decode(token)
        let data = {id:decode.uid[0]._id}
        getCart(data)
        .then((res) => {
            let count = res.data.count;
            dispatch({ type: 'cart', payload: count })
        })
        .catch(err => {
                
            navigate('/ServerError')
            
        })
    },[])
    

    const placeorder=(e)=>{
          e.preventDefault();
          let token = localStorage.getItem('_token')
          let decode = jwt_decode(token)
          let data={customer_address:state,id:decode.uid[0]._id}
          placeOrder(data)
          .then((res)=>{
             alert(res.data.messagess)
             let data=({addr:state.finalAdd,product:state.Product})
             sendOrder(data)
             .then((res)=>{
                 console.log(res.data)
             }).catch(err => {
                
                navigate('/ServerError')
                
            })
          }).catch(err => {
                
            navigate('/ServerError')
            
        })
          navigate('/successful')

    }
    return (
        <>
            <Container fluid className={styles.body}>
                <h2 >Checkout</h2>
                <Row>
                    <Col sm={4} md={4} lg={4}></Col>
                    <Col sm={5} md={5} lg={5}>
                        <Card  className={styles.card}>
                            <Card.Body>
                                <Form>
                                    <h4> Enter Card Details</h4>
                                    <Form.Group className="mb-3" >
                                        <Form.Label ><b>Enter Card Number : </b></Form.Label>

                                        <Form.Control type="number" placeholder="Enter credit card number" name="cnumber" onChange={(e)=>{setAccount_no(e.target.value)}} className='mb-2'  />
                                        {account_no != '' && account_no.length < 12 && <span className="text-danger" style={{fontWeight:"bold"}}>Enter creidt card number correctly</span>}
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                        <Form.Label ><b>Expriry Date : </b></Form.Label>
                                        <Form.Control type="number" placeholder="Expriry Date" name="cnumber" onChange={(e)=>{setExpiry(e.target.value)}} />
                                        {expiry != '' && expiry.length < 4 && <span className="text-danger"style={{fontWeight:"bold"}}>Enter creidt card number correctly</span>}

                                    </Form.Group>
                                    <Button variant="light" className="btn btn-outline-dark my-2 my-sm-0" onClick={placeorder} >
                                        Check out
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={3} md={3} lg={3}></Col>




                </Row>


            </Container>
            <Footer />
        </>
    )
}
