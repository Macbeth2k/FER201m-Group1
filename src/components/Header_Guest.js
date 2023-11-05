import { Navbar, Nav, Container, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { MDBIcon, MDBBadge } from 'mdb-react-ui-kit';

export default function Header_Guest() {
    const navigate = useNavigate()

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" >
                <Container>
                    <Col md={1}>
                        <Navbar.Brand href="" onClick={() => navigate('/')}>
                            <img
                                alt=""
                                src="/img/logo.svg"
                                width="90"
                                height="90"
                                className="d-inline-block align-top"
                            />{' '}
                        </Navbar.Brand>

                    </Col>
                    <Col md={3}>
                        <Navbar.Brand onClick={() => navigate('/')} className="h1">Racket Shop</Navbar.Brand>
                    </Col>
                    <Col >
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" >
                            <Nav className="me-auto">
                                <Link to="/" className="h4 px-5"> Home</Link>

                                <Link to="/products" className="h4 px-3"> Rackets</Link>
                                <Link to="/#!" className="h4 px-3"> Contact</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>
                    <Col md={2}>
                        <Container>
                            <Row>
                                <Col>
                                    <Link to={`http://localhost:3000/login`} className="h5" > <a className='mx-3' href='#!'>
                                        <MDBIcon fas icon="shopping-cart" size='lg' />
                                        <MDBBadge color='danger' notification pill>
                                            0
                                        </MDBBadge>
                                    </a></Link>
                                </Col>
                                <Col >
                                    <Link to="http://localhost:3000/login" className="h4">  <MDBIcon fas icon="sign-in-alt" /></Link>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Container>
            </Navbar>
        </>
    )
}