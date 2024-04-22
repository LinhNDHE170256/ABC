import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function VerifyOrder() {
    const [user, setUser] = useState(null);
    const [verifiedUser, setVerifiedUser] = useState(null);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user')) || null;
        setUser(currentUser);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleCheckout = (e) => {
        const checkOutUser = { ...user, ...verifiedUser };
        localStorage.setItem('verifiedUser', JSON.stringify(checkOutUser));
        e.preventDefault();
        window.location.href = '/cart/CheckOut'; 
    };

    return (
        <Container fluid>
            <Row>
                <Col xs="10" style={{ justifyContent: 'center', textAlign: 'left' }}>
                    <Table className="col-12">
                        <tbody>
                            {user ? (
                                <div>
                                    <Row style={{ margin: '10px 0px' }}>
                                        <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }}> ID </Col>
                                        <Col xs={10}>
                                            <td>: {user.id}</td>
                                        </Col>
                                    </Row>
                                    <Row style={{ margin: '10px 0px' }}>
                                        <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }}> Name </Col>
                                        <Col xs={10}>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={user.fullName || ''}
                                                onChange={handleInputChange}
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ margin: '10px 0px' }}>
                                        <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }}> Address </Col>
                                        <Col xs={10}>
                                            <Form.Control
                                                type="text"
                                                name="address"
                                                value={user.address || ''}
                                                onChange={handleInputChange}
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ margin: '10px 0px' }}>
                                        <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }}> Mobile </Col>
                                        <Col xs={10}>
                                            <Form.Control
                                                type="text"
                                                name="phone"
                                                value={user.phone || ''}
                                                onChange={handleInputChange}
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ margin: '10px 0px' }}>
                                        <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }}> Email </Col>
                                        <Col xs={10}>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={user.email || ''}
                                                onChange={handleInputChange}
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ margin: '10px 0px' }}>
                                        <Col xs={12} style={{ justifyContent: 'center', textAlign: 'center' }}>
                                            <Button onClick={handleCheckout}>Checkout</Button>
                                        </Col>
                                    </Row>
                                </div>
                            ) : (
                                <div>
                                    <Row style={{ margin: '10px 0px' }}>
                                        <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }}> ID </Col>
                                        <Col xs={10}>
                                            <td>: </td>
                                        </Col>
                                    </Row>
                                    <Row style={{ margin: '10px 0px' }}>
                                        <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }}> Name </Col>
                                        <Col xs={10}>
                                            <Form.Control type="text" name="name" />
                                        </Col>
                                    </Row>
                                    <Row style={{ margin: '10px 0px' }}>
                                        <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }}> Address </Col>
                                        <Col xs={10}>
                                            <Form.Control type="text" name="address" />
                                        </Col>
                                    </Row>
                                    <Row style={{ margin: '10px 0px' }}>
                                        <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }}> Mobile </Col>
                                        <Col xs={10}>
                                            <Form.Control type="text" name="phone" />
                                        </Col>
                                    </Row>
                                    <Row style={{ margin: '10px 0px' }}>
                                        <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }}> Email </Col>
                                        <Col xs={10}>
                                            <Form.Control type="email" name="email" />
                                        </Col>
                                    </Row>
                                </div>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
