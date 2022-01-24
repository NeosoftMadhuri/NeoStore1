import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import Footer from '../Footer/Footer'
import Navs from '../Navs/Navs'
import styles from '../Dashboard/Dashboard.module.css'
import { BiRupee } from 'react-icons/bi'
import Header from '../Header/Header'
import Altermsg from '../Alterbox/Altermsg'
import { fetchProduct, Addcart,getCart } from '../Config/ProductService'
import ReactStarsRating from 'react-awesome-stars-rating'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { useSelector, useDispatch } from 'react-redux'

export default function Dashboard() {
    const [show, setShow] = useState(true);
    const [productData, setProductData] = useState([]);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const uuid = useSelector(state => state.uuid)


    useEffect(() => {
        fetchProduct()
            .then((res) => {
                setProductData(res.data.product)
            })
            .catch(err => {
                
                navigate('/ServerError')
                
            })

    }, [])
    const selectedProduct = (id) => {

        navigate('/productdetails', { state: id })
    }

    const addCart = (pro) => {
        if (localStorage.getItem('_token')) {
            let token = localStorage.getItem('_token')
            let decode = jwt_decode(token)
            let data = { user: decode.uid, data: pro }
            Addcart(data)
                .then((res) => {
                    alert(res.data.msg)
                    let data = { id: decode.uid[0]._id }
                    getCart(data)
                        .then((res) => {
                            let count = res.data.count;
                            dispatch({ type: 'cart', payload: count })
                        })
                        .catch(err => {
                
                            navigate('/ServerError')
                            
                        })
                })
                .catch(err => {
                
                    navigate('/ServerError')
                    
                })
        }
        else {
            let data = { user: uuid, data: pro }
            Addcart(data)
                .then((res) => {
                    alert(res.data.msg)
                    let data = { id: uuid }
                    getCart(data)
                        .then((res) => {
                            let count = res.data.count;
                            dispatch({ type: 'cart', payload: count })
                        })
                })
        }
    }


    const getallproduct=()=>{
        fetchProduct()
        .then((res)=>{
            setProductData(res.data.product)
        })
        .catch(err => {       
            navigate('/ServerError');   
        })
    }

    return (
        <>

             <Altermsg/>
            {/* Carousel Section start */}
            <Header />
            {/* Carousel Section end */}

            <Container fluid>
                <Row className={styles.bodyheader}>
                    <h4>Popular Products</h4>
                </Row>

                <Container className='justify-content-center' >
                    <Row>

                        {productData.filter((pro)=>{
                            if(pro.product_rating===5)
                            {
                                return pro
                            }
                        })
                        .map((pro) =>
                        
                            <Col md={4} sm={4} lg={4} sx={4} className={styles.cardcol}>
                                <Card className={styles.card}>
                                    <Card.Img variant="top" src={`Images/Product/${pro.product_image}`} style={{ height: "180px" }} onClick={() => selectedProduct(pro._id)} />
                                    <Card.Body className="bg-light">
                                    <h6>{pro.product_name.length > 30 ?`${pro.product_name.substring(0,30)}...`: pro.product_name }</h6>
                                        <Card.Text>
                                            <h6><BiRupee />{pro.product_cost}</h6>
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => { addCart(pro) }}>Add To Cart</Button>
                                    </Card.Body>
                                    <ReactStarsRating value={pro.product_rating} isEdit={false} ishalf={true} className='mb-2' />
                                </Card>

                            </Col>

                        )}


                    </Row>
                </Container>
            </Container>
            <Footer />

        </>
    )
}
