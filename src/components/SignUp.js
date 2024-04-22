import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function SignUp() {

    const [account, setAccount] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:9999/accounts`)
            .then(res => res.json())
            .then(result => setAccount(result))
    }, [])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const passwordRegex = /^[a-zA-Z0-9]{8,}$/;
        let errorMsg = '';
        if (!emailRegex.test(email)) {
            errorMsg += 'Invalid email format. \n';
        }
        if (account.find(acc => acc.email == email)) {
            errorMsg += 'Email is existed. \n';
        }
        if (!passwordRegex.test(password)) {
            errorMsg += 'Password must have at least 8 characters. ';
        }
        if (errorMsg) {
            alert(errorMsg);
            return;
        }

        const data = {
            email,
            password,
            name,
            gender,
            dob
        }

        fetch(`http://localhost:9999/accounts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...data, role: 'user' })
        })
            .then(res => res.json())
            .then(result => {
                alert("Account created successfully");
                setEmail('');
                setPassword('');
                setName('');
                setGender('');
                setDob('');
                navigate("/auth/Sign-in");
            }
            )
    }

    return (
        <Container>
            <Row style={{ textAlign: "center" }} textTransform="uppercase">
                <Col>
                    <h3>Sign Up</h3>
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
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Col>
                    </Row>
                    <Row style={{ margin: '10px 0px' }}>
                        <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }} >
                            <Form.Label>
                                Password*
                            </Form.Label>
                        </Col>
                        <Col xs={10} style={{ justifyContent: 'center', textAlign: 'left' }}>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Col>
                    </Row>
                    <Row style={{ margin: '10px 0px' }}>
                        <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }} >
                            <Form.Label>
                                Full Name
                            </Form.Label>
                        </Col>
                        <Col xs={10} style={{ justifyContent: 'center', textAlign: 'left' }}>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </Col>
                    </Row>
                    <Row style={{ margin: '10px 0px' }}>
                        <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }} >
                            <Form.Label>
                                Date of birth*
                            </Form.Label>
                        </Col>
                        <Col xs={10} style={{ justifyContent: 'center', textAlign: 'left' }}>
                            <Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                        </Col>
                    </Row>
                    <Row style={{ margin: '10px 0px' }}>
                        <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }} >
                            <Form.Label>
                                Gender
                            </Form.Label>
                        </Col>
                        <Col xs={10} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Form.Check type="radio" label="Male" name="gender" value="male" style={{ marginRight: '10px' }} onChange={(e) => setGender(e.target.value)} />
                            <Form.Check type="radio" label="Female" name="gender" value="female" style={{ marginRight: '10px' }} onChange={(e) => setGender(e.target.value)} />
                            <Form.Check type="radio" label="Other" name="gender" value="other" style={{ marginRight: '10px' }} onChange={(e) => setGender(e.target.value)} />
                        </Col>
                    </Row>

                </Form.Group>
            </Row>
            <Row style={{ margin: '10px 0px' }}>
                <Col style={{ justifyContent: 'center', textAlign: 'center' }}>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
                </Col>
            </Row>
        </Container>
    );
}

