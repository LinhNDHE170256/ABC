import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";

export default function Product({ data = [] }) {
    const [product, setProduct] = useState(data);
    const { cate_id } = useParams();
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    useEffect(() => {
        fetch(cate_id ? `http://localhost:9999/products?CatID=${cate_id}` : `http://localhost:9999/products`)
            .then(res => res.json())
            .then(result => setProduct(result));
    }, [cate_id]);

    const addToCart = (productId) => {
        const existingProductIndex = cart.findIndex(item => item.id === productId);
        if (existingProductIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            const productToAdd = product.find(p => p.id === productId);
            const updatedCart = [...cart, { ...productToAdd, quantity: 1 }];
            setCart(updatedCart);
        }
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const numberCartProduct = cart.length;

    console.log(cart);

    return (
        <Container>
            <Row>
                <h5 class="fa fa-shopping-cart" style={{ textAlign: 'right' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16" style={{ color: 'blue' }} >
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
                    <Link to={`/cart`}>Cart: ({numberCartProduct})</Link>
                </h5>
            </Row>
            <Row xs={1} md={4} className="g-4">
                {product.map(p => {
                    return (
                        <Col className="md-3" key={p.id}>
                            <div className="card" style={{ height: '100%', textAlign: 'center' }}>
                                <img src={p.image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5><Link to={`/product/${p.id}`}>{p.Name}</Link></h5>
                                    <p className="card-text">{p.Price}</p>
                                    <Button variant="primary" onClick={() => addToCart(p.id)}>Add to cart</Button>
                                </div>
                            </div>
                        </Col>
                    )
                })}
            </Row>

            <Row>
                <Col style={{ justifyContent: 'center', margin: '20px' }}>
                    <ul className="pagination" style={{ justifyContent: 'center' }} >
                        <li className="page-item" style={{ margin: '0px 10px' }}><a className="page-link" href="#">1</a></li>
                        <li className="page-item" style={{ margin: '0px 10px' }}><a className="page-link" href="#">2</a></li>
                        <li className="page-item" style={{ margin: '0px 10px' }}><a className="page-link" href="#">3</a></li>
                        <li className="page-item" style={{ margin: '0px 10px' }}><a className="page-link" href="#">4</a></li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}
