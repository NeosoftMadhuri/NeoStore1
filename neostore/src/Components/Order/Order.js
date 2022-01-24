import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table, Modal } from 'react-bootstrap'
import { getAllOrder } from '../Config/ProductService';
import { fetchProfile, sendEmail } from '../Config/Myservice';
import ReactToPdf from 'react-to-pdf';
import jwt_decode from 'jwt-decode'
import styles from '../Order/Order.module.css'
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';


const options = {
    orientation: 'potrait',
    unit: 'in',
    format: 'A4'
}
export default function Order() {
    const [product, setProducts] = useState([]);
    const [data, setData] = useState([]);
    const ref = React.createRef();
    const current = new Date();
    const [user, setUser] = useState([])
    const [status, setStatus] = useState(true)
    const [show, setShow] = useState(false);
    const [total, setTotal] = useState(0);
    const [gst, setGst] = useState(0);
    const navigate = useNavigate()
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    useEffect(() => {

        let token = localStorage.getItem('_token')
        let decode = jwt_decode(token)
        let data = { id: decode.uid[0]._id }
        getAllOrder(data)
            .then((res) => {
                setProducts(res.data)
                const dt = res.data.data.reduce((prev, cur) => prev + cur.total_productCost, 0);
                setTotal(dt)
                setGst(dt * 0.05)
            })
            .catch(err => {

                navigate('/ServerError')

            })
        fetchProfile(data)
            .then((res) => {
                setUser(res.data.profile)
            })
            .catch(err => {
                navigate('/ServerError')
            })

    }, [])
    const handleClose = () => setShow(false);
    const handleShow = (pro) => {
        setData(pro)
        setShow(true);
    }

    return (

        <>
            <Container className='mb-3'>
                <Row >

                    <hr />
                    <Row className={styles.row1}>

                        {product.data && product.data.map((pro, index) =>
                            <section>
                                <h4>Transit</h4>
                                <h5>Packed On:{date} <span className={styles.span1}>In Transit</span></h5>
                                <hr />
                                <Col sm={4} md={4} lg={4}>
                                    <img src={`Images/Product/${pro.product_id.product_image}`} width="100px" height="90px" />
                                </Col>
                                <hr />
                                <div> <Button onClick={() => { handleShow(pro) }}>Download Invioce As PDF </Button></div>
                                <hr />
                                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} fullscreen={true}>
                                    <Modal.Header closeButton>
                                        <Modal.Title >
                                            <nav class="navbar">
                                                <div >
                                                    <Button className=" d-flex justify-content-center" variant="warning">
                                                        <ReactToPdf targetRef={ref} filename={`_invoice.pdf`} options={options} x={0} y={0} scale={0.6}>
                                                            {({ toPdf }) => (
                                                                <Button onClick={() => {
                                                                    // sendData();
                                                                    toPdf();
                                                                }} variant="warning">
                                                                    Download
                                                                </Button>
                                                            )}
                                                        </ReactToPdf>
                                                    </Button>
                                                </div>
                                            </nav>
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div ref={ref} id='divToPrint' className="container p-3" style={{ border: "2px solid grey", height: "900px", width: "800px" }}>

                                            <nav class="navbar  navbar-light bg-light" >
                                                <div class="container-fluid " style={{ height: "168px" }}>
                                                    <img src="Images/logo.png" alt="" height="82px" width=" 185px" opacity=" 2" class="d-inline-block align-text-top" style={{ marginLeft: "15px", marginTop: "5px" }} />
                                                    <h2 className='text-end'>INVOICE</h2>
                                                </div>
                                            </nav>
                                            <div className='row m-0 border'>
                                                <div className='col text-left ml-4'>
                                                    <h6>From</h6>
                                                    <h5>Neostore</h5>
                                                    <br />
                                                    <h5>To</h5>
                                                    {user.map((pro) =>
                                                        <div>
                                                            <h6>{pro.fname} {pro.lname}</h6>
                                                            <h6>{pro.email}</h6>
                                                            <h6>{pro.Address[0].address}, <br />
                                                                {pro.Address[0].city}, {pro.Address[0].state},<br />
                                                                {pro.Address[0].country}</h6>
                                                        </div>
                                                    )}

                                                </div>
                                                <div className='col text-right mr-4'>
                                                    <h5 className={styles.colright}>Status</h5>
                                                    <h6 style={{ textAlign: "right", marginRight: "15px", color: "red", fontSize: "15px" }}>In Transit</h6>
                                                    <br />
                                                    <h5 className={styles.colright}>Invoice  Date</h5>

                                                    <h6 style={{ textAlign: "right", marginRight: "15px" }}>{date}</h6>
                                                    <h5 className={styles.colright}>Total Amount</h5>
                                                    <h6 style={{ textAlign: "right", marginRight: "15px" }}> INR {total + gst}</h6>
                                                </div>

                                            </div>
                                            <br />
                                            <div className={styles.tablediv}>
                                                <Table >
                                                    <thead>
                                                        <tr>
                                                            <th>Sr no</th>
                                                            <th>Item</th>
                                                            <th>Qty</th>
                                                            <th>Price</th>
                                                            <th>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data &&
                                                            <tr key={data._id}>
                                                                <td>{1}</td>
                                                                <td>{data.product_name}</td>
                                                                <td>{data.quantity}</td>
                                                                <td>{data.product_cost}</td>
                                                                <td>{data.total_productCost}</td>
                                                            </tr>
                                                        }
                                                    </tbody>
                                                </Table>

                                            </div>
                                            <hr />
                                            <div >
                                                <Row >
                                                    <Col sm={4} md={4} lg={4} styles={{ textAlign: "center" }}>Total={total}</Col>
                                                    <Col sm={4} md={4} lg={4} styles={{ textAlign: "center" }}>GST(5%)={gst}</Col>
                                                    <Col sm={4} md={4} lg={4} styles={{ float: "right" }}>Grand Total={total + gst}</Col>
                                                </Row>
                                            </div>
                                        </div>

                                    </Modal.Body>


                                </Modal>
                            </section>
                        )}

                    </Row>
                </Row>
            </Container>
            <Footer />
        </>
    )
}
