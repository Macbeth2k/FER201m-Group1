import { Row, Col, Image, ButtonGroup, Button } from 'react-bootstrap';
import '../css/CA_Menu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faBagShopping, faComments, faComment } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react'
import { userContext } from '../layout/CustomerAgent';
import { useState, useEffect } from 'react';

export default function Menu() {
    const {indexUser, setIndexHandler} = useContext(userContext)
    const location = useLocation();
    const [selectedBtn, setSelectedBtn] = useState(); 
    useEffect(() => {
        if (location.pathname.endsWith('/deliveries')) {
            setSelectedBtn(1);
        } else if (location.pathname.endsWith('/orders')) {
            setSelectedBtn(2);
        } else if (location.pathname.endsWith('/comments')) {
            setSelectedBtn(3);
        } else if (location.pathname.endsWith('/messages')) {
            setSelectedBtn(4);
        } else if (location.pathname.endsWith('/account')) {
            setSelectedBtn();
        }
    }, [location.pathname]);
    return (
        <div className="chat-header clearfix">
            <Row>
                <Col lg={6}>
                    <div className="chat-about">
                        <Link to={`${indexUser.id}/account`} style={{ color: 'inherit', fontWeight: 'bold' }}>
                            <Image
                                src={indexUser.avatar}
                                className="d-flex align-self-start me-3"
                                width="55px"
                                height="55px"
                                style={{ objectFit: 'fill', borderRadius: '50%', float: 'left' }}
                            />
                            <h6 className="m-b-0" style={{ fontWeight: 'bold' }}>{indexUser.fname + ' ' + indexUser.lname}</h6>
                        </Link>
                        <small>Last seen: 2 hours ago</small>
                    </div>
                </Col>

                <Col lg={6} className="hidden-sm">
                    <ButtonGroup style={{ float: 'right', boxShadow: 'none' }}>
                        <Link to={`${indexUser.id}/deliveries`}>
                            <Button variant={selectedBtn === 1 ? 'primary' : 'outline-primary'}>
                                <FontAwesomeIcon icon={faTruck} />
                            </Button>
                        </Link>
                        <Link to={`${indexUser.id}/orders`}>
                            <Button variant={selectedBtn === 2 ? 'success' : 'outline-success'}>
                                <FontAwesomeIcon icon={faBagShopping} />
                            </Button>
                        </Link>
                        <Link to={`${indexUser.id}/comments`}>
                            <Button variant={selectedBtn === 3 ? 'info' : 'outline-info'}>
                                <FontAwesomeIcon icon={faComments} />
                            </Button>
                        </Link>
                        <Link to={`${indexUser.id}/messages`}>
                            <Button variant={selectedBtn === 4 ? 'warning' : 'outline-warning'}>
                                <FontAwesomeIcon icon={faComment} />
                            </Button>
                        </Link>
                    </ButtonGroup>
                </Col>
            </Row>
        </div>
    );
}