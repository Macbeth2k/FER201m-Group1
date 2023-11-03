import { Container, Row, Col, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBBtn,
    MDBRipple,
    MDBInputGroup,
    MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem
} from "mdb-react-ui-kit";
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function Products() {
    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3004/products')
            .then(function (response) {
                // handle success
                setProducts([...response.data]);
            })
    }, [])
    useEffect(() => {
        axios.get('http://localhost:3004/brands')
            .then(function (response) {
                setBrands([...response.data]);
            })
    }, [])


    const getBrandName = (brandId) => {
        if (brandId === null || brandId === "" || brandId === undefined) {
            return ""
        }
        else {
            let b = brands.filter((brand) => {
                return brand.id === brandId
            })
            if (b.length > 0) {
                return b[0].name;
            } else {
                return "";
            }
        }
    }

    return (
        <>
            <div
                className='p-5 text-center bg-image'
                style={{ height: 300 }}
            >
                <div className='mask' style={{
                    'background-color': 'rgba(0, 0, 0, 0.05)'
                }}>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <div className='text-black'>
                            <p className='mb-3 font-monospace fw-bold fs-1 '>List Product</p>
                        </div>
                    </div>
                </div>
            </div >

            <Container className="mt-5">
                <Row>
                    <Col xs={3}>
                        <Container>
                            <Row>
                                <h2>Filter</h2>
                            </Row>

                        </Container>
                    </Col>
                    <Col xs={3}>
                        <MDBDropdown className="w-100">
                            <MDBDropdownToggle>Short By</MDBDropdownToggle>
                            <MDBDropdownMenu>
                                <MDBDropdownItem link>Name</MDBDropdownItem>
                                <MDBDropdownItem link>Price ascending</MDBDropdownItem>
                                <MDBDropdownItem link>Price descending</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </Col>
                    <Col>
                        <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>
                            <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' />
                            <MDBBtn outline>Search</MDBBtn>
                        </MDBInputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>

                        <Container>
                            <Row>
                                <h4>Choose price</h4>
                            </Row>
                            <Row>
                                <Col>

                                    <div className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Under 1M VNĐ"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>

                                    <div className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Between 1M - 1M5 VNĐ"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>

                                    <div className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="between 1M5 - 3M VNĐ"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>

                                    <div className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Upper 3M VNĐ"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <Row>
                                <h4>Brands</h4>
                            </Row>
                            {

                                brands.map((brand) => {
                                    return (
                                        <Row key={brand.id}>
                                            <Col>
                                                <div className="mb-3">
                                                    <Form.Check
                                                        type="checkbox"
                                                        label={brand.name}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    )
                                })
                            }


                        </Container>
                        <Container>
                            <Row>
                                <h4>Colors</h4>
                            </Row>
                            <Row>
                                <Col>

                                    <div className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Under $25"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>

                                    <div className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Under $25"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>

                                    <div className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Under $25"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>

                                    <div className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Under $25"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <Row>
                                <h4>Weight</h4>
                            </Row>
                            <Row>
                                <Col>

                                    <div className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Under $25"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>

                                    <div className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Under $25"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>

                                    <div className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Under $25"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>

                                    <div className="mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            label="Under $25"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col>

                        <MDBContainer fluid className="my-5 text-center">
                            <MDBRow>
                                {
                                    products.map((product) => {
                                        return (
                                            <MDBCol md="12" lg="4" className="mb-4" key={product.id}>
                                                <MDBCard>
                                                    <MDBRipple
                                                        rippleColor="light"
                                                        rippleTag="div"
                                                        className="bg-image rounded hover-zoom"
                                                    >
                                                        <MDBCardImage
                                                            src={product.image}
                                                            fluid
                                                            className="w-100"
                                                        />
                                                        <Link to={`http://localhost:3000/products/${product.id}`}>
                                                            <div className="mask">
                                                                <div className="d-flex justify-content-start align-items-end h-100">
                                                                    <h5>
                                                                        <span className="badge bg-primary ms-2">New</span>
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                            <div className="hover-overlay">
                                                                <div
                                                                    className="mask"
                                                                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                                ></div>
                                                            </div>
                                                        </Link>
                                                    </MDBRipple>
                                                    <MDBCardBody>
                                                        <Link to={`http://localhost:3000/products/${product.id}`} className="text-reset">
                                                            <h5 className="card-title mb-3">{product.name}</h5>
                                                        </Link>
                                                        <Link to={`http://localhost:3000/products/${product.id}`} className="text-reset">
                                                            <p>{getBrandName(product.brand)}</p>
                                                        </Link>
                                                        <h6 className="mb-3">${product.price}</h6>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                        )
                                    })

                                }
                            </MDBRow>


                        </MDBContainer>
                    </Col>
                </Row>
            </Container>
        </>
    )
}