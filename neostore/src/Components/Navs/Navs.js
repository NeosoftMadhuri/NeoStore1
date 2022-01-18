import React, { useState, useEffect } from 'react'
import { Navbar, Container, Nav, Button, Form, FormControl, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, NavLink } from 'react-router-dom'
import { getSingleProduct, Addcart, getCart } from '../Config/ProductService';
import { BsCart3, BsPersonSquare, BsSearch } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../Navs/Navs.module.css'
import { v4 as uuidv4 } from 'uuid';
import jwt_decode from 'jwt-decode'
export default function Navs() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [cartCount, setCartcount] = useState(0)
    const Logged = useSelector(state => state.Login)
    const cart = useSelector(state => state.cart)
    const uuid = useSelector(state => state.uuid)
    console.log(cart)
    console.log(uuid)
    useEffect(() => {
        if (localStorage.getItem('_token')) {
            console.log(localStorage.getItem('_token'));
            dispatch({ type: 'enable' })
            console.log(Logged);


            let token = localStorage.getItem('_token')
            let decode = jwt_decode(token)
            console.log(decode)
            // let data = {id:decode.uid[0]._id}
            let data = { id: decode.uid[0]._id }
            getCart(data)
                .then((res) => {
                    console.log(res.data)
                    let count = res.data.count;
                    dispatch({ type: 'cart', payload: count })
                })
        }
        else if (localStorage.getItem('uuid')) {
            let uuid = localStorage.getItem('uuid')
            dispatch({ type: 'disable', payload: uuid })
            let data = { id: uuid }
            console.log(data)
            getCart(data)
                .then(res => {
                    console.log(res.data)
                    let count = res.data.count;
                    setCartcount(res.data.count)
                    dispatch({ type: 'cart', payload: res.data.count })
                })
        }
        else {
            let uuid = uuidv4();
            localStorage.setItem('uuid', uuid)
            dispatch({ type: 'disable', payload: uuid })
        }
    }, [])


    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        dispatch({ type: 'disable' })
        navigate('/dashboard')
    }
    const searchbar = (event) => {
        // history('/Product')
        const value = event.target.value
        dispatch({ type: 'search', payload: value })
      
    }
    const search=()=>{
        navigate('/product')
    }

    return (
        <>
            {/* Navbar Start */}
            <Navbar bg="dark" expand="lg" variant='dark'>
                <Container fluid>
                    <Navbar.Brand href="#">Neo<span className={styles.brand}>STORE</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll"  >

                        <Nav className="me-auto " >
                            <Link to="/" className={styles.link1} >Home</Link>
                            <Link to="/product" className={styles.link1}>Product</Link>

                            {
                                Logged ? <Link to="/order" className={styles.link1}>Order</Link>
                                    : <Link to="/login"className={styles.link1}>Order</Link>
                            }
                        </Nav>

                        <Form className="d-flex">
                            <FormControl onChange={searchbar} onFocus={search}  type="search" placeholder='Search...' className={styles.search1} aria-label="Search" />
                        </Form>

                        {Logged ?
                            <DropdownButton id="dropdown-basic-button" title={<BsPersonSquare />} variant="light" className={styles.dropdown} >
                                <Dropdown.Item onClick={logout} style={{fontWeight:"bold"}}>Logout</Dropdown.Item>
                                <Dropdown.Item><Link to="/profile" className={styles.link2}>Profile</Link></Dropdown.Item>
                            </DropdownButton> :
                            <DropdownButton id="dropdown-basic-button" title={<BsPersonSquare />} variant="light" className={styles.dropdown} style={{ marginRight: "10px" }} >
                                <Dropdown.Item ><Link to="/login" className={styles.link2}>Login</Link></Dropdown.Item>
                                <Dropdown.Item ><Link to="/register"className={styles.link2}>Register</Link></Dropdown.Item>
                            </DropdownButton>
                        }

                        <Button variant="light" className={styles.btn1} onClick={() => { navigate("/cart") }}><BsCart3 /><span>{cart}</span></Button>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* Navbar End */}
        </>
    )
}
