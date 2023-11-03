

import { NavDropdown, Navbar, Nav, Container, Col, Row, Button } from 'react-bootstrap'
import { BsFillCartCheckFill } from "react-icons/bs";
import { SlLogin } from "react-icons/sl";
import { Link } from 'react-router-dom'


export default function Header_Guest() {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" >
                <Container>
                    <Col md={1}>
                        <Navbar.Brand href="/">
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
                        <Navbar.Brand href="/" className="h1">Racket Shop</Navbar.Brand>
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
                    <Col md={1}>
                        <Container>
                            <Row>
                                <Col className="h4"> <a href="\#!"><BsFillCartCheckFill /></a></Col>
                                <Col className="h4"> <a href="\#!"><SlLogin /></a></Col>
                            </Row>
                        </Container>
                    </Col>
                </Container>
            </Navbar>
        </>
    )
}