import React from 'react'
import { Container, Row, Col, Button, Form, FormControl } from 'react-bootstrap'
import { BsFacebook, BsTwitter, BsGoogle, BsInstagram } from 'react-icons/bs'
import styles from '../Footer/Footer.module.css'
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom'

export default function Footer() {
    const navigate=useNavigate()

    return (
        <>
            {/* Footer Section Start */}
            <Container fluid className={styles.footer} >
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={4} lg={4}>
                            <div className={styles.footertitle}>
                                <h4 className={styles.h4style}>About Company</h4>
                                <h6 className={styles.footercontent}>NTPL SEZ (Blueridge), IT-06/09, 1st Floor, Hinjewadi Phase 1 Rd, Hinjewadi Rajiv Gandhi Infotech Park, Hinjawadi, Pune, Maharashtra 411057</h6>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={4}>
                            <div className={styles.footertitle}>
                                <h4 className={styles.h4style}>Information</h4>
                                <h6 className={styles.footercontent}> <a href="Terms.pdf" target="_blank">Terms & Condition</a></h6>
                                <h6 className={styles.footercontent}>About Us</h6>
                                <h6 className={styles.footercontent}>Contact Us</h6>
                                <h6 className={styles.footercontent}><a href="https://www.google.com/maps/place/NeoSOFT+Technologies/@18.5790021,73.7387793,15z/data=!4m2!3m1!1s0x0:0x316090d140dfd0b3?sa=X&ved=2ahUKEwjIvJSh4Lr1AhU6w4sBHcl9CAMQ_BJ6BAgjEAU" target="_blank">Locate Us</a></h6>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={4} className={styles.footertitle} >
                            <div className={styles.footertitle}>
                                <h4 className={styles.h4style}>NewsLetter</h4>


                                <Row>
                                    <h4 className={styles.footercontent}><pre><BsFacebook />  <BsTwitter />  <BsGoogle />  <BsInstagram /></pre></h4>
                                </Row>
                                <h6>Subscribe to our newsletter.</h6>

                                <Row className='mt-4' style={{ alignContent: "center" }}>
                                    <Col sx={12} sm={12} md={12} lg={12} >
                                        <Form className={styles.box}>
                                            <FormControl type="search" placeholder="Your Email..."  />
                                            <Button className='mt-3' onClick={()=>{navigate('/thanks')}}>Subscribe</Button>
                                        </Form>
                                        
                                    </Col>

                                </Row>
                            </div>
                        </Col>

                    </Row>

                </Container>
                <Row style={{ textAlign: "center" }}>
                    <small>Copyright 2021 NeoStore |All Right Reserved|Designed By Madhuri Ambole</small>
                </Row>
            </Container>
            {/* Footer Section End */}
        </>
    )
}
