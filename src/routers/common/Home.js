import React from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
    MDBRipple
} from 'mdb-react-ui-kit';

import { Container, Row, Col, Carousel } from 'react-bootstrap'
import axios from 'axios'
import { useEffect, useState } from 'react'


export default function Home() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])

    const instance = axios.create({
        baseURL: 'http://localhost:3004',
        timeout: 1000,
        headers: { 'X-Custom-Header': 'foobar' }
    });
    useEffect(() => {
        instance.get('/products')
            .then(res => setProducts(res.data))
    }, [])
    useEffect(() => {
        instance.get('/brands')
            .then(res => setBrands(res.data))
    }, [])

    useEffect(() => {
        instance.get('/categories')
            .then(res => setCategories(res.data))
    }, [])


    console.log(products)
    return (
        <>
            <div
                className='p-5 text-center bg-image'
                style={{ height: 300 }}
            >
                <div className='mask' style={{
                    'backgroundColor': 'rgba(0, 0, 0, 0.05)'
                }}>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <div className='text-black'>
                            <p className='mb-3 font-monospace fw-bold fs-1'>Homepage</p>
                        </div>
                    </div>
                </div>
            </div >
            <Container>
                <Row className="mt-5"   >
                    <Col >
                        <Carousel data-bs-theme="dark">
                            {

                                products.map((product, index) => {
                                    return (
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={product.thumbnail}
                                                alt="product"
                                            />
                                            <Carousel.Caption>
                                                <h5>{product.name}</h5>
                                                <p>{product.description}</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    )
                                })
                            }
                        </Carousel>
                    </Col>

                </Row>
                <Row className="mt-5">
                    <Col>
                        <div className="d-flex justify-content-center fs-1 fw-bold">Featured Category</div>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                        {
                            categories.map((category) => {
                                return (
                                    <MDBCol>
                                        <MDBCard>
                                            <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                                                <MDBCardImage src={category.thumbnail} fluid alt='...' />
                                                <a>
                                                    <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                                                </a>
                                            </MDBRipple>
                                            <MDBCardBody>
                                                <MDBCardTitle>{category.name}</MDBCardTitle>
                                                <MDBCardText>
                                                    {category.description}
                                                </MDBCardText>
                                                <MDBBtn href='/#!'>Find out now</MDBBtn>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                )
                            })
                        }


                    </MDBRow>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <div className="d-flex justify-content-center fs-1 fw-bold">Featured Brands</div>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                        {
                            brands.map((brand) => {
                                return (
                                    <MDBCol >
                                        <MDBCard>
                                            <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                                                <MDBCardImage src={brand.thumbnail} fluid alt='...' />
                                                <a>
                                                    <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                                                </a>
                                            </MDBRipple>
                                            <MDBCardBody>
                                                <MDBCardTitle>{brand.name}</MDBCardTitle>
                                                <MDBCardText>
                                                    {brand.description}
                                                </MDBCardText>
                                                <MDBBtn href='/#!'>Find out now</MDBBtn>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                )
                            })
                        }


                    </MDBRow>
                </Row>
                <Row className="my-5">
                    <Col>
                        <div className="d-flex fs-1 fw-bold">New Badminton Rackets</div>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <MDBRow className='row-cols-1 row-cols-md-3 g-4'>

                        {
                            products.map((product) => {
                                return (
                                    <>
                                        <MDBCol>
                                            <MDBCard>
                                                <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                                                    <MDBCardImage src={product.image} fluid alt='new product' />
                                                    <a>
                                                        <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                                                    </a>
                                                </MDBRipple>
                                                <MDBCardBody>
                                                    <MDBCardTitle>{product.name}</MDBCardTitle>
                                                    <MDBCardText>
                                                        {product.description}
                                                    </MDBCardText>
                                                    <MDBBtn href='#'>Buy now</MDBBtn>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    </>
                                )
                            })
                        }

                    </MDBRow>
                </Row>
            </Container >
        </>
    )
}