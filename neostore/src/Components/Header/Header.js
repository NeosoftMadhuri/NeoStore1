import React, { useState } from 'react'
import { Container, Alert, Carousel,Button} from 'react-bootstrap'
import Footer from '../Footer/Footer'
import Navs from '../Navs/Navs'
import styles from '../Header/Header.module.css'
import { BsArrowReturnLeft, BsInfoCircleFill } from 'react-icons/bs'

export default function Header() {
    return (
        <>           
            
                {/* Carousel Section start */}
             
                <Carousel fade className={styles.slider} >
                {/* <Container className={styles.body}> */}
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="Images/furniture.jpg"
                            alt="First slide"
                            className={styles.image}
                        />
                        <Carousel.Caption>
                        <h3 >Exclusive Offer On Each And Every Order!!</h3>
                          
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                           className={styles.image}
                            src="Images/furniture2.jpg"
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                        <h3 >Gaurantee Of Every Product!!</h3>
                         
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                           className={styles.image}
                            src="Images/furniture3.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3 className={styles.h3style}>Office Chairs</h3>
                          
                        </Carousel.Caption>
                    </Carousel.Item>
                    {/* </Container> */}
                </Carousel>
             
                {/* Carousel Section end */}
                

          
           
            
        </>
    )
}
