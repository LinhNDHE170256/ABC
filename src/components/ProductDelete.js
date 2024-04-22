import { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useParams, useNavigate } from "react-router-dom";

export default function ProductDelete() {

  const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const { pId } = useParams();

    useEffect(() => {
        fetch("http://localhost:9999/categories")
            .then(res => res.json())
            .then(result => setCategories(result))
        fetch(`http://localhost:9999/products?id=${pId}`)
            .then(res => res.json())
            .then(result => setProduct(result))
    }, [])

    const deleteProduct = (pId) => {
        fetch(`http://localhost:9999/products/${pId}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(result => {
                alert("Product deleted successfully");
                window.location.href = "/admin/products";
            })
    }
    
    deleteProduct(pId);
    return (
        <Container fluid>
            <Row>
                <Col>
                </Col>
            </Row>
            
        </Container>
    )
}



