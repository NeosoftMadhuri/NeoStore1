import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Tabs, Tab, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom'
import { getSingleProduct, Addcart, getCart, updateRating } from '../Config/ProductService';
import ReactImageMagnify from 'react-image-magnify'
import ReactStarsRating from 'react-awesome-stars-rating'
import styles from '../Productetails/ProductDetails.module.css'
import { IoMdShare } from 'react-icons/io'
import jwt_decode from 'jwt-decode'
import { useSelector, useDispatch } from 'react-redux'
import {CART,SERACH} from '../Action/index'
import { WhatsappIcon, WhatsappShareButton, FacebookIcon, FacebookShareButton, PinterestShareButton, PinterestIcon, TelegramShareButton, TelegramIcon, TwitterIcon, TwitterShareButton } from 'react-share'

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}


export default function ProductDetails() {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const uuid = useSelector(state => state.Login.uuid)
    const [mainimage, setMainimage] = useState();
    const [rating, setRating] = useState();
    const [ShowRating, setShowRating] = useState(false)
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [ImageDimension, setImageDimension] = useState({ imageHeight: 0, imageWidth: 0 })
    const [images, setImages] = useState();
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    // const cartData = localStorage.getItem("myCart") != undefined ? JSON.parse(localStorage.getItem("myCart")) : []
    console.log(state)

    useEffect(() => {
        getSingleProduct(state)
            .then((res) => {
                console.log(res.data)
                setMainimage(res.data.product[0].product_image)
                setImages(res.data.product[0].sub_Image)
                setRating(res.data.product[0].product_rating)
                setData(res.data.product)
                checkScreen()
                setWindowDimensions(getWindowDimensions());
            })
            .catch(err => {

                navigate('/ServerError')

            })
    }, [])
    console.log(mainimage)
    console.log(images)

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
                            dispatch(CART(count))
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
                            dispatch(CART(count))
                           
                        })
                })
                .catch(err => {
                    navigate('/ServerError')
                })
        }



    }

    const checkScreen = () => {
        if (windowDimensions.width == 360) {
            console.log('inside 360');
            setImageDimension({
                imageHeight: 310, imageWidth: 310
            })
        }
        else if (windowDimensions.width == 411) {
            setImageDimension({
                imageHeight: 380, imageWidth: 380
            })
        }
        else if (windowDimensions.width == 320) {
            setImageDimension({
                imageHeight: 295, imageWidth: 295
            })
        }
        else if (windowDimensions.width == 375) {
            setImageDimension({
                imageHeight: 350, imageWidth: 350
            })
        }
        else if (windowDimensions.width == 414) {
            setImageDimension({
                imageHeight: 390, imageWidth: 390
            })
        }
        else if (windowDimensions.width == 280) {
            setImageDimension({
                imageHeight: 250, imageWidth: 230
            })
        }
        else if (windowDimensions.width == 1280) {
            setImageDimension({
                imageHeight: 450, imageWidth: 450
            })
        }
        else if (windowDimensions.width == 1024) {
            setImageDimension({
                imageHeight: 450, imageWidth: 450
            })
        }
        else if (windowDimensions.width == 1440) {
            setImageDimension({
                imageHeight: 450, imageWidth: 600
            })
        }
        else {
            setImageDimension({
                imageHeight: 450, imageWidth: 550
            })
        }
    }

    const Rating = (value) => {
        let finalRating = ((parseFloat(value) + parseFloat(rating)) / 2);  
        let data = { id: state, product_rating: finalRating }
      
        updateRating(data)
            .then(res => {
                if (res.data.err == 1) {
                   console.log(res.data.message)
                }
                else {
                    setShowRating(false)
                    alert(res.data.message);
                    setRating(finalRating)
                }
            })
            .catch(err => {
                navigate('/ServerError')
            })
    }

    const productRating = () => {
        if (localStorage.getItem('_token')) {
            setShowRating(true)
        }
        else {
            navigate('/login')
        }
    }


    return (
        <>
            <Container fluid>
                {data.map((pro) =>

                    <Row className='mt-5'>
                        <Col xs={12} sm={6} md={6} lg={6}>
                          
                            <ReactImageMagnify className={styles.rim} {...{
                                smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    isFluidWidth: false,
                                    src: `Images/Product/${mainimage}`,
                                   
                                    width: parseInt(ImageDimension.imageWidth),
                                    height: parseInt(ImageDimension.imageHeight),
                                },
                                largeImage: {
                                    src: `Images/Product/${mainimage}`,
                                    width: 1200,
                                    height: 1800
                                }
                            }} />
                            <div>
                                <img src={`Images/Product/${pro.product_image}`} onClick={() => setMainimage(pro.product_image)} height="100px" width="100px" />
                                {pro.sub_Image.map((item) =>

                                    <img src={`Images/Product/${item}`} height="100px" width="100px" onClick={() => setMainimage(item)} />

                                )}
                            </div>
                          
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6}>
                            <Row className=' p-4'>
                                <section>
                                    <h4>{pro.product_name}</h4>
                                    <ReactStarsRating value={rating} isEdit={false} ishalf={true} className='mb-2' />
                                    <hr />
                                    <div className={styles.div1}>
                                        <h5 className='m-2'> Price:  {pro.product_cost}</h5>
                                        <h5 className='m-2'>Color:   {pro.color_id.color_name}</h5>
                                    </div>
                                    <div className={styles.div2}>
                                        <h4 className='mt-2'>Share <IoMdShare /></h4>
                                        <Row className='d-flex-row justify-content-center'>
                                            <Col className='mt-3'>

                                                <WhatsappShareButton url="https://www.amazon.in/" title={"Checkout " + pro.product_name} hashtag="#react">
                                                    <WhatsappIcon logofillColor="white" round={true} className={styles.icons} ></WhatsappIcon>
                                                </WhatsappShareButton>

                                                <FacebookShareButton url="https://www.amazon.in/" title={"Checkout " + pro.product_name} hashtag="#react">
                                                    <FacebookIcon logofillColor="white" round={true} className={styles.icons}  ></FacebookIcon>
                                                </FacebookShareButton>

                                                <TwitterShareButton url="https://www.amazon.in/" title={"Checkout " + pro.product_name} hashtag="#react">
                                                    <TwitterIcon logofillColor="white" round={true} className={styles.icons} ></TwitterIcon>
                                                </TwitterShareButton>

                                                <PinterestShareButton url="https://www.amazon.in/" title={"Checkout " + pro.product_name} hashtag="#react">
                                                    <PinterestIcon logofillColor="white" round={true} className={styles.icons}  ></PinterestIcon>
                                                </PinterestShareButton>

                                                <TelegramShareButton url="https://www.amazon.in/" title={"Checkout " + pro.product_name} hashtag="#react">
                                                    <TelegramIcon logofillColor="white" round={true} className={styles.icons}  ></TelegramIcon>
                                                </TelegramShareButton>
                                            </Col>
                                        </Row>

                                    </div>
                                    <Row>
                                        <div>
                                            <Button className='m-3' onClick={() => { addCart(pro) }}>ADD TO CART</Button>
                                            <Button variant='danger' className='m-3' onClick={productRating}>RATE PRODUCT</Button>
                                        </div>
                                    </Row>
                                    <Row>
                                        <Tabs
                                            defaultActiveKey="description"
                                            transition={false}
                                            id="noanim-tab-example"
                                            className="mb-3"
                                        >
                                            <Tab eventKey="description" title="Description">
                                                <p>{pro.product_desc}</p>
                                            </Tab>
                                            <Tab eventKey="features" title="Features" className="pl-5">

                                                <p>Dimension:{pro.product_dimension} ,Material:{pro.product_material},Producer:{pro.product_producer}Use water-free fabric cleaners on a clean cloth and test on a small portion of the sofa, before cleaning stains with the cloth</p>
                                            </Tab>

                                        </Tabs>
                                    </Row>

                                </section>


                            </Row>
                            <Modal show={ShowRating} onHide={() => setShowRating(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Please Rate :{pro.product_name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ReactStarsRating onChange={Rating} value={pro.product_rating} />
                                </Modal.Body>
                                <Modal.Footer>
                                </Modal.Footer>
                            </Modal>

                        </Col>
                    </Row>



                )}




            </Container>


        </>
    )
}
