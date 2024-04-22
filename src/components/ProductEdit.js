import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null); 
    const { pId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9999/categories")
            .then(res => res.json())
            .then(result => setCategories(result))
        fetch(`http://localhost:9999/products?id=${pId}`)
            .then(res => res.json())
            .then(result => setProduct(result[0]))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", product.id);
        formData.append("Name", e.target.Name.value);
        formData.append("Price", e.target.Price.value);
        formData.append("CatID", e.target.CatID.value);
        formData.append("quantity", product.quantity);
        formData.append("createDate",product.createDate);
        formData.append("status", e.target.status.checked);

        formData.append("image", product.image);
        // Thêm hình ảnh vào formData nếu có thay đổi
        // if (image) {
        //     formData.append("image", image);
        // } else {
        //     formData.append("image", product.image);
        // }

        const response = await fetch(`http://localhost:9999/products/${pId}`, {
            method: "PUT",
            body: formData
        });
        const result = await response.json();
        if (response.ok) {
            alert("Product updated successfully");
            navigate("/admin/products");
        } else {
            alert("Failed to update product");
        }
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Lưu trữ hình ảnh mới khi người dùng chọn
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Link to="/admin/products"> Back to List </Link>
                </Col>
            </Row>
            <Row>
                <Col xs="2" style={{ justifyContent: 'center', textAlign: 'left' }}>
                    <img src={product?.image} className="card-img-top" style={{ width: '100%' }} />
                    <input type="file" onChange={handleImageChange} />
                </Col>
                <Col xs="10" style={{ justifyContent: 'center', textAlign: 'left' }}>
                    <Form onSubmit={handleSubmit}>
                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="2" style={{ justifyContent: 'center', textAlign: 'left' }}> ID: </Col>
                            <Col>
                                <Form.Group as={Col} md="12" controlId="formGridProductId">
                                    <Form.Control type="text" placeholder="ID" defaultValue={product?.id} name="id" readOnly />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="2" style={{ justifyContent: 'center', textAlign: 'left' }}> Name: </Col>
                            <Col>
                                <Form.Group as={Col} md="12" controlId="formGridProductName">
                                    <Form.Control type="text" placeholder="Name" defaultValue={product?.Name} name="Name" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="2" style={{ justifyContent: 'center', textAlign: 'left' }}> Price : </Col>
                            <Col>
                                <Form.Group as={Col} md="12" controlId="formGridProductPrice">
                                    <Form.Control type="text" placeholder="Price" defaultValue={product?.Price} name="Price" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="2" style={{ justifyContent: 'center', textAlign: 'left' }}> Category : </Col>
                            <Col>
                                <Form.Group as={Col} md="12" controlId="formGridProductCategory">
                                    <Form.Control as="select" defaultValue={product?.CatID} name="CatID">
                                        {
                                            categories.map(c => <option key={c.id} value={c.id}>{c.catName}</option>)
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="2" style={{ justifyContent: 'center', textAlign: 'left' }}> Quantity: </Col>
                            <Col>
                                <Form.Group as={Col} md="12" controlId="formGridProductId">
                                    <Form.Control type="text" placeholder="Quantity" defaultValue={product?.quantity} name="quantity" readOnly />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="2" style={{ justifyContent: 'center', textAlign: 'left' }}> Create Date: </Col>
                            <Col>
                                <Form.Group as={Col} md="12" controlId="formGridProductId">
                                    <Form.Control type="text" placeholder="createDate" defaultValue={product?.createDate} name="createDate" readOnly />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row style={{ margin: '10px 0px' }}>
                            <Col md="2" style={{ justifyContent: 'center', textAlign: 'left' }}> Status: </Col>
                            <Col>
                                <Form.Group as={Col} md="2" controlId="formGridProductStatus">
                                    <Form.Check type="checkbox" label="Is stock" defaultChecked={product?.status} name="status" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row style={{ margin: '10px 0px' }}>
                            <Col md={{ span: 10, offset: 2 }}>
                                <Button type="submit">Update</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
