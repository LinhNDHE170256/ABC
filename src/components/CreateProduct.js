import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CreateProduct({ categories = [] }) {
    const [products, setProduct] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:9999/products`)
            .then(res => res.json())
            .then(result => setProduct(result))
    }, [])

    const [formData, setFormData] = useState({
        id: '',
        Name: '',
        Price: '',
        quantity: '',
        createDate: '',
        CatID: '',
        status: true,
    });

    const [formErrors, setFormErrors] = useState({
        id: '',
        Name: '',
        Price: '',
        quantity: '',
        createDate: '',
        CatID: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!formData.id) {
            errors.id = "Id cannot be empty.";
        } else if (!formData.id.match(/^P\d{3}$/)) {
            errors.id = "Invalid Id format. It should be PXXX.";
        } else if (products.some(product => product.id === formData.id)) {
            errors.id = "Id must be unique.";
        }

        if (!formData.Name.trim()) {
            errors.Name = "Name cannot be empty.";
        }

        if (isNaN(parseFloat(formData.Price)) || parseFloat(formData.Price) < 0) {
            errors.Price = "Price must be a non-negative number.";
        }

        if (isNaN(parseInt(formData.quantity)) || parseInt(formData.quantity) < 0) {
            errors.quantity = "Quantity must be a non-negative integer.";
        }

        if (!formData.createDate) {
            errors.createDate = "Please select a date.";
        } else {
            const now = new Date();
            const selectedDate = new Date(formData.createDate);
            if (selectedDate <= now) {
                errors.createDate = "Created at must be a date later than today.";
            }
        }

        if (!formData.CatID) {
            errors.CatID = "Please select a category.";
        }

        setFormErrors(errors);
        if (Object.keys(errors).length > 0) {
            return;
        }

        try {
            const response = await fetch('http://localhost:9999/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    Price: `${formData.Price}$`, // Format price as X$
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to create product.');
            }
            alert('Product created successfully.');
            setTimeout(() => {
                window.location.href = "/admin/products";
            }, 100);
        } catch (error) {
            alert('Failed to create product.');
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col style={{ justifyContent: 'center', textAlign: 'center' }}>
                    <h3> Create Product </h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to="/admin/products"> Back to products list </Link>
                </Col>
            </Row>
            <Form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key, index) => (
                    <Row key={index} style={{ margin: '10px 0px' }}>
                        <Col xs={2} style={{ justifyContent: 'center', textAlign: 'left' }}>
                            {key.charAt(0).toUpperCase() + key.slice(1)} {key === 'id' ? '(*)' : ''}
                        </Col>
                        <Col xs={10}>
                            {key === 'CatID' ? (
                                <Form.Select
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.catName}</option>
                                    ))}
                                </Form.Select>
                            ) : key === 'status' ? (
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name={key}
                                        checked={formData[key]}
                                        onChange={handleChange}
                                    />
                                </div>
                            ) : (
                                <Form.Control
                                    type={key === 'quantity' || key === 'Price' ? 'number' : key === 'createDate' ? 'date' : 'text'}
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                />
                            )}
                            <Form.Text style={{ color: "red" }}>{formErrors[key]}</Form.Text>
                        </Col>
                    </Row>
                ))}
                <Row style={{ margin: '10px 0px' }}>
                    <Col style={{ justifyContent: 'center', textAlign: 'left' }}>
                        <Button variant="primary" type="submit">Create</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
