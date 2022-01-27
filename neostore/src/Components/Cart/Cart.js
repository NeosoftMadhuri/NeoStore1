import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { getAllCart, incproduct, decproduct, delCart, getCart } from '../Config/ProductService'
import styles from '../Cart/Cart.module.css'
import jwt_decode from 'jwt-decode'
import { useSelector, useDispatch } from 'react-redux'
import {Enable,DISABLE,CART,SERACH} from '../Action/index'

export default function Cart() {
    let [products, setProducts] = useState([]);
    let [total, setTotal] = useState(0);
    let [gst, setGst] = useState(0);
    const dispatch = useDispatch();
    const uuid = useSelector(state => state.Login.uuid)
    const navigate = useNavigate();
    const [status, setStatus] = useState(false)


    useEffect(() => {
        if (localStorage.getItem('_token') != undefined) {
            let token = localStorage.getItem('_token')
            let decode = jwt_decode(token)
            let data = { id: decode.uid[0]._id }
            getAllCart(data)
                .then((res) => {
                    setProducts(res.data)
                    const dt = res.data.data.reduce((prev, cur) => prev + cur.total_productCost, 0);
                    setTotal(dt)
                    setGst(dt * 0.05)
                    getCart(data)
                        .then((res) => {
                            let count = res.data.count;
                            dispatch(CART(count))
                           
                        })
                        .catch(err => {

                            navigate('/ServerError')

                        })
                })
        }
        else {
            console.log(uuid)
            let data = { id: uuid }
            getAllCart(data)
                .then((res) => {
                    setProducts(res.data)
                    const dt = res.data.data.reduce((prev, cur) => prev + cur.total_productCost, 0);
                    setTotal(dt)
                    setGst(dt * 0.05)
                    getCart(data)
                        .then((res) => {
                            let count = res.data.count;
                            dispatch(CART(count))
                            
                        })
                        .catch(err => {

                            navigate('/ServerError')

                        })
                })
        }
    }, [status])


    const increment = (pro) => {
        let data = { data: pro }
        incproduct(data)
            .then((res) => {
                alert(res.data.message)
                setStatus(true)
            })
        setStatus(false)
    }

    const decrement = (pro) => {
        let data = { data: pro }
        decproduct(data)
            .then((res) => {
                alert(res.data.message)
                setStatus(true)
            })
            .catch(err => {

                navigate('/ServerError')

            })
        setStatus(false)
    }

    const deletecart = (id) => {
        let data = { id: id }
        delCart(data)
            .then((res) => {
                setStatus(true)
                alert(res.data.message)

                getCart(data)
                    .then((res) => {
                        let count = res.data.count;
                        dispatch({ type: 'cart', payload: count })
                    })
            })
        setStatus(false)
    }
    const buyProducts = () => {
        if (localStorage.getItem('_token')) {
            navigate('/add')
        }
        else {
            navigate('/login')
        }
    }
    return (
        <>
            <Container fluid>
                <Row className={styles.row1}>
                    <Col sm={8} md={8} lg={8} className={styles.col2}>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.data && products.data.map((pro) =>
                                    <tr>
                                        <td><Row>
                                            <Col sm={3} md={3} lg={3}>
                                                <img src={`/Images/Product/${pro.product_id.product_image}`} className={styles.imgstyle} />

                                            </Col>
                                            <Col sm={9} md={9} lg={9}>
                                                <p className={styles.para}>{pro.product_id.product_name}<br />
                                                    {pro.product_id.product_producer}<br />
                                                    Status:<span style={{ color: "green", fontWeight: "bold" }}>In Stock</span></p>
                                            </Col>
                                        </Row>
                                        </td>
                                        <td><Row className=' mt-4 pr-1'>

                                            <Col sm={4} md={4} lg={4}><Button className={styles.btn1} size='sm' onClick={() => { increment(pro) }}>+</Button></Col><Col sm={4} md={4} lg={4}><Button className={styles.btn2} size='sm'>{pro.quantity}</Button></Col><Col sm={4} md={4} lg={4}><Button className={styles.btn1} size='sm' onClick={() => { decrement(pro) }}>-</Button></Col>
                                        </Row></td>
                                        <td><p className='mt-4'>{pro.product_cost}</p></td>
                                        <td><p className='mt-4'>{pro.total_productCost}</p></td>
                                        <td><a style={{ fontSize: "30px" }} onClick={() => { deletecart(pro._id) }}><MdDelete className='mt-4' /></a></td>
                                    </tr>
                                )}
                            </tbody>

                        </Table>
                    </Col>
                    <Col sm={4} md={4} lg={4} >
                        <Card className='ml-3 mb-3 mt-2 p-1' >
                            <Card.Body>
                                <Card.Title>Review Order</Card.Title>
                                <Card.Text className='d-flex justify-content-between mt-4'>
                                    <p>Subtotal</p> <p>{total}</p>

                                </Card.Text>
                                <hr />
                                <Card.Text className='d-flex justify-content-between'>
                                    <p>GST (5%)</p> <p>{gst}</p>

                                </Card.Text>
                                <hr />
                                <Card.Text className='d-flex justify-content-between'>
                                    <p>Grand total</p> <p>{total + gst}</p>
                                </Card.Text>
                                <Row>
                                    <Button variant='primary' className='my-3' onClick={buyProducts}>Proceed to Buy</Button>
                                </Row>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
