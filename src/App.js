import { Container, Row, Col } from 'react-bootstrap';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Home from './components/Home';
import Product from './components/Products';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProductList from './components/ProductList';
import Categories from './components/ExtraMenu';
import ProductDelete from './components/ProductDelete';
import ProductEdit from './components/ProductEdit';
import CreateProduct from './components/CreateProduct';
import Cart from './components/Cart';
import VerifyOrder from './components/VerifyOrder';
import CheckOut from './components/CheckOut';


function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/products")
      .then(res => res.json())
      .then(result => setProducts(result))
    fetch("http://localhost:9999/categories")
      .then(res => res.json())
      .then(result => setCategories(result))
  }, [])

  const user = JSON.parse(localStorage.getItem('user'));

  
function AreNotAdmin() {
  alert(`You are not admin`);
  return <Navigate to="/" />;
}

  return (
    <Container fluid >
      <Row>
        <Header />
      </Row>
      <Row>
        <Col>
          <BrowserRouter>
            <Row>
              <Col xs={12} sm={3} md={5} lg={2}>
                <Categories data={categories} />
              </Col>
              <Col xs={12} sm={9} md={7} lg={10}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Product data={products} />} />
                  <Route path="/product/:pId" element={<ProductDetail />} />
                  <Route path="/product/category/:cate_id" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/auth/Sign-up" element={<SignUp />} />
                  <Route path="/auth/Sign-in" element={<SignIn />} />
                  <Route path="/cart/VerifyOrder" element={<VerifyOrder />} />
                  <Route path="/cart/CheckOut" element={<CheckOut />} />
                  
                  {user && user.role === 'admin' ? (
                    <>
                      <Route path="/admin/products" element={<ProductList />} />
                      <Route path="/admin/product/delete/:pId" element={<ProductDelete />} />
                      <Route path="/admin/product/edit/:pId" element={<ProductEdit />} />
                      <Route path="/admin/product/create" element={<CreateProduct />} />
                    </>
                  ) : (
                    <Route path="/admin/*" element={<AreNotAdmin />} />  
                  )}
                </Routes>
              </Col>
            </Row>
          </BrowserRouter>
        </Col>
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  );
}

export default App;
