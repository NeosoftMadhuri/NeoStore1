import React, { useEffect, useState, useRef } from 'react'
import { Container, Row, Col, Image, Button, Form, InputGroup, Modal, FloatingLabel } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { FaUserAlt, FaRegAddressCard, FaList } from 'react-icons/fa'
import { MdOutlineCompareArrows, MdModeEdit } from 'react-icons/md'
import Footer from '../Footer/Footer'
import { fetchProfile, changePass, updateProfile, addAddress, uploadPic, deleteAddr } from '../Config/Myservice'
import styles from '../Profile/Profile.module.css'
import Address_page from '../Register/Address_page'
import ChangePass from './ChnagePass'
import jwt_decode from 'jwt-decode'


export default function Profile() {
    const [errors, setError] = useState({
        err_oldpass: '', err_npass: '', err_cpass: '', err_fname: '', err_lname: '', err_mobile: '',
        err_address: '', err_pincode: '', err_city: '', err_state: '', err_country: ''
    })
    const navigate=useNavigate();
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState(true);
    const [Address_slot, setAddress_slot] = useState(false);
    const [changepass, setChangepass] = useState(false);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('')
    const [mobile, setMobile] = useState('')
    const [show, setShow] = useState(false);
    const [showadd, setShowadd] = useState(false);
    const [upload_image, setUpload_image] = useState(false)
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('')
    const [newadd, setNewadd] = useState(false)
    const [status,setStatus]=useState(false)
    const image = useRef();
    const [id,setId]=useState();
   

    useEffect(() => {
        let token = localStorage.getItem('_token')
        let decode = jwt_decode(token)
        let data = {id:decode.uid[0]._id}
        setId(decode.uid[0]._id)
        fetchProfile(data)
            .then((res) => {
                setUser(res.data)
            })

    }, [show,upload_image])


    const handler = (event) => {
        const name = event.target.name;
        switch (name) {
            case 'Address':
                const e_address = address.current.value.length < 0 ? "Address should be greater than 0" : '';
                setError({ err_address: e_address })
                setAddress(event.target.value)
                break;
            case 'pincode':
                const e_pincode = pincode.current.value.length > 6 ? 'Pincode should be 6 digit long' : '';
                setError({ err_pincode: e_pincode })
                setPincode(event.target.value)
                break;
            case 'city':
                const e_city = city.current.value.length < 3 ? 'City name should be greater than 3 char long' : '';
                setError({ err_city: e_city })
                setCity(event.target.value)
                break;
            case 'state':
                const e_state = state.current.value.length < 3 ? 'State name should be greater than 3 char long' : '';
                setError({ err_state: e_state })
                setState(event.target.value)
                break;
            case 'country':
                const e_country = country.current.value.length < 3 ? 'State name should be greater than 3 char long' : '';
                setError({ err_country: e_country })
                setCountry(event.target.value)
                break;
            default:

                break;
        }

    }
    const Addnewaddress = (e) => {
        e.preventDefault();
        let email = sessionStorage.getItem('user')
        let data = { id: id, address: address.current.value, pincode: pincode.current.value, city: city.current.value, state: state.current.value, country: country.current.value }
        addAddress(data)
            .then((res) => {
                console.log(res.data)
            })

    }

    const edit = (event, pro) => {
        event.preventDefault();
        setFname(pro.fname)
        setLname(pro.lname)
        setMobile(pro.mobile)
        setShow(true);
        console.log(show)
    }

    const changestatus = () => {
        setNewadd(true)
    }


    const editProfile = () => {
        let email = sessionStorage.getItem('user')
        let data = { id: id, fname: fname, lname: lname, mobile: mobile }
        updateProfile(data)
            .then((res) => {
                if (res.data.err == 1) {
                    alert(res.data.message)
                }
                else {
                    alert(res.data.message)
                }
            })
            .catch(err => {
                
                navigate('/ServerError')
                
            })

        setShow(false)

    }

    const handleClose = (event) => {

        setShow(false)
        setShowadd(false)
        setUpload_image(false)
    }

    const profileStatus = () => {
        setProfile(true)
        setChangepass(false)
        setAddress_slot(false)
    }


    const editadd = (event, addr) => {
        event.preventDefault();
        setAddress(addr.address)
        setPincode(addr.pincode)
        setCity(addr.city)
        setState(addr.state)
        setCountry(addr.country)
        setShowadd(true);
        console.log(showadd)
    }

    const Addaddress = (e) => {
        e.preventDefault();
        let update = true;
        let email = sessionStorage.getItem('user')
        let data = { email: email, address: address, pincode: pincode, city: city, state: state, country: country, update: update }
               addAddress(data)
            .then((res) => {
                console.log(res.data)
            })
            .catch(err => {
                
                navigate('/ServerError')
                
            })

        setShowadd(false)
    }

    const deleteAdd = (e, addr) => {
        e.preventDefault();
        let email = sessionStorage.getItem('user')

        deleteAddr(email, addr)
            .then((res) => {
                console.log(res.data)
            })
            .catch(err => {
                
                navigate('/ServerError')
                
            })

    }

    const upload = () => {
        setUpload_image(true)
    }

    const addPic = () => {
        let data = new FormData();
        data.append('file', document.getElementById('logo').files[0])
        data.append('id', id)
        uploadPic(data)
            .then((res) => {
               
                    alert(res.data.message)
                    setStatus(true)
             
            })
            .catch(err => {
                
                navigate('/ServerError')
                
            })
        setUpload_image(false)
        setStatus(false)

    }
    return (
        <>
            
            <Container className={styles.body} fluid>
                <Container >

                    {/* Profile Section */}
                    <Row>
                        <h4 className={styles.heading}>My Account</h4>
                        <hr />
                    </Row>

                    {user.profile && user.profile.map((pro) =>
                        <Row  >

                            {/* left Column */}
                            <Col xs={12} sm={4} md={4} lg={4} className={styles.leftcol}>
                                <div >
                                   { console.log(user.profile)}
                                    <Image src={`Images/${pro.profile}`} roundedCircle width="100px" height="100px" className={styles.imagestyle} />
                                    <h5>{pro.fname} {pro.lname}</h5>
                                    <Button onClick={upload}>Upload </Button>

                                    <Modal show={upload_image} onHide={handleClose} >
                                        <Modal.Header closeButton>
                                            <Modal.Title >Upload Profile Pic</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form>
                                                <input type="file" ref={image} id="logo" />
                                                <Button onClick={addPic}>Add Picture</Button>
                                            </Form>
                                        </Modal.Body>
                                    </Modal>

                                    <ul className={styles.liststyle}>
                                        <li> <FaList /><Link to="/order">Order</Link> </li>
                                        <li><FaUserAlt /> <Link to="/profile" onClick={profileStatus} >Profile</Link></li>
                                        <li><FaRegAddressCard /> <Link to="/address"  >Address</Link> </li>
                                        {pro.social==false?
                                        <li><MdOutlineCompareArrows /> <Link to="/chnagepass" > Change Password</Link></li>
                                        :''}
                                       
                                    </ul>
                                </div>
                            </Col>


                            {/* Right Column */}
                            <Col xs={12} sm={8} md={8} lg={8}  >
                                {profile ?
                                    <section className={styles.col2}>
                                        <Row className={styles.col2heading}>
                                            <h2>Profile</h2>
                                        </Row>

                                        <Row className='m-3'>
                                            <Row >
                                                <Col sm={3} md={3} lg={3}>
                                                    <h6>First Name</h6>
                                                </Col>
                                                <Col sm={9} md={9} lg={9}>
                                                    <p>{pro.fname}</p>
                                                </Col>
                                                <hr />
                                            </Row>

                                            <Row>
                                                <Col sm={3} md={3} lg={3}>
                                                    <h6>Last Name</h6>
                                                </Col>
                                                <Col sm={9} md={9} lg={9}>
                                                    <p>{pro.lname}</p>
                                                </Col>
                                                <hr />
                                            </Row>

                                            <Row>
                                                <Col sm={3} md={3} lg={3}>
                                                    <h6>Gender</h6>
                                                </Col>
                                                <Col sm={9} md={9} lg={9}>
                                                    <p>{pro.gender}</p>
                                                </Col>
                                                <hr />
                                            </Row>
                                            <Row>
                                                <Col sm={3} md={3} lg={3}>
                                                    <h6>Mobile No</h6>
                                                </Col>
                                                <Col sm={9} md={9} lg={9}>
                                                    <p>{pro.mobile}</p>
                                                </Col>
                                                <hr />
                                            </Row>

                                            <Row>
                                                <Col sm={3} md={3} lg={3}>
                                                    <h6>Email</h6>
                                                </Col>
                                                <Col sm={9} md={9} lg={9}>
                                                    <p>{pro.email}</p>
                                                </Col>
                                                <hr />
                                            </Row>

                                            <div>
                                                <Button onClick={(event) => { edit(event, pro) }} className='m-3'><MdModeEdit />Edit</Button>
                                               
                                            </div>
                                            {show ?
                                                <Modal show={show} onHide={handleClose} >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title >Edit Your Account Details</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form >
                                                            <h6>Edit Your Account</h6>
                                                            <Form.Group className="mb-3" >
                                                                <Form.Control type="text" placeholder="First Name" name="fname" id="fname" value={fname} onChange={(e) => { setFname(e.target.value) }} className="form-control" width="50px" />

                                                            </Form.Group>
                                                            <Form.Group className="mb-3" >
                                                                <Form.Control type="text" placeholder="Last Name" name="lname" id="lname" value={lname} onChange={(e) => { setLname(e.target.value) }} className="form-control" />
                                                            </Form.Group>
                                                            <Form.Group className="mb-3" >
                                                                <Form.Control type="text" placeholder="Mobile Number" name="mobile" id="mobile" value={mobile} onChange={(e) => { setMobile(e.target.value) }} className="form-control" />
                                                            </Form.Group>
                                                            <Button variant="danger" type="submit" onClick={editProfile}>
                                                                <MdModeEdit />Edit
                                                            </Button>
                                                        </Form>


                                                    </Modal.Body>

                                                </Modal>
                                                : ''}
                                        </Row>
                                    </section>
                                    : ''}

                                {/* Change Password Section */}
                                {changepass ?
                                    <ChangePass />
                                    : ""}


                                {Address_slot ?
                                    <div>

                                        <section className={styles.col2}>
                                            <Row className={styles.col2heading}>
                                                <h2>Address</h2>
                                                <div>
                                                    <Button onClick={changestatus}><MdModeEdit />Add Address</Button>
                                                </div>
                                            </Row>
                                            {pro.address.map((addr) =>
                                                <Row className='m-3'>
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
                                                        <Button onClick={(e) => { deleteAdd(e, addr) }}><MdModeEdit />Delete</Button>

                                                    </div>

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
                                            )}

                                            {newadd ?
                                                <Modal show={newadd} onHide={handleClose} >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title >Edit Your Account Details</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form  >

                                                            <FloatingLabel label="Address" className="mb-3">
                                                                <Form.Control as="textarea" placeholder="Address" name="address" id="address" onChange={handler} />
                                                                <Form.Text id="passwordHelpBlock" muted>
                                                                    Max 100 char
                                                                </Form.Text>
                                                                <span style={{ color: 'red' }}>{errors.err_address}</span>
                                                            </FloatingLabel>

                                                            <Row>
                                                                <Col sm={6} md={6} lg={6}>
                                                                    <Form.Group className="mb-3" >
                                                                        <Form.Control type="number" name="pincode" placeholder='Pincode' onChange={handler} className="form-control" size="20" />
                                                                        <span style={{ color: 'red' }}>{errors.err_pincode}</span>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col sm={6} md={6} lg={6}> <Form.Group className="mb-3" >
                                                                    <Form.Control type="text" name="city" placeholder='City' onChange={handler} className="form-control" size="20" />
                                                                    <span style={{ color: 'red' }}>{errors.err_city}</span>
                                                                </Form.Group></Col>
                                                            </Row>
                                                            <Form.Group className="mb-3" >
                                                                <Form.Control type="text" name="state" placeholder='State' onChange={handler} className="form-control" size="20" />
                                                                <span style={{ color: 'red' }}>{errors.err_state}</span>
                                                            </Form.Group>
                                                            <Form.Group className="mb-3" >
                                                                <Form.Control type="text" name="country" placeholder='Country' onChange={handler} className="form-control" size="20" />
                                                                <span style={{ color: 'red' }}>{errors.err_country}</span>
                                                            </Form.Group>

                                                            <div style={{ textAlign: "center" }}>
                                                                <Button variant="primary" type="submit" onClick={Addnewaddress} >
                                                                    Submit
                                                                </Button>

                                                            </div>
                                                        </Form>

                                                    </Modal.Body>

                                                </Modal>
                                                : ""}

                                        </section>
                                    </div>
                                    : ""}


                            </Col>
                        </Row>
                    )}

                </Container>
            </Container>

            <Footer />

        </>
    )
}
