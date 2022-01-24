import React, { useState, useRef } from 'react'
import { Container, Row, Col, Form, Button, Image, InputGroup, FormControl, Alert, Toast, ToastContainer } from 'react-bootstrap'
import Footer from '../Footer/Footer'
import { FaUser, FaLock } from 'react-icons/fa'
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom'
import SocialButton from "./SocialButton";
import styles from '../Login/Login.module.css'
import { login, UserSocialLogin } from '../Config/Myservice'
import { useSelector, useDispatch } from 'react-redux'
import { getCart, changeId } from '../Config/ProductService'
import jwt_decode from 'jwt-decode'
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);



export default function Login() {
    const [errors, setError] = useState({ err_email: '', err_pass: '' })
    const email = useRef('')
    const password = useRef('')
    const navigate = useNavigate('')
    const [showError, setShowerror] = useState(false);
    const [Err, setErr] = useState();
    const uuid = useSelector(state => state.uuid)
    const dispatch = useDispatch();
    const [show, setShow] = useState(true)

    const handleSocialLogin = (user) => {
        console.log(user);
        if (user) {
            UserSocialLogin(user._profile)
                .then((res) => {
                    console.log(res)
                    if (res.data.status == 200) {
                        localStorage.setItem("_token", res.data.token);
                        sessionStorage.setItem("user", user._profile.email)
                        let decode = jwt_decode(res.data.token);
                        let data = { id: decode.uid[0]._id, customer_id: uuid }
                        changeId(data)
                            .then((res) => {
                                alert(res.data.message)
                                dispatch({ type: 'enable' })
                                let data = { id: decode.uid[0]._id }
                                getCart(data)
                                    .then(res => {
                                        dispatch({ type: 'cart', payload: res.data.count })
                                    })
                                    .catch(err => {

                                        navigate('/ServerError')

                                    })
                                localStorage.removeItem('uuid')
                                navigate('/dashboard')

                            })
                            .catch(err => {

                                navigate('/ServerError')

                            })


                    }
                    if (res.data.err == 1) {
                        setErr(res.data.msg)
                        setShowerror(true)
                    }
                })
        }

    };

    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };

    const responseGoogle = (response) => {
        console.log(response)
    }

    //validation
    const handler = (event) => {
        const name = event.target.name;

        switch (name) {
            case 'email':
                const e_email = regForEmail.test(email.current.value) ? '' : 'Email-id is not valid';
                setError({ err_email: e_email })
                break;
            case 'password':
                const e_pass = password.current.value.length < 8 ? 'Password should be 8 char long' : '';
                setError({ err_pass: e_pass })
            default:
                break;
        }
    }

    //Check Login Credentials
    const addUser = (event) => {
        event.preventDefault();
        let data = { email: email.current.value, password: password.current.value }
        console.log(data)
        login(data).
            then(res => {
                if (res.data.status == 200) {
                    console.log(res.data)
                    localStorage.setItem("_token", res.data.token);
                    sessionStorage.setItem("user", email.current.value)
                    let decode = jwt_decode(res.data.token);
                    console.log(decode.uid[0]);
                    console.log(uuid)
                    let data = { id: decode.uid[0]._id, customer_id: uuid }
                    changeId(data)
                        .then((res) => {
                            alert(res.data.message)
                            dispatch({ type: 'enable' })
                            let data = { id: decode.uid[0]._id }
                            getCart(data)
                                .then(res => {
                                    console.log(res.data.count);
                                    dispatch({ type: 'cart', payload: res.data.count })
                                })
                                .catch(err => {

                                    navigate('/ServerError')

                                })
                            localStorage.removeItem('uuid')
                            navigate('/dashboard')

                        })

                }
                if (res.data.status == 400) {
                    console.log(res.data.msg)
                    setErr(res.data.msg)
                    setShowerror(true)
                }
            })
    }
    return (
        <>

            <Container fluid className={styles.body}>

                <Container >



                    <Row>
                        <Col sm={1} md={2} lg={2} ></Col>
                        <Col sm={10} md={8} lg={8} >
                            {/* {showError ?
                                <ToastContainer position="top-center" className="p-3">
                                    <Toast onClose={() => setShow(false)} show={show}  >
                                        <Toast.Header>
                                            {Err}
                                        </Toast.Header>

                                    </Toast>
                                </ToastContainer>
                                : ""} */}
                            <Form className={styles.formstyle} >
                                <div style={{ textAlign: "center" }}>
                                    <Image src="Images/avtart.png" roundedCircle width="100px" height="100px" />
                                </div>
                                <h4 className={styles.heading} >Login With Social Media Or Gmail..</h4>
                                {/* <h4 className={styles.h4} >Login </h4> */}
                                {showError ?
                                    <Alert variant="danger" onClose={() => setShowerror(false)} dismissible>
                                        <h5>{Err}</h5>
                                    </Alert>
                                    : ""}
                                <hr />

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <InputGroup>

                                        <InputGroup.Text id="basic-addon1" style={{ background: "none" }}><button className={styles.iconstyle}> <FaUser />  </button></InputGroup.Text>
                                        <Form.Control type="email" placeholder="Enter email" name="email" id="email" ref={email} onChange={handler} required />
                                    </InputGroup>
                                    <span style={{ color: 'red' }}>{errors.err_email}</span>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text id="basic-addon1" style={{ background: "none" }}><button className={styles.iconstyle} > <FaLock />  </button></InputGroup.Text>
                                        <Form.Control type="password" placeholder="Password" name="password" id="pass" onChange={handler} ref={password} required ></Form.Control>
                                    </InputGroup>
                                    <span style={{ color: 'red' }}>{errors.err_pass}</span>

                                </Form.Group>

                                <div style={{ textAlign: "center" }}>
                                    <Button variant="primary" type="submit" onClick={addUser} >
                                        Submit
                                    </Button>
                                </div>
                                <Row>
                                    <Col sm={12} md={12} lg={12}  >
                                        {/* <Col sm={12} md={6} lg={6}className={styles.divlink}>
                                        <span className={styles.span1} >Don't have account ?</span>
                                        </Col>
                                        <Col sm={12} md={6} lg={6} className={styles.divlink}>
                                        <Link to="/register" className={styles.link}>Register</Link>
                                            <Link to="/recoverpass" className={styles.link}>Forgot Password</Link>
                                            </Col> */}
                                        <div className={styles.divlink}>
                                            <span className={styles.span1} >Don't have account ?</span><Link to="/register" className={styles.link}>Register</Link>
                                            <Link to="/recoverpass" className={styles.link}>ForgotPassword</Link>
                                        </div>
                                    </Col>
                                </Row>
                                <hr />
                                <Row className={styles.socialbutton}>
                                    <Col sx={12} sm={6} md={6} lg={6}>

                                        <SocialButton
                                            provider="facebook"
                                            appId="289835796339878"
                                            onLoginSuccess={handleSocialLogin}
                                            onLoginFailure={handleSocialLoginFailure}
                                            className={styles.keploginfacebook}>
                                            Login with Facebook
                                        </SocialButton>
                                    </Col>
                                    <Col sx={12} sm={6} md={6} lg={6}>
                                        <SocialButton
                                            provider="google"
                                            appId="1037906598032-3rih2qrfuctv0co8nobm5no1lt7k7pf6.apps.googleusercontent.com"
                                            onLoginSuccess={handleSocialLogin}
                                            onLoginFailure={handleSocialLoginFailure}
                                            className={styles.keplogingoogle}>
                                            Login with Google
                                        </SocialButton>

                                    </Col>
                                </Row>
                            </Form>

                        </Col>
                    </Row>

                </Container>

            </Container>

            {/* <Container >
                <Row className='p-5 m-2 '>

                    <Row>
                        <Col sx={12} sm={6} md={6} lg={6}>

                            <Row className='mb-5' >
                                <Col sm={2} md={2} lg={2}></Col>
                                <Col sm={8} md={8} lg={8}>
                                <FacebookLogin
                                        appId="1088597931155576"
                                        autoLoad
                                        callback={responseFacebook}
                                        render={renderProps => (
                                            <button onClick={renderProps.onClick} className={styles.keploginfacebook}><BsFacebook className={styles.loginbutton} /><span>Login With facebook</span></button>
                                        )}
                                    />
                                  
                                </Col>
                                <Col sm={2} md={2} lg={2}></Col>
                            </Row>


                          
                            <Row className='mb-5' >

                                <Col sm={2} md={2} lg={2}></Col>
                                <Col sm={8} md={8} lg={8}>
                                <GoogleLogin
                                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                        render={renderProps => (
                                            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className={styles.keplogingoogle} ><BsGoogle className={styles.loginbutton} /><span> Login With Google</span></button>
                                        )}
                                        buttonText="Login"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </Col>
                                <Col sm={2} md={2} lg={2}></Col>
                            </Row>

                            <Row className='p-3'>
                                <div  ><Link to="/" className={styles.link}>Register</Link></div>



                            </Row>
                        </Col>

                        
                        <Col sx={12} sm={6} md={6} lg={6} >


                            <Row>
                               
                                <Col sx={12} sm={12} md={12} lg={12}>
                                    <Form className={styles.formstyle}>
                                        <h4 >Login to NeoStore....</h4>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" />

                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label="Check me out" />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>


                                    </Form>
                                </Col>
                                
                            </Row>

                        </Col>
                    </Row>

                </Row>

              


            </Container> */}
            <Footer />
        </>
    )
}
