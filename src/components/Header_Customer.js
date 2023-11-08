import { Navbar, Nav, Container, Col, Row, NavDropdown, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { MDBBadge, MDBIcon } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Header_Guest() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const account = useSelector(state => state.user.account)
    const [currentAccount, setCurrentAccount] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3004/accounts/${account.id}`)
            .then(res => setCurrentAccount(res.data))
    }, [account])

    const handleLogOut = () => {
        dispatch({
            type: 'LOGOUT_ACCOUNT',
            payload: false
        })
        navigate('/login')
    }



    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" >
                <Container>
                    <Col md={1}>
                        <Navbar.Brand onCLick={() => navigate('/')}>
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
                        <Navbar.Brand href="" onCLick={() => navigate('/')} className="h1">Racket Shop</Navbar.Brand>
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
                    <Col xs={3}>
                        <Row>
                            <Col xs={2}>
                                <img
                                    className='rounded-4 shadow-4'
                                    src={account.avatar}
                                    alt='Avatar'
                                    style={{ width: '50px', height: '50px' }}
                                />
                            </Col>
                            <Col>
                                <NavDropdown className="h6 px-3" title={`${account.fname} ${account.lname}`} id="collapsible-nav-dropdown">
                                    <NavDropdown.Item>
                                        <Link to="/" className="h6 px-3">My profile</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link to="/" className="h6 px-3">My services</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item className="h6 px-3">
                                        <Button onClick={handleLogOut} className="w-100" variant="primary" size="sm">
                                            Log out
                                        </Button>
                                    </NavDropdown.Item>
                                </NavDropdown>

                            </Col>
                            <Col >
                                <Link to={`http://localhost:3000/cart`} className="h5" > <a className='mx-3' href='#!'>
                                    <MDBIcon fas icon="shopping-cart" size='lg' />
                                    <MDBBadge color='danger' notification pill>
                                        {currentAccount.cart?.length}
                                    </MDBBadge>
                                </a></Link>
                            </Col>

                        </Row>
                    </Col>
                    {/* <Col xs={1}><Link to={`http://localhost:3000/cart`} className="h4" ><BsFillCartCheckFill /></Link></Col> */}

                </Container>
            </Navbar>
        </>
    )
}