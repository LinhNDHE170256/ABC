import { Col, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function Categories({ data = [] }) {

    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user && user.role === 'admin';

    return (
        <Col>
            {isAdmin ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Link to="/admin/products">Products</Link></td>
                        </tr>
                        <tr>
                            <td><Link to="#">Category</Link></td>
                        </tr>
                        <tr>
                            <td><Link to="#">Menubars</Link></td>
                        </tr>
                    </tbody>
                </Table>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Categories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(c => (
                            <tr key={c.id}>
                                <td><Link to={`/product/category/${c.id}`}>{c?.catName}</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    );
}
