import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


export default function SignIn() {
    const [account, setAccount] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:9999/accounts`)
            .then(res => res.json())
            .then(result => setAccount(result))
    }, [])

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = account.find(acc => acc.email == loginEmail && acc.password == loginPassword)
        if (user.role === 'admin') {
            localStorage.setItem('user', JSON.stringify(user)); // Lưu thông tin người dùng vào local storage
            window.location.href = '/admin/products'; // Chuyển hướng về trang quản trị
        } else if (user) {
            localStorage.setItem('user', JSON.stringify(user)); // Lưu thông tin người dùng vào local storage
            window.location.href = '/'; 
        } else {
            alert(`Invalid login`);
        }
    }

    return (
        <Container>
            <Row style={{ textAlign: "center" }} textTransform="uppercase">
                <Col>
                    <h3>Sign In</h3>
                </Col>
            </Row>
            <Row style={{ justifyContent: 'center' }}>
                <Form.Group className='mb-3' style={{ width: '50%' }}>
                    <Row style={{ margin: '10px 0px' }}>
                        <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }}>
                            <Form.Label>
                                Email*
                            </Form.Label>
                        </Col>
                        <Col xs={10} style={{ justifyContent: 'center', textAlign: 'left' }}>
                            <Form.Control type="text" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                        </Col>
                    </Row>
                    <Row style={{ margin: '10px 0px' }}>
                        <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }} >
                            <Form.Label>
                                Password*
                            </Form.Label>
                        </Col>
                        <Col xs={10} style={{ justifyContent: 'center', textAlign: 'left' }}>
                            <Form.Control type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        </Col>
                    </Row>
                    <Row style={{ margin: '10px 0px' }}>
                        <Col style={{ justifyContent: 'center', textAlign: 'center' }}>
                            <Button variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Row>

        </Container>
    )
}










