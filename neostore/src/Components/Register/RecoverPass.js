import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col, Form, Button, Modal,Alert } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Navs from '../Navs/Navs'
import Footer from '../Footer/Footer'
import styles from '../Register/Register.module.css'
import { sendEmail, recoverPass } from '../Config/Myservice'
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export default function RecoverPass() {
    const [errors, setError] = useState({ err_vcode: '', err_npass: '', err_cpass: '', err_email: '' })
    const [show, setShow] = useState(true)
    const [OTP, setOtp] = useState('');
    const [user, setUser] = useState('');
    const email = useRef('');
    const vcode = useRef('');
    const npass = useRef('');
    const cpass = useRef('');
    const [showError, setShowerror] = useState(false);
    const [Err, setErr] = useState();
    const navigate = useNavigate();
    useEffect(() => {
    }, [])

    const handleClose = () => {

        setShow(false)
    }


    const sendMail = (event) => {

        event.preventDefault();
        setUser(email.current.value)
        console.log(email.current.value)
        sessionStorage.setItem('user', email.current.value)
        sendEmail(user)
            .then((res) => {
                console.log(res.data.OTP)
                setOtp(res.data.OTP)
            })
        setShow(false)
    }

    const handler = (event) => {
        const name = event.target.name;
        switch (name) {
            case 'vcode':
                console.log(vcode.current.value == OTP)
                const e_vcode = (vcode.current.value == OTP) ? '' : 'Wrong OTP';
                setError({ err_vcode: e_vcode })
                break;
            case 'npass':
                const e_npass = npass.current.value.length < 8 ? 'Password must be 8 chanrater long' : '';
                setError({ err_npass: e_npass })
                break;
            case 'cpass':
                const e_cpass = (npass.current.value !== cpass.current.value) ? 'Password  not match' : '';
                setError({ err_cpass: e_cpass })
                break;
            case 'email':
                const e_email = regForEmail.test(email.current.value) ? '' : 'Email is not valid';
                setError({ err_email: e_email })
                break;
            default:

                break;
        }
    }
    console.log(OTP)


    const submit = (event) => {

        event.preventDefault();
        console.log(vcode.current.value, OTP)
        if (vcode.current.value == OTP) {
            alert("OTP MACHED")
            let data = { email: user, password: npass.current.value }
            console.log(data)
            recoverPass(data)
                .then((res) => {
                    if (res.data.err == 0) {
                        navigate("/login")
                    }
                    else {
                        setErr(res.data.msg)
                        setShowerror(true)
                    }
                })

            document.getElementById('email').value = " ";

        }
        else {
            setErr("OTP NOT MATCH !! TRY AGAIN")
            setShowerror(true)

        }


    }
    return (
        <>
           
            <Container >


                {show ? <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className={styles.recoverheading}>Send OTP</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={sendMail}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <h6 className={styles.recoverheading}>Send OTP to your registered email id</h6>
                                {/* <Form.Label>Email address</Form.Label> */}
                                <Form.Control type="email" placeholder="Email Address" name="email" id="email" onChange={handler} className="form-control" ref={email} />
                                <span style={{ color: 'red' }}>{errors.err_email}</span>
                            </Form.Group>
                            <div style={{textAlign:"center"}}>
                            <Button variant="warning" type="submit" >
                                Send OTP
                            </Button>

                            </div>
                           
                        </Form>


                    </Modal.Body>

                </Modal>


                    : ''}

                <Row style={{ margin: "50px" }} >
                    {showError ?
                        <Alert variant="danger" onClose={() => setShowerror(false)} dismissible>
                            <h5>{Err}</h5>
                        </Alert>
                        : ""}
                    <Col sm={3} md={3} lg={3}></Col>
                    <Col sm={6} md={6} lg={6} >
                        <Form className={styles.formstyle} onSubmit={submit}>
                            <h4 className={styles.h4}>Recover Password </h4>
                            <hr />
                            <div className={styles.divotp}>
                                <small>OTP sent to your registered mail id..<Link to="#" onClick={()=>{setShow(true)}}>Resend OTP</Link></small>
                            </div>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                {/* <Form.Label>Email address</Form.Label> */}
                                <Form.Control type="number" placeholder="Verification Code" name="vcode" onChange={handler} className="form-control" ref={vcode} />
                                <span style={{ color: 'red' }}>{errors.err_vcode}</span>

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                {/* <Form.Label>Password</Form.Label> */}
                                <Form.Control type="password" placeholder="New Password" name="npass" onChange={handler} className="form-control" ref={npass} />
                                <span style={{ color: 'red' }}>{errors.err_npass}</span>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                {/* <Form.Label>Password</Form.Label> */}
                                <Form.Control type="password" placeholder="Confirm Password" name="cpass" onChange={handler} className="form-control" ref={cpass} />
                                <span style={{ color: 'red' }}>{errors.err_cpass}</span>
                            </Form.Group>

                            <div style={{ textAlign: "center" }}>
                                <Button variant="primary" type="submit" >
                                    Submit
                                </Button>
                            </div>


                        </Form> </Col>
                    <Col sm={3} md={3} lg={3}> </Col>
                </Row>


            </Container>
            <Footer />
        </>
    )
}
