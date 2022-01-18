import React,{useRef,useState} from 'react'
import styles from '../Profile/Profile.module.css'
import { Container, Row, Col, Image, Button, Form, InputGroup, Modal, FloatingLabel } from 'react-bootstrap'
import { addAddress } from '../Config/Myservice'



export default function Address_page() {
    const [errors, setError] = useState({
        err_oldpass: '', err_npass: '', err_cpass: '', err_fname: '', err_lname: '', err_mobile: '',
        err_address: '', err_pincode: '', err_city: '', err_state: '', err_country: ''
    })
    const address = useRef();
const pincode = useRef();
const city = useRef();
const state = useRef();
const country = useRef();

const handler = (event) => {
    const name = event.target.name;
    switch (name) {
        case 'Address':
            const e_address = address.current.value.length < 0 ? "Address should be greater than 0" : '';
            setError({ err_address: e_address })
            break;
        case 'pincode':
            const e_pincode = pincode.current.value.length > 6 ? 'Pincode should be 6 digit long' : '';
            setError({ err_pincode: e_pincode })
            break;
        case 'city':
            const e_city = city.current.value.length < 3 ? 'City name should be greater than 3 char long' : '';
            setError({ err_city: e_city })
            break;
        case 'state':
            const e_state = state.current.value.length < 3 ? 'State name should be greater than 3 char long' : '';
            setError({ err_state: e_state })
            break;
        case 'country':
            const e_country = country.current.value.length < 3 ? 'State name should be greater than 3 char long' : '';
            setError({ err_country: e_country })
            break;


        default:

            break;
    }

}

const Addaddress = (e) => {
    e.preventDefault();
    console.log("Add Address")
    let email=sessionStorage.getItem('user')
    let data = { email:email,address: address.current.value, pincode: pincode.current.value, city: city.current.value, state: state.current.value, country: country.current.value }
    console.log(data)
    addAddress(data)
    .then((res)=>{
        console.log(res.data)
    })
    window.location.reload();
   
}
    return (
        <>




        
         <section className={styles.col2}>
                                        <Row className={styles.col2heading}>
                                            <h2>Add New Address</h2>
                                        </Row>
                                        <hr />
                                        <Form className={styles.pcformstyle} >

                                            <FloatingLabel label="Address" className="mb-3">
                                                <Form.Control as="textarea" placeholder="Address" name="address" id="address" ref={address} onChange={handler} />
                                                <Form.Text id="passwordHelpBlock" muted>
                                                    Max 100 char
                                                </Form.Text>
                                                <span style={{ color: 'red' }}>{errors.err_address}</span>
                                            </FloatingLabel>

                                            <Row>
                                                <Col sm={6} md={6} lg={6}>
                                                    <Form.Group className="mb-3" >
                                                        <Form.Control type="number" name="pincode" placeholder='Pincode' onChange={handler} ref={pincode} className="form-control" size="20" />
                                                        <span style={{ color: 'red' }}>{errors.err_pincode}</span>
                                                    </Form.Group>
                                                </Col>
                                                <Col sm={6} md={6} lg={6}> <Form.Group className="mb-3" >
                                                    <Form.Control type="text" name="city" placeholder='City' onChange={handler} ref={city} className="form-control" size="20" />
                                                    <span style={{ color: 'red' }}>{errors.err_city}</span>
                                                </Form.Group></Col>
                                            </Row>
                                            <Form.Group className="mb-3" >
                                                <Form.Control type="text" name="state" placeholder='State' onChange={handler} ref={state} className="form-control" size="20" />
                                                <span style={{ color: 'red' }}>{errors.err_state}</span>
                                            </Form.Group>
                                            <Form.Group className="mb-3" >
                                                <Form.Control type="text" name="country" placeholder='Country' onChange={handler} ref={country} className="form-control" size="20" />
                                                <span style={{ color: 'red' }}>{errors.err_country}</span>
                                            </Form.Group>

                                            <div style={{ textAlign: "center" }}>
                                                <Button variant="primary" type="submit" onClick={Addaddress} >
                                                    Submit
                                                </Button>
                                              
                                            </div>
                                        </Form>
                                    </section>
            
        </>
    )
}
