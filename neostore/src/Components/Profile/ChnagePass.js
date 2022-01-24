import React, { useEffect, useState, useRef } from 'react'
import { Container, Row, Col, Image, Button, Form, InputGroup, Modal, FloatingLabel } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { FaUserAlt, FaRegAddressCard, FaList, FaLock } from 'react-icons/fa'
import styles from '../Profile/Profile.module.css'
import { changePass,fetchProfile } from '../Config/Myservice'
import { MdOutlineCompareArrows, MdModeEdit } from 'react-icons/md'
import Navs from '../Navs/Navs'
import Footer from '../Footer/Footer'
import jwt_decode from 'jwt-decode'

export default function ChnagePass() {
    const [errors, setError] = useState({
        err_oldpass: '', err_npass: '', err_cpass: '', err_fname: '', err_lname: '', err_mobile: '',
        err_address: '', err_pincode: '', err_city: '', err_state: '', err_country: ''
    })
    const navigate=useNavigate();
    const [user, setUser] = useState([]);
    const npass = useRef();
    const cpass = useRef();
    const oldpass = useRef();
    useEffect(() => {
        let token = localStorage.getItem('_token')
        let decode = jwt_decode(token)
        let data = {id:decode.uid[0]._id}
        fetchProfile(data)
            .then((res) => {
                setUser(res.data)
            })

    }, [])


    const handler = (event) => {
        const name = event.target.name;
        switch (name) {
            case 'oldpass':
                const e_oldpass = oldpass.current.value.length < 8 ? 'Password should be 8 chanrater long' : '';
                setError({ err_oldpass: e_oldpass })
                break;
            case 'npass':
                const e_npass = npass.current.value.length < 8 ? 'Password should be 8 chanrater long' : '';
                setError({ err_npass: e_npass })
                break;
            case 'cpass':
                const e_cpass = (npass.current.value !== cpass.current.value) ? 'Password  not match' : '';
                setError({ err_cpass: e_cpass })
                break;
            default:

                break;
        }

    }

    const submit = (event) => {
        event.preventDefault();
        let token = localStorage.getItem('_token')
        let decode = jwt_decode(token)
        let data = { oldpass: oldpass.current.value, npass: npass.current.value, cpass: cpass.current.value, id:decode.uid[0]._id }
        changePass(data)
            .then((res) => {
               
                    alert(res.data.message)
               
            })
            .catch(err => {
                
                navigate('/ServerError')
                
            })
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
                        <Row >

                            {/* left Column */}
                            <Col xs={12} sm={4} md={4} lg={4} className={styles.leftcol}>
                                <div >
                                    <Image src={`Images/${pro.profile}`} roundedCircle width="100px" height="100px" className={styles.imagestyle} />
                                    <h5>{pro.fname} {pro.lname}</h5>
                                    <ul className={styles.liststyle}>
                                        <li> <FaList /><Link to="/order" >Order</Link> </li>
                                        <li><FaUserAlt /> <Link to="/profile" >Profile</Link></li>
                                        <li><FaRegAddressCard /> <Link to="/address">Address</Link> </li>
                                        {pro.social==false?
                                        <li><MdOutlineCompareArrows /> <Link to="/chnagepass" > Change Password</Link></li>
                                        :''}
                                       
                                    </ul>
                                </div>
                            </Col>


                            {/* Right Column */}
                            <Col xs={12} sm={8} md={8} lg={8} >
                                <section className={styles.col2}>
                                    
                                    <Form className={styles.pcformstyle} >
                                    <Row className={styles.col2heading}>
                                        <h2>Change Password</h2>
                                    </Row>
                                    <hr className='mb-5' />

                                        <Form.Group className="mb-4" controlId="formBasicPassword">
                                            <InputGroup>
                                                <InputGroup.Text id="basic-addon1" style={{ background: "none" }}><button className={styles.iconstyle} > <FaLock />  </button></InputGroup.Text>
                                                <Form.Control type="password" placeholder="Old Password" name="oldpass" id="pass" onChange={handler} ref={oldpass} required ></Form.Control>
                                            </InputGroup>
                                            <span style={{ color: 'red' }}>{errors.err_oldpass}</span>
                                        </Form.Group>


                                        <Form.Group className="mb-4" controlId="formBasicPassword">
                                            <InputGroup>
                                                <InputGroup.Text id="basic-addon1" style={{ background: "none" }}><button className={styles.iconstyle} > <FaLock />  </button></InputGroup.Text>
                                                <Form.Control type="password" placeholder="New Password" name="npass" id="npass" onChange={handler} ref={npass} required ></Form.Control>
                                            </InputGroup>
                                            <span style={{ color: 'red' }}>{errors.err_npass}</span>
                                        </Form.Group>

                                        <Form.Group className="mb-4" controlId="formBasicPassword">
                                            <InputGroup>
                                                <InputGroup.Text id="basic-addon1" style={{ background: "none" }}><button className={styles.iconstyle} > <FaLock />  </button></InputGroup.Text>
                                                <Form.Control type="password" placeholder="Confirm Password" name="cpass" id="cpass" onChange={handler} ref={cpass} required ></Form.Control>
                                            </InputGroup>
                                            <span style={{ color: 'red' }}>{errors.err_cpass}</span>
                                        </Form.Group>


                                        <div style={{ textAlign: "center" }}>
                                            <Button variant="primary" type="submit" onClick={submit} >
                                                Submit
                                            </Button>
                                        </div>


                                    </Form>


                                </section>

                            </Col>


                        </Row>
                    )}

                </Container>
            </Container>


            <Footer />


        </>
    )
}
