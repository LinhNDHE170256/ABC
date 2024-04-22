//tao mới 1 component đặt tên là product -> list ra danh sách các product
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";

export default function ProductList() {
    //tạo 1 biến trạng thái để quản lý trạng thái dữ liêu của data
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [cate, setCate] = useState(0);
    const { cate_id,id } = useParams();

    useEffect(() => {
        fetch("http://localhost:9999/categories")
            .then(res => res.json())
            .then(result => setCategories(result))

        fetch(`http://localhost:9999/products`)
            .then(res => res.json())
            .then(result => {
                let searchResult = [];
                    searchResult = result.filter(p => p.Name.toLowerCase().includes(search.toLowerCase()));
                
                setProduct(searchResult);
            })
        
    }, [cate, search, cate_id])


    return (
        <Container fluid>
            <Row style={{ justifyContent: 'center', margin: '20px' }}>

                <Col xs={6}>
                    <Form.Control
                        type='text'
                        placeholder="Enter to search"
                        style={{ border: "1px solid black" }}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>

                <Col xs={3} style={{ textAlign: 'right' }}>
                    <Link to="/admin/product/create"> create product </Link>
                </Col>
            </Row>
            <Table className="col-12" hover striped   >

                <thead className="text-center">
                    <tr>
                        <th style={{ border: '1px solid black' }}>ID</th>
                        <th style={{ border: '1px solid black' }}>Name</th>
                        <th style={{ border: '1px solid black' }}>Price</th>
                        <th style={{ border: '1px solid black' }}>Category</th>
                        <th style={{ border: '1px solid black' }}>Quantity</th>
                        <th style={{ border: '1px solid black', width: '200px' }}>Image</th>
                        <th style={{ border: '1px solid black' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {product.length === 0 ?
                        <tr style={{ border: '1px solid black' }}>
                            <td colSpan={"5"} style={{ border: '1px solid black', textAlign: 'center' }} >No product have been founded</td>
                        </tr>
                        :
                        product.map(p => {
                            const cat = categories.find(c => c.id == p.CatID);
                            return (
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black' }}>{p?.id}</td>
                                    <td style={{ border: '1px solid black' }}>{p?.Name}</td>
                                    <td style={{ border: '1px solid black' }}>{p?.Price}</td>
                                    <td style={{ border: '1px solid black' }}>{cat?.catName}</td>
                                    <td style={{ border: '1px solid black' }}>{p?.quantity}</td>
                                    <img src={p.image} className="card-img-top" style={{ width: '100%' }} />
                                    <td style={{ border: '1px solid black', textAlign: 'center' }}>
                                        <Link to={`/admin/product/edit/${p?.id}`} className="btn btn-success">Edit</Link>{" "}
                                        <Link to={`/admin/product/delete/${p?.id}`} className="btn btn-danger">Delete</Link>{" "}
                                    </td>
                                </tr>
                            )
                        }
                        )
                    }
                </tbody>
            </Table>
        </Container>

    );
}

