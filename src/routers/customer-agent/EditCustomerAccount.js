import { Container, Row, Col, Card } from 'react-bootstrap';

export default function EditCustomerAccount() {
    return (
        <section style={{ backgroundColor: '#f4f5f7' }}>
 
                    <Col lg={12} className="mb-4 mb-lg-0">
                        <Card className="mb-3" style={{ borderRadius: '.5rem' }}>
                            <Row className="g-0">
                                <Col md={4} className="gradient-custom text-center text-white" style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" className="img-fluid my-5" style={{ width: '80px' }} />
                                    <h5>Marie Horwitz</h5>
                                    <p>Web Designer</p>
                                    <i className="far fa-edit mb-5"></i>
                                </Col>
                                <Col md={8}>
                                    <Card.Body className="p-4">
                                        <h6>Information</h6>
                                        <hr className="mt-0 mb-4" />
                                        <Row className="pt-1">
                                            <Col sm={6} className="mb-3">
                                                <h6>Email</h6>
                                                <p className="text-muted">info@example.com</p>
                                            </Col>
                                            <Col sm={6} className="mb-3">
                                                <h6>Phone</h6>
                                                <p className="text-muted">123 456 789</p>
                                            </Col>
                                        </Row>
                                        <h6>Projects</h6>
                                        <hr className="mt-0 mb-4" />
                                        <Row className="pt-1">
                                            <Col sm={6} className="mb-3">
                                                <h6>Recent</h6>
                                                <p className="text-muted">Lorem ipsum</p>
                                            </Col>
                                            <Col sm={6} className="mb-3">
                                                <h6>Most Viewed</h6>
                                                <p className="text-muted">Dolor sit amet</p>
                                            </Col>
                                        </Row>
                                        
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
 
        </section>
    );
}