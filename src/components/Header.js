import React from 'react'
import { Container, Row, Col, Carousel, Nav, Navbar, Button  } from 'react-bootstrap'
const Header = () => {
    const handleSignOut = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <header>
            <Row>
                <Row  style={{ justifyContent: 'right', textAlign: 'right' }} >
                    {user ? ( // Nếu có người dùng đăng nhập
                        <Col md={12} className="d-none d-lg-block d-print-block" style={{ display: 'flex', justifyContent: 'right', backgroundColor: 'Blue' }}>
                            <Button variant="link" onClick={handleSignOut} style={{ margin: '0px 10px', color: 'white' }}>Sign Out</Button>
                        </Col>
                    ) : ( // Nếu không có người dùng đăng nhập
                        <Col md={12} className="d-none d-lg-block d-print-block" style={{ display: 'flex', justifyContent: 'right', backgroundColor: 'Blue' }}>
                            <Button variant="link" style={{ margin: '0px 10px', color: 'white' }} href="/auth/Sign-up">Sign Up</Button> |
                            <Button variant="link" style={{ margin: '0px 10px', color: 'white' }} href="/auth/Sign-in">Sign In</Button>
                        </Col>
                    )}
                </Row>
                <Row style={{ display: 'flex' }}>
                    <Col className="d-none d-lg-block d-print-block" md={10} xs={12} style={{ backgroundColor: 'white' }}>
                        <Carousel style={{ width: '100%' }}>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/assets/event-5.jpg    "
                                    style={{ width: "100px", height: "350px" }}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/assets/event-6.jpg"
                                    style={{ width: "100px", height: "350px" }}
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/assets/event-7.jpg"
                                    style={{ width: "100px", height: "350px" }}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>

                    </Col>
                    <Col md={2} className="d-none d-lg-block d-print-block">
                        <h1>Hot New</h1>
                        <h4> -New 1</h4>
                        <h4> -New 2</h4>
                        <h4> -New 3</h4>
                    </Col>
                </Row>
            </Row>
            <Row>
                <Navbar expand="md" bg="light" variant="light"> {/* Navbar mở rộng cho màn hình nhỏ hơn 576px */}
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/* Nút cho phép mở rộng navbar */}
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto"> {/* Các menu được căn chỉnh sang phải */}
                                <Nav.Link href="/">Home</Nav.Link> {/* Đường dẫn cho mục Home */}
                                <Nav.Link href="/products">Products</Nav.Link> {/* Đường dẫn cho mục Products */}
                                <Nav.Link href="#">About us</Nav.Link> {/* Đường dẫn cho mục About us */}
                                <Nav.Link href="#">Contact</Nav.Link> {/* Đường dẫn cho mục Contact */}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            </Row>
        </header>
    )
}

export default Header

