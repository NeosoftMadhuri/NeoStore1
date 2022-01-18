import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Card, Accordion, Form, DropdownButton, Dropdown } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { BsStarFill, BsArrowUp, BsArrowDown } from 'react-icons/bs'
import { BiRupee, BiCategory } from 'react-icons/bi'
import Footer from '../Footer/Footer'
import { useSelector } from 'react-redux'
import styles from '../Product/Product.module.css'
import ReactPaginate from 'react-paginate';
import { fetchProduct, getCategory, getColor, getColorProd, getCategoryProd, Addcart, getCart } from '../Config/ProductService'
import jwt_decode from 'jwt-decode'
import ReactStarsRating from 'react-awesome-stars-rating'

export default function Product() {
    const search=useLocation(state=>state.search)
    const [productData, setProductData] = useState([]);
    const uuid = useSelector(state => state.uuid)
    const [categories, setCategory] = useState([]);
    const [colors, setColor] = useState([]);
    const [pagenumber, setPagenumber] = useState(0);
    const [searchbar, setSearchbar] = useState('');
    const [selected, setSetlected] = useState({ selectedCategory: '', selectedColor: '' })
    const searchItem=useSelector(state=>state.searchitem)

    const navigate = useNavigate()
    const dispatch = useDispatch()
   console.log(searchItem)
    const productsPerPage = 4;
    console.log(pagenumber)
    const pageVisited = pagenumber * productsPerPage
    const pageCount = Math.ceil(productData.length / productsPerPage)
    const cartData = localStorage.getItem("myCart") != undefined ? JSON.parse(localStorage.getItem("myCart")) : []

    useEffect(() => {
        fetchProduct().then((res) => {
            console.log(res.data)
            setProductData(res.data.product)
        })
        .catch(err => {
                
            navigate('/ServerError')
            
        })

        getCategory().then((res) => { setCategory(res.data.category) })

        getColor().then((res) => { setColor(res.data.color) })


    }, [])
    console.log(search)
    console.log(productData)
    console.log(categories);
    console.log(colors)

    const handlePageClicked = ({ selected }) => {
        console.log(selected)
        setPagenumber(selected);
    }

    const searchByName = (e) => {
        setSearchbar(e.target.value);

    }

    let searchdata = productData.filter(item => {
        if(searchItem=='')
        {
            console.log("greater")
            return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(searchbar.toString().toLowerCase()))
        }
        else 
        {
            console.log("search")
            return Object.keys(item).some(key =>
                item[key].toString().toLowerCase().includes(searchItem.toString().toLowerCase()))
        

        }
       
        
        

    });

    const sortByAsec = (e) => {
        e.preventDefault();
        console.log("ASENDING")
        const sortdata = productData;
        console.log(sortdata)

        sortdata.sort(function (a, b) {
            var val1 = a.product_cost;
            var val2 = b.product_cost;
            return val1 - val2;
        });
        setProductData([...sortdata])
    }

    const sortByDesc = (e) => {
        e.preventDefault();
        console.log("Desending")
        const sortdata = productData;
        console.log(sortdata)

        sortdata.sort(function (a, b) {
            var val1 = a.product_cost;
            var val2 = b.product_cost;
            return val2 - val1;
        });
        setProductData([...sortdata])
    }

    const sortByColor = (col) => {
        let SelectedColor = { color_id: col._id, color_name: col.color_name, category_id: selected.selectedCategory }
        console.log(SelectedColor)
        getColorProd(SelectedColor)
            .then((res) => {
                console.log(res.data)
                setProductData([...res.data.data])
            })
            .catch(err => {
                
                navigate('/ServerError')
                
            })
    }

    const sortByCategory = (cat) => {
        console.log(cat)
        let SelectedCategory = { category_id: cat._id, category_name: cat.category_name, color_id: selected.selectedColor }
        console.log(SelectedCategory)
        getCategoryProd(SelectedCategory)
            .then((res) => {
                console.log(res.data)
                setProductData([...res.data.data])
            })
            .catch(err => {
                
                navigate('/ServerError')
                
            })
    }

    const getallproduct = () => {
        fetchProduct()
            .then((res) => {
                setProductData(res.data.product)
            })
            .catch(err => {
                
                navigate('/ServerError')
                
            })
    }

    const selectedProduct = (id) => {

        navigate('/productdetails', { state: id })
    }

    const addCart = (pro) => {
        console.log("add to cart")
        if (localStorage.getItem('_token')) {
            let token = localStorage.getItem('_token')
            let decode = jwt_decode(token)
            console.log(decode)
            let data = { user: decode.uid, data: pro }
            Addcart(data)
                .then((res) => {
                    console.log(res.data)
                    alert(res.data.msg)
                    let data = { id: decode.uid[0]._id }
                    getCart(data)
                        .then((res) => {
                            console.log(res.data)
                            let count = res.data.count;
                            dispatch({ type: 'cart', payload: count })
                        })
                })
        }
        else {
            console.log("Without login")
            console.log(uuid)
            let data = { user: uuid, data: pro }
            Addcart(data)
                .then((res) => {
                    console.log(res.data)
                    alert(res.data.msg)
                    let data = { id: uuid }
                    getCart(data)
                        .then((res) => {
                            console.log(res.data)
                            let count = res.data.count;
                            dispatch({ type: 'cart', payload: count })
                        })
                })


        }



    }

    //Sort By Rating
    const ratingChanged = (e) => {
        e.preventDefault();
        const sortdata = productData;
        console.log(sortdata)
        sortdata.sort(function (a, b) {
            var val1 = a.product_rating;
            var val2 = b.product_rating;
            return val2 - val1;
        });
        setProductData([...sortdata])
     
    } 



    return (
        <>

            <Container fluid>
                <hr className='mt-5' />
                <Row>
                    <Col sx={12} sm={3} md={3} lg={3}>
                        <section className={styles.section}>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>All Product</Accordion.Header>
                                    <Accordion.Body>
                                        <a  onClick={getallproduct} style={{cursor:"pointer"}}><h6>All Product</h6></a>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                            {/* <Button variant='danger' className={styles.btn1} >All Product</Button> */}
                        </section>
                        <section className={styles.section}>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Category</Accordion.Header>
                                    {categories && categories.map((cat) =>
                                        <Accordion.Body>
                                            <a  onClick={() => { sortByCategory(cat) }} style={{cursor:"pointer"}} ><h6>{cat.category_name}</h6></a>
                                        </Accordion.Body>
                                    )}
                                </Accordion.Item>
                            </Accordion>
                        </section>
                        <section className={styles.section}>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Color</Accordion.Header>
                                    {colors && colors.map((col) =>
                                        <Accordion.Body>
                                            <a  onClick={() => { sortByColor(col) }}style={{cursor:"pointer"}} ><h6>{col.color_name}</h6></a>
                                        </Accordion.Body>
                                    )}

                                </Accordion.Item>

                            </Accordion>
                        </section>
                    </Col>

                    <Col sx={12} sm={9} md={9} lg={9}>
                        <Row className='m-3'>
                            <Col xs={12} sm={6} md={6} lg={6}>
                                <div>
                                    <Form >
                                        <Form.Control type='text' placeholder="Search By Product Name" name="filter" id="filter" onChange={searchByName} />
                                    </Form>
                                </div>
                            </Col>
                            <Col xs={12} sm={6} md={6} lg={6} className='mt-2'>
                                <Row>  <div className={styles.sort} >
                                    <h5 >Sort By:-</h5>
                                   

                                    <ul className={styles.sortsection}>
                                        <li className={styles.sortsection}> <a href='#' onClick={sortByAsec}><h5><BiRupee /><BsArrowUp /></h5></a></li>
                                        <li className={styles.sortsection}><a href='#' onClick={sortByDesc}><h5><BiRupee /><BsArrowDown /></h5></a></li>
                                        <li className={styles.sortsection}><a href='#' onClick={ratingChanged}><h5><BsStarFill style={{color:"orange"}} /></h5></a></li>
                                    </ul>
                                </div>

                                </Row>

                            </Col>

                        </Row>
                        <Row  >

                            {searchdata.slice(pageVisited, pageVisited + productsPerPage).map((pro) =>
                                <Col md={4} sm={4} lg={4} sx={4} className={styles.cardcol} key={pro._id}>
                                    <Card className={styles.card}>
                                        <Card.Img variant="top" src={`Images/Product/${pro.product_image}`} style={{ height: "180px" }} onClick={() => selectedProduct(pro._id)} />
                                        <Card.Body className="bg-light box-sizing">

                                            <Card.Text className={styles.cardbody}>
                                                <h6>{pro.product_name}</h6>
                                                <h6>${pro.product_cost}</h6>
                                                <ReactStarsRating value={pro.product_rating} isEdit={false} ishalf={true} className='mb-2' />
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => { addCart(pro) }}>Add To Cart</Button>
                                        </Card.Body>
                                        <div> </div>

                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </Col>

                </Row>
                <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    pageCount={pageCount}
                    onPageChange={handlePageClicked}
                    containerClassName={'pagination justify-content-center'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
                />

            </Container>


            <Footer />

        </>
    )
}
