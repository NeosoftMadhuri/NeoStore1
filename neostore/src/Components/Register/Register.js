
import React, { useRef, useState } from 'react'
import { Container, Navbar, Nav, Button, Image, Row, Col, Form, InputGroup, Alert } from 'react-bootstrap'
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom'
import { FaUser, FaLock } from 'react-icons/fa'
import { MdTextFields, MdEmail, MdPhone, MdLock } from 'react-icons/md'
import { register } from '../Config/Myservice'
// import  {bcrypt}  from 'bcrypt'
import Navs from '../Navs/Navs'
import Footer from '../Footer/Footer'
import styles from '../Register/Register.module.css'
const regForName = RegExp(/[A-Za-z ]+/)
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

const saltRounds = 10;
export default function Register() {
    const [errors, setError] = useState({ err_fname: '', err_lname: '', err_uname: '', err_mobile: '', err_email: '', err_pass: '', err_cpass: '' })
    const fname = useRef();
    const lname = useRef();
    const [gender, setGender] = useState();
    const mobile = useRef();
    const password = useRef();
    const cpassword = useRef();
    const email = useRef();
    const navigate = useNavigate();
    const [showError, setShowerror] = useState(false);
    const [Err, setErr] = useState();
    const handler = (event) => {
        const name = event.target.name;
        switch (name) {
            case 'fname':
                const e_fname = regForName.test(fname.current.value) ? '' : 'Name should be  3 char long';
                setError({ err_fname: e_fname })
                break;
            case 'email':
                const e_email = regForEmail.test(email.current.value) ? '' : 'Email is not valid';
                setError({ err_email: e_email })
                break;
            case 'lname':
                const e_lname = lname.current.value.length < 3 ? 'Name should be  3 char long' : '';
                setError({ err_lname: e_lname })
                break;
            case 'password':
                const e_pass = password.current.value.length < 8 ? 'Password must be 8 chanrater long' : '';
                setError({ err_pass: e_pass })
                break;
            case 'cpassword':
                const e_cpass = (password.current.value !== cpassword.current.value) ? 'Password  not match' : '';
                setError({ err_cpass: e_cpass })
                break;
            case 'mobile':
                const e_mobile = mobile.current.value.length < 10 ? 'Mobile number should be 10 digit long' : '';
                setError({ err_mobile: e_mobile })
                break;

                break;
        }
    }

    const addUser = (event) => {

        event.preventDefault();
        let b_pass = password.current.value;
        if (fname.current.value == '' && lname.current.value == '' && email.current.value == '' && password.current.value == '' && mobile.current.value == '' && gender == undefined) {
            setErr("Please Fill the all field ")
            setShowerror(true)
        }
        else {
            let data = { fname: fname.current.value, lname: lname.current.value, email: email.current.value, password: password.current.value, mobile: mobile.current.value, gender: gender }

            console.log(data)
            register(data)
                .then(res => {
                    if (res.data.err == 0) {
                        console.log(res.data)
                        navigate('/login')
                    }
                    if (res.data.err == 1) {
                        console.log(res.data)
                        setErr(res.data.msg)
                        setShowerror(true)
                    }
                })
                .catch(err => {
                
                    navigate('/ServerError')
                    
                })

        }


    }
    return (
        <>
           
            <Container fluid className={styles.body}>

                <Container fluid >
                    <Row>
                        <Col sm={2} md={2} lg={2}></Col>
                        <Col sm={8} md={8} lg={8}>

                            <Row className='m-4'>
                                <Form method="post" onSubmit={addUser} className={styles.formstyle}>
                                    <Row >
                                        <div style={{ textAlign: "center" }}>
                                            <Image src="Images/avtart.png" roundedCircle width="80px" height="80px" />
                                        </div>

                                        <h4 className={styles.heading} >Welcome To NeoStore...</h4>
                                        {showError ?
                                            <Alert variant="danger" onClose={() => setShowerror(false)} dismissible>
                                                <h5>{Err}</h5>
                                            </Alert>
                                            : ""}
                                        <hr />
                                    </Row>

                                    <Row>
                                        <Col sm={12} md={12} lg={12}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>First Name</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text id="basic-addon1" style={{ background: "none" }}><button className={styles.iconstyle}> <MdTextFields />  </button></InputGroup.Text>
                                                    <Form.Control type="text" name="fname" onChange={handler} className="form-control" ref={fname} size="20" />
                                                </InputGroup>
                                                <span style={{ color: 'red' }}>{errors.err_fname}</span>
                                            </Form.Group>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12} md={12} lg={12}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Last Name</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text id="basic-addon1" style={{ background: "none" }}><button className={styles.iconstyle}> <MdTextFields />  </button></InputGroup.Text>
                                                    <Form.Control type="text" name="lname" onChange={handler} ref={lname} className="form-control" size="20" />
                                                </InputGroup>
                                                <span style={{ color: 'red' }}>{errors.err_lname}</span>
                                            </Form.Group>

                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm={12} md={12} lg={12}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email id</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text id="basic-addon1" style={{ background: "none" }}><button className={styles.iconstyle}> <MdEmail />  </button></InputGroup.Text>
                                                    <Form.Control type="text" name="email" onChange={handler} ref={email} className="form-control" size="20" />
                                                </InputGroup>
                                                <span style={{ color: 'red' }}>{errors.err_email}</span>
                                            </Form.Group>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12} md={12} lg={12}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Mobile</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text id="basic-addon1" style={{ background: "none" }}><button className={styles.iconstyle}> <MdPhone />  </button></InputGroup.Text>
                                                    <Form.Control type="number" name="mobile" onChange={handler} ref={mobile} className="form-control" size="20" />
                                                </InputGroup>
                                                <Form.Text muted>
                                                    Min 10 digit
                                                </Form.Text><br />
                                                <span style={{ color: 'red' }}>{errors.err_mobile}</span>
                                            </Form.Group>

                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm={12} md={12} lg={12}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Password</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text id="basic-addon1" style={{ background: "none" }}><button className={styles.iconstyle}> <MdLock />  </button></InputGroup.Text>
                                                    <Form.Control type="password" name="password" onChange={handler} ref={password} className="form-control" size="20" />
                                                </InputGroup>
                                                <Form.Text id="passwordHelpBlock" muted>
                                                    Your password must be 8-20 characters long,
                                                </Form.Text><br />
                                                <span style={{ color: 'red' }}>{errors.err_pass}</span>
                                            </Form.Group>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12} md={12} lg={12}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text id="basic-addon1" style={{ background: "none" }}><button className={styles.iconstyle}> <MdLock />  </button></InputGroup.Text>
                                                    <Form.Control type="password" name="cpassword" ref={cpassword} onChange={handler} className="form-control" size="20" />
                                                </InputGroup>
                                                <Form.Text id="passwordHelpBlock" muted>
                                                    Your password must be 8-20 characters long
                                                </Form.Text><br />
                                                <span style={{ color: 'red' }}>{errors.err_cpass}</span>
                                            </Form.Group>

                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm={12} md={12} lg={12}>
                                            <Form.Group className="mb-3" controlId="formGroupEmail">

                                                <fieldset>
                                                    <Form.Group as={Row} className="mb-3">
                                                        <Form.Label as="legend" column sm={2}>
                                                            Gender
                                                        </Form.Label>
                                                        <Col sm={10}>
                                                            <Form.Check
                                                                type="radio"
                                                                label="Female"
                                                                name="gender"
                                                                value="Female"
                                                                id="formHorizontalRadios1"
                                                                onChange={(e) => { setGender(e.target.value) }}
                                                            />
                                                            <Form.Check
                                                                type="radio"
                                                                label="Male"
                                                                name="gender"
                                                                value="Male"
                                                                id="formHorizontalRadios2"
                                                                onChange={(e) => { setGender(e.target.value) }}
                                                            />

                                                        </Col>
                                                    </Form.Group>
                                                </fieldset>
                                            </Form.Group>
                                        </Col>
                                    </Row>



                                    <Row>
                                        <Col sm={6} md={6} lg={6}>
                                            <div style={{ textAlign: "center" }}>
                                                <Button type="submit" className="btn btn-primary mb-3">Submit</Button>
                                            </div>
                                        </Col>
                                        <Col sm={6} md={6} lg={6}>
                                            <div style={{ textAlign: "center" }}>
                                                <Button className="btn btn-secondary" type="submit">
                                                    <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Back</Link>
                                                </Button>
                                            </div>

                                        </Col>
                                    </Row>
                                </Form>
                            </Row>
                        </Col>
                        <Col sm={2} md={2} lg={2}></Col>
                    </Row>
                </Container>

            </Container>
            <Footer />

        </>
    )
}
