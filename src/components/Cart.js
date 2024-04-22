import { useState, useEffect, useNavigate } from "react";
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';



export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };

  const totalProductPrice = () => {
    let totalPrice = 0;
    cart.forEach(item => {
      const price = parseFloat(item.Price.replace('$', ''));
      totalPrice += price * item.quantity;
    });
    return totalPrice;
  };

  const finalPrice = () => {
    const totalPrice = totalProductPrice();
    return totalPrice * 1.08;
  };

  const Buy = (e) => {
    //alert("Thank you for shopping with us!");
    e.preventDefault();
    window.location.href = '/cart/VerifyOrder'; 
  };


  return (
    <Container fluid>
      <Row xs={3} md={6} className="justify-content-end" style={{ margin: '10px' }} >
        <Button onClick={handleClearCart}>Clear Cart</Button>
      </Row>
      <Row>
      <Form onSubmit={Buy}> 
        <Table className="col-12" hover striped   >

          <thead className="text-center">
            <tr>
              <th style={{ border: '1px solid black' }}>ID</th>
              <th style={{ border: '1px solid black' }}>Name</th>
              <th style={{ border: '1px solid black' }}>Price</th>
              <th style={{ border: '1px solid black', width: '170px' }}>Image</th>
              <th style={{ border: '1px solid black' }}>Quantity</th>
              <th style={{ border: '1px solid black' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 ?
              <tr style={{ border: '1px solid black' }}>
                <td colSpan={"5"} style={{ border: '1px solid black', textAlign: 'center' }} >Cart empty</td>
              </tr>
              :
              cart.map(c => {
                const price = parseFloat(c.Price.replace('$', ''));
                const total = price * c.quantity;
                return (
                  <tr key={c.id} style={{ border: '1px solid black' }}>
                    <td style={{ border: '1px solid black' }}>{c.id}</td>
                    <td style={{ border: '1px solid black' }}>{c.Name}</td>
                    <td style={{ border: '1px solid black' }}>{c.Price}</td>
                    <td style={{ border: '1px solid black' }}><img src={c.image} alt={c.Name} style={{ width: '100%' }} /></td>
                    <td style={{ border: '1px solid black' }}>{c.quantity}</td>
                    <td style={{ border: '1px solid black' }}>{total}$</td>
                  </tr>
                )
              }
              )
            }
          </tbody>
        </Table>
        <Row>
          <Col className="text-right">VAT: 8%</Col>
        </Row>
        <Row>
          <Col className="text-right">Total: {finalPrice()} $</Col>
        </Row>
        <Button type="submit" style={{ margin: '10px' }}>Verify Order</Button>
        </Form>
      </Row>

    </Container>
  );
}
