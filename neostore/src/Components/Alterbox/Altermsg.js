import React, { useState } from 'react'
import { Container, Alert } from 'react-bootstrap'
import {  BsInfoCircleFill } from 'react-icons/bs'
import Styles from '../Alterbox/Altermsg.module.css'
export default function Altermsg() {
    const [show, setShow] = useState(true);
    return (
        <>
         <Container fluid>
                {show ?

                    <Alert className={Styles.alterbox} onClose={() => setShow(false)} dismissible>
                        <p><BsInfoCircleFill />  Get free shipping On all orders above Rs.5000. Hurry! Clock is Ticking. Shop now. T&C Apply!</p>
                    </Alert>
                    : ""}
            </Container>

            
        </>
    )
}
