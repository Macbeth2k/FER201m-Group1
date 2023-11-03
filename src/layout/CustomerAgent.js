import { Outlet } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Sidebar from "../global/CA_SideBar";
import Menu from "../global/CA_Menu";
import CA_Profile from '../global/CA_Profile';
import { createContext, useContext, useState } from "react";

export const userContext = createContext();

export default function CustomerAgent() {
    const [indexUser, setUser] = useState({});

    const setIndexHandler = (value) => {
        setUser(value)
    }

    const index = indexUser

    return (
        <userContext.Provider value={index}>
            <main style={{ backgroundColor: '#CDC4F9', height: '100vh' }}>
                <Container fluid className='py-3'>
                    <Row>
                        <Col md={12}>
                            <Card id='chat3' style={{ borderRadius: '15px', height: '95vh', paddingBottom: 0 }}>
                                <Card.Body>
                                    <Row>
                                        <Col className='' md={6} lg={5} xl={4}>
                                            <Sidebar index={indexUser} changeIndex={setIndexHandler} />
                                            <hr style={{ margin: 3 }} />
                                            <div>
                                                <CA_Profile account={
                                                    {
                                                        "id": 3,
                                                        "fname": "Shigure",
                                                        "lname": "Ui",
                                                        "role": "customer-agent",
                                                        "cart": [1],
                                                        "orders": [3],
                                                        "avatar": "https://i.imgur.com/fnkEnGgh.jpg",
                                                        "active": "normal"
                                                    }
                                                } />
                                            </div>
                                        </Col>
                                        <Col md={6} lg={7} xl={8}>
                                            <Container fluid className=''>
                                                <Menu index={indexUser} />
                                                <hr />
                                                <div style={{ height: '78vh', overflowY: 'auto' }}>
                                                    <Outlet index={indexUser} />
                                                </div>
                                            </Container>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </main>
        </userContext.Provider>
    )
}