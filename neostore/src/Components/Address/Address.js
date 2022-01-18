import React, { useEffect, useState, useRef } from 'react'
import { Container, Row, Col, Image, Button, Form, InputGroup, Modal, FloatingLabel } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { FaUserAlt, FaRegAddressCard, FaList } from 'react-icons/fa'
import { MdOutlineCompareArrows, MdModeEdit } from 'react-icons/md'
import { FaLock } from 'react-icons/fa'
import Footer from '../Footer/Footer'
import Navs from '../Navs/Navs'
import { fetchProfile, changePass, updateProfile, addAddress, uploadPic, deleteAddr, editAddress } from '../Config/Myservice'
import styles from '../Profile/Profile.module.css'
import jwt_decode from 'jwt-decode'


export default function Address() {
    const [errors, setError] = useState({
        err_oldpass: '', err_npass: '', err_cpass: '', err_fname: '', err_lname: '', err_mobile: '',
        err_address: '', err_pincode: '', err_city: '', err_state: '', err_country: ''
    })
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [showadd, setShowadd] = useState(false);
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('')
    const [show, setShow] = useState(false);
    const [Address_id, setAddress_id] = useState('');
    const [status, setStatus] = useState(false)
    const [id, setId] = useState('')

    useEffect(() => {
        let token = localStorage.getItem('_token')
        let decode = jwt_decode(token)
        console.log(decode)
        let data = { id: decode.uid[0]._id }
        setId(decode.uid[0]._id)
        fetchProfile(data)
            .then((res) => {
                console.log(res.data)
                setUser(res.data)
            })
            .catch(err => {
                navigate('/ServerError')
            })

    }, [show, status])

    //Edit Address
    const Addnewaddress = (e) => {
        e.preventDefault();
        console.log("Add Address")
        let email = sessionStorage.getItem('user')
        let data = { id: id, address: address, pincode: pincode, city: city, state: state, country: country }
        console.log(data)
        addAddress(data)
            .then((res) => {
                console.log(res.data)
            })
            .catch(err => {

                navigate('/ServerError')

            })
        setShow(false)
        // window.location.reload();

    }

    const editadd = (event, addr) => {
        event.preventDefault();
        console.log(addr)
        console.log("edit  address clicked")
        setAddress(addr.address)
        setPincode(addr.pincode)
        setCity(addr.city)
        setState(addr.state)
        setCountry(addr.country)
        setAddress_id(addr.Address_id)
        setShowadd(true);
        console.log(showadd)
    }

    //Add Address
    const Addaddress = (e) => {
        e.preventDefault();
        let update = true;
        console.log("Add Address")

        let data = { Address_id: Address_id, id: id, address: address, pincode: pincode, city: city, state: state, country: country, update: update }
        console.log(data)
        editAddress(data)
            .then((res) => {
                console.log(res.data)
            })
            .catch(err => {

                navigate('/ServerError')

            })

        setShowadd(false)
        window.location.reload();


    }
    //Delete Address
    const deleteAdd = (e, addr) => {
        e.preventDefault();
        console.log(addr)

        let data = { id: id, addr: addr }
        deleteAddr(data)
            .then((res) => {
                console.log(res.data)
                setStatus(true)
            })
            .catch(err => {

                navigate('/ServerError')

            })
        setStatus(false)

    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <Container className={styles.body} fluid>
                <Container >


                    <Row>
                        <h4 className={styles.heading}>My Account</h4>
                        <hr />
                    </Row>

                    {user.profile && user.profile.map((pro) =>
                        <Row >

                            {/* left Column */}
                            <Col xs={12} sm={4} md={4} lg={4} className={styles.leftcol}>
                                <div >
                                    <Image src={`Images/${pro.profile}`} roundedCircle width="100px" height="100px" className={styles.imagestyle} />
                                    <h5>{pro.fname} {pro.lname}</h5>
                                    <ul className={styles.liststyle}>
                                        <li> <FaList /><Link to="/order">Order</Link></li>
                                        <li><FaUserAlt /> <Link to="/profile" >Profile</Link></li>
                                        <li><FaRegAddressCard /> <Link to="/address"  >Address</Link> </li>
                                        <li><MdOutlineCompareArrows /> <Link to="/chnagepass" > Change Password</Link></li>
                                    </ul>
                                </div>
                            </Col>


                            {/* Right Column */}
                            <Col xs={12} sm={8} md={8} lg={8} >
                                <section className={styles.col2}>
                                    <Row className={styles.col2heading}>

                                        <h2>Address</h2>
                                        <div style={{ textAlign: "right" }}>
                                            <a onClick={handleShow} style={{ textDecoration: "underline" }}>  Add Address</a>
                                        </div>
                                    </Row>
                                </section>

                                {pro.Address && pro.Address.map((addr) =>

                                    <section className={styles.col2}>

                                        <Row className='m-1'>
                                            <Row >
                                                <Col sm={3} md={3} lg={3}>
                                                    <h6>Address slot 1</h6>
                                                </Col>
                                                <Col sm={9} md={9} lg={9}>
                                                    <p>{addr.address}</p>
                                                </Col>
                                                <hr />
                                            </Row>

                                            <Row>
                                                <Col sm={3} md={3} lg={3}>
                                                    <h6>Pincode</h6>
                                                </Col>
                                                <Col sm={9} md={9} lg={9}>
                                                    <p>{addr.pincode}</p>
                                                </Col>
                                                <hr />
                                            </Row>

                                            <Row>
                                                <Col sm={3} md={3} lg={3}>
                                                    <h6>City</h6>
                                                </Col>
                                                <Col sm={9} md={9} lg={9}>
                                                    <p>{addr.city}</p>
                                                </Col>
                                                <hr />
                                            </Row>
                                            <Row>
                                                <Col sm={3} md={3} lg={3}>
                                                    <h6>State</h6>
                                                </Col>
                                                <Col sm={9} md={9} lg={9}>
                                                    <p>{addr.state}</p>
                                                </Col>
                                                <hr />
                                            </Row>

                                            <Row>
                                                <Col sm={3} md={3} lg={3}>
                                                    <h6>Country</h6>
                                                </Col>
                                                <Col sm={9} md={9} lg={9}>
                                                    <p>{addr.country}</p>
                                                </Col>
                                                <hr />
                                            </Row>

                                            <div>
                                                <Button onClick={(e) => { editadd(e, addr) }}><MdModeEdit />Edit</Button>
                                                <Button onClick={(e) => { deleteAdd(e, addr) }} className='btn btn-danger' style={{ marginLeft: "10px" }}><MdModeEdit />Delete</Button>

                                            </div>

                                            {/* Edit Address */}
                                            {showadd ?
                                                <Modal show={showadd} onHide={handleClose} >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title >Edit Your Account Details</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form >
                                                            <h6>Edit Your Account</h6>
                                                            <FloatingLabel label="Address" className="mb-3">
                                                                <Form.Control as="textarea" placeholder="Address" name="address" id="address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                                                                <Form.Text id="passwordHelpBlock" muted>
                                                                    Max 100 char
                                                                </Form.Text>
                                                                <span style={{ color: 'red' }}>{errors.err_address}</span>
                                                            </FloatingLabel>

                                                            <Row>
                                                                <Col sm={6} md={6} lg={6}>
                                                                    <Form.Group className="mb-3" >
                                                                        <Form.Control type="number" name="pincode" placeholder='Pincode' value={pincode} onChange={(e) => { setPincode(e.target.value) }} className="form-control" size="20" />
                                                                        <span style={{ color: 'red' }}>{errors.err_pincode}</span>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col sm={6} md={6} lg={6}> <Form.Group className="mb-3" >
                                                                    <Form.Control type="text" name="city" placeholder='City' value={city} onChange={(e) => { setCity(e.target.value) }} className="form-control" size="20" />
                                                                    <span style={{ color: 'red' }}>{errors.err_city}</span>
                                                                </Form.Group></Col>
                                                            </Row>
                                                            <Form.Group className="mb-3" >
                                                                <Form.Control type="text" name="state" placeholder='State' value={state} onChange={(e) => { setState(e.target.value) }} className="form-control" size="20" />
                                                                <span style={{ color: 'red' }}>{errors.err_state}</span>
                                                            </Form.Group>
                                                            <Form.Group className="mb-3" >
                                                                <Form.Control type="text" name="country" placeholder='Country' value={country} onChange={(e) => { setCountry(e.target.value) }} className="form-control" size="20" />
                                                                <span style={{ color: 'red' }}>{errors.err_country}</span>
                                                            </Form.Group>

                                                            <div style={{ textAlign: "center" }}>
                                                                <Button variant="primary" type="submit" onClick={Addaddress} >
                                                                    Submit
                                                                </Button>
                                                            </div>
                                                        </Form>

                                                    </Modal.Body>

                                                </Modal>
                                                : ''}
                                        </Row>
                                    </section>
                                )}

                                {/* Add Address  */}
                                <Modal show={show} onHide={handleClose} >
                                    <Modal.Header closeButton>
                                        <Modal.Title >Add Address Details</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form  >

                                            <FloatingLabel label="Address" className="mb-3">
                                                <Form.Control as="textarea" placeholder="Address" name="address" id="address" onChange={(e) => { setAddress(e.target.value) }} />
                                                <Form.Text id="passwordHelpBlock" muted>
                                                    Max 100 char
                                                </Form.Text>
                                            </FloatingLabel>

                                            <Row>
                                                <Col sm={6} md={6} lg={6}>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Control type="number" name="pincode" placeholder='Pincode' onChange={(e) => { setPincode(e.target.value) }} className="form-control" size="20" />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm={6} md={6} lg={6}> <Form.Group className="mb-3" >
                                                    <Form.Control type="text" name="city" placeholder='City' onChange={(e) => { setCity(e.target.value) }} className="form-control" size="20" />
                                                </Form.Group></Col>
                                            </Row>

                                            <Form.Group className="mb-3" >
                                                <Form.Control type="text" name="state" placeholder='State' onChange={(e) => { setState(e.target.value) }} className="form-control" size="20" />
                                            </Form.Group>
                                            
                                            <Form.Group className="mb-3" >
                                                <Form.Control type="text" name="country" placeholder='Country' onChange={(e) => { setCountry(e.target.value) }} className="form-control" size="20" />
                                            </Form.Group>

                                            <div style={{ textAlign: "center" }}>
                                                <Button variant="primary" type="submit" onClick={Addnewaddress} >
                                                    Submit
                                                </Button>

                                            </div>
                                        </Form>

                                    </Modal.Body>

                                </Modal>

                            </Col>


                        </Row>
                    )}

                </Container>
            </Container>


            <Footer />

        </>
    )
}
