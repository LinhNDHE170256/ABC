import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";

export default function ProductDetail() {
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const { pId } = useParams();

    useEffect(() => {
        fetch("http://localhost:9999/categories")
            .then(res => res.json())
            .then(result => setCategories(result))
        fetch(`http://localhost:9999/products?id=${pId}`)
            .then(res => res.json())
            .then(result => setProduct(result))
    }, [])
    return (
        <Container fluid>
            <Row>
                <Col xs="2" style={{ justifyContent: 'center', textAlign: 'left' }}>
                    {product?.map(p => (<img src={p.image} className="card-img-top" style={{ width: '100%' }} />))}
                </Col>
                <Col xs="10" style={{ justifyContent: 'center', textAlign: 'left' }}>
                    <Table className="col-12">
                        <tbody>
                            {
                                product?.map(p => {
                                    const cat = categories.find(c => c.id == p.CatID);
                                    return (
                                        <div>
                                            <Row style={{ margin: '10px 0px' }}>
                                                <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }}> ID </Col>
                                                <Col xs={10}>
                                                    <td >: {p?.id}</td>
                                                </Col>
                                            </Row>
                                            <Row style={{ margin: '10px 0px' }}>
                                                <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }}> Name </Col>
                                                <Col xs={10}>
                                                    <td >: {p?.Name}</td>
                                                </Col>
                                            </Row>
                                            <Row style={{ margin: '10px 0px' }}>
                                                <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }}> Price </Col>
                                                <Col xs={10}>
                                                    <td >: {p?.Price}</td>
                                                </Col>
                                            </Row>
                                            <Row style={{ margin: '10px 0px' }}>
                                                <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }}> Category name </Col>
                                                <Col xs={10}>
                                                    <td >: {cat?.catName}</td>
                                                </Col>
                                            </Row>
                                            <Row style={{ margin: '10px 0px' }}>
                                                <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }}> Quantity </Col>
                                                <Col xs={10}>
                                                    <td >: {p?.quantity}</td>
                                                </Col>
                                            </Row>
                                            <Row style={{ margin: '10px 0px' }}>
                                                <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }}> Status </Col>
                                                <Col xs={10}>
                                                    <td >: {p?.status ? "Is stock" : "Out of stock"}</td>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                }
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

