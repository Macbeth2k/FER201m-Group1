import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBIcon,
    MDBRipple,
    MDBBtn,
    MDBTypography,
    MDBCardFooter,
    MDBTextArea
} from "mdb-react-ui-kit";
import { Container, Row, Col } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';


import axios from 'axios'

export default function ProductDetail() {
    const instance = axios.create({
        baseURL: 'http://localhost:3004',
        timeout: 1000,
        headers: { 'X-Custom-Header': 'foobar' }
    })

    const dispatch = useDispatch()

    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([])
    const [comments, setComments] = useState([])
    const [account, setAccount] = useState([])


    const navigate = useNavigate()
    const currentAccount = useSelector(state => state.user.account)

    useEffect(() => {
        instance.get(`/accounts/${currentAccount.id}`)
            .then(response => setAccount(response.data))
    }, [currentAccount.id])

    useEffect(() => {
        instance.get(`/products/${id}`)
            .then(response => setProduct(response.data))
    }, [id])

    useEffect(() => {
        instance.get('/comments')
            .then(response => response.data)
            .then(res => {
                setComments(res.filter(comment => {
                    return comment.product === +id
                }))
            })
    }, [])

    useEffect(() => {
        instance.get('/products')
            .then(response => response.data)
            .then(response => {
                const filteredProducts = response.filter(p => {
                    return p.category === product.category && p.id !== product.id;
                })
                setProducts(filteredProducts);
            })
    }, [product]);

    useEffect(() => {
        instance.get('/brands')
            .then(response => response.data)
            .then(res => {
                setBrands(res)
            })
    }, [])

    const getBrandName = useCallback((brandId) => {
        const brand = brands.find(brand => brand.id === brandId)
        return brand ? brand.name : "Cannot find brand"
    }, [brands]);

    const handleCart = () => {
        let currentCart = account.cart.find((c) => {
            return c?.productId === product.id
        })
        if (currentCart !== undefined) {
            let newAccountCart = account.cart.filter((cart) => {
                return cart != currentCart
            })
            ++currentCart.quantity
            dispatch({
                type: 'FETCH_USER_LOGIN_SUCCESS',
                payload: account
            })
            return [currentCart, ...newAccountCart]
        } else {
            let newCart = {
                productId: product?.id,
                quantity: 1
            }
            dispatch({
                type: 'FETCH_USER_LOGIN_SUCCESS',
                payload: account
            })
            return [newCart, ...account.cart]
        }
    }

    const handleAddToCart = () => {
        axios.put(`http://localhost:3004/accounts/${account.id}`, {
            ...account,
            'cart': handleCart()
        })
        toast.success("Add to cart success!", {
            theme: 'colored',
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }


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
                            <p className='mb-3 font-monospace fw-bold fs-1'>Product Detail</p>
                        </div>
                    </div>
                </div>
            </div >
            <Container className="my-5">
                <Row>
                    <Col xs={6} >
                        <MDBCard className="text-black" >
                            <MDBIcon fas icon="archive" size="lg" className="px-3 pt-3 pb-2" />
                            <MDBCardImage
                                src={product.image}
                                position="top"
                                alt="Apple Computer"
                            />
                            <MDBCardBody>
                                <div className="text-center">
                                    <MDBCardTitle>{getBrandName(product.brand)}</MDBCardTitle>
                                    <p className="text-muted mb-4">{product.name}</p>
                                </div>
                                <div>

                                    <div className="d-flex justify-content-between">
                                        <span>Color:</span>
                                        <span>{product.color}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Weight:</span>
                                        <span>{product.weight}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Balance:</span>
                                        <span>{product.balance}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Category:</span>
                                        <span>{product.category}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Skill level:</span>
                                        <span>{product.skill_lv}</span>
                                    </div>
                                </div>

                            </MDBCardBody>

                        </MDBCard>
                    </Col>
                    <Col>
                        <MDBCol className="bg-grey">

                            <div className="px-5">
                                <MDBTypography tag="h2" className="fw-bold mb-5 mt-2 pt-1">
                                    {product.name}
                                </MDBTypography>

                                <MDBTypography note noteColor='secondary' >
                                    {product.description}
                                </MDBTypography>
                                <MDBTypography note noteColor='secondary'>
                                    {product.sub_description}
                                </MDBTypography>
                                <hr className="my-4" />

                                <div className="d-flex justify-content-between mb-5">
                                    <MDBTypography tag="h5" className="text-uppercase">
                                        Total price
                                    </MDBTypography>
                                    <MDBTypography tag="h5">${product.price}</MDBTypography>
                                </div>

                                <MDBBtn color="dark" block size="lg" onClick={handleAddToCart}>
                                    Add to cart
                                </MDBBtn>
                                <ToastContainer />
                            </div>
                        </MDBCol>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <div className="d-flex fs-1 fw-bold">Comment</div>
                    </Col>
                </Row>
                <Row>
                    <MDBContainer className="py-5" >
                        <MDBRow className="justify-content-center">
                            <MDBCol>
                                <MDBCard>
                                    <MDBCardBody className="p-4">
                                        <MDBTypography tag="h4" className="mb-0">
                                            Recent comments
                                        </MDBTypography>
                                        <p className="fw-light mb-4 pb-2">
                                            Latest Comments section by users
                                        </p>

                                        <MDBRow>
                                            <MDBCol>
                                                {
                                                    comments.map((comment) => {
                                                        return (
                                                            <>
                                                                <div className="d-flex flex-start">
                                                                    <MDBCardImage
                                                                        className="rounded-circle shadow-1-strong me-3"
                                                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                                                                        alt="avatar"
                                                                        width="65"
                                                                        height="65"
                                                                    />

                                                                    <div className="flex-grow-1 flex-shrink-1">
                                                                        <div>
                                                                            <div className="d-flex justify-content-between align-items-center">
                                                                                <p className="mb-1">
                                                                                    Maria Smantha{" "}
                                                                                    <span className="small">- 2 hours ago</span>
                                                                                </p>
                                                                                <a href="#!">
                                                                                    <MDBIcon fas icon="reply fa-xs" />
                                                                                    <span className="small"> reply</span>
                                                                                </a>
                                                                            </div>
                                                                            <p className="small mb-0">
                                                                                It is a long established fact that a reader will be
                                                                                distracted by the readable content of a page.
                                                                            </p>
                                                                        </div>

                                                                        <div className="d-flex flex-start mt-4">
                                                                            <a className="me-3" href="#">
                                                                                <MDBCardImage
                                                                                    className="rounded-circle shadow-1-strong me-3"
                                                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp"
                                                                                    alt="avatar"
                                                                                    width="65"
                                                                                    height="65"
                                                                                />
                                                                            </a>

                                                                            <div className="flex-grow-1 flex-shrink-1">
                                                                                <div>
                                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                                        <p className="mb-1">
                                                                                            Simona Disa{" "}
                                                                                            <span className="small">- 3 hours ago</span>
                                                                                        </p>
                                                                                    </div>
                                                                                    <p className="small mb-0">
                                                                                        letters, as opposed to using 'Content here,
                                                                                        content here', making it look like readable
                                                                                        English.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="d-flex flex-start mt-4">
                                                                            <a className="me-3" href="#">
                                                                                <MDBCardImage
                                                                                    className="rounded-circle shadow-1-strong me-3"
                                                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                                                                                    alt="avatar"
                                                                                    width="65"
                                                                                    height="65"
                                                                                />
                                                                            </a>

                                                                            <div className="flex-grow-1 flex-shrink-1">
                                                                                <div>
                                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                                        <p className="mb-1">
                                                                                            John Smith{" "}
                                                                                            <span className="small">- 4 hours ago</span>
                                                                                        </p>
                                                                                    </div>
                                                                                    <p className="small mb-0">
                                                                                        the majority have suffered alteration in some
                                                                                        form, by injected humour, or randomised words.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }

                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>

                                    <hr className="my-0" />



                                    {/* Tạo Comment */}
                                    <MDBCardFooter
                                        className="py-3 border-0"
                                        style={{ backgroundColor: "#f8f9fa" }}
                                    >
                                        <div className="d-flex flex-start w-100">
                                            <MDBCardImage
                                                className="rounded-circle shadow-1-strong me-3"
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                                                alt="avatar"
                                                width="40"
                                                height="40"
                                            />
                                            <MDBTextArea label='Message' id='textAreaExample' rows={4} style={{ backgroundColor: '#fff' }} wrapperClass="w-100" />
                                        </div>
                                        <div className="float-end mt-2 pt-1">
                                            <MDBBtn size="sm" className="me-1">Post comment</MDBBtn>
                                            <MDBBtn outline size="sm">Cancel</MDBBtn>
                                        </div>
                                    </MDBCardFooter>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </Row>
                <Row className="my-5">
                    <Col>
                        <div className="d-flex fs-1 fw-bold">Related products</div>
                    </Col>
                </Row>
                <Row>
                    <MDBContainer fluid>
                        {
                            products.map((product) => {
                                return (
                                    <>
                                        <MDBRow className="justify-content-center mb-0">
                                            <MDBCol md="12" xl="10">
                                                <MDBCard className="shadow-0 border rounded-3 mb-3">
                                                    <MDBCardBody>
                                                        <MDBRow>
                                                            <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                                                                <MDBRipple
                                                                    rippleColor="light"
                                                                    rippleTag="div"
                                                                    className="bg-image rounded hover-zoom hover-overlay"
                                                                >
                                                                    <MDBCardImage
                                                                        src={product.thumbnail}
                                                                        fluid
                                                                        className="w-100"
                                                                    />
                                                                    <a href="#!">
                                                                        <div
                                                                            className="mask"
                                                                            style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                                        ></div>
                                                                    </a>
                                                                </MDBRipple>
                                                            </MDBCol>
                                                            <MDBCol md="6">
                                                                <h5>{product.name}</h5>
                                                                <div className="d-flex flex-row">
                                                                    <div className="text-danger mb-1 me-2">
                                                                        <MDBIcon fas icon="star" />
                                                                        <MDBIcon fas icon="star" />
                                                                        <MDBIcon fas icon="star" />
                                                                        <MDBIcon fas icon="star" />
                                                                    </div>
                                                                    <span>310</span>
                                                                </div>
                                                                <div className="mt-1 mb-0 text-muted small">
                                                                    <span>{product.color}</span>
                                                                    <span className="text-primary"> • </span>
                                                                    <span>{product.weight}</span>
                                                                    <span className="text-primary"> • </span>
                                                                    <span>
                                                                        {product.style}
                                                                        <br />
                                                                    </span>
                                                                </div>
                                                                <div className="mb-2 text-muted small">
                                                                    <span>{product.balance}</span>
                                                                    <span className="text-primary"> • </span>
                                                                    <span>{product.skill_lv}</span>
                                                                </div>
                                                                <p className="text-truncate mb-4 mb-md-0">
                                                                    {product.description}
                                                                </p>
                                                            </MDBCol>
                                                            <MDBCol
                                                                md="6"
                                                                lg="3"
                                                                className="border-sm-start-none border-start"
                                                            >
                                                                <div className="d-flex flex-row align-items-center mb-1">
                                                                    <h4 className="mb-1 me-1">{product.price} vnd</h4>
                                                                    <span className="text-danger">
                                                                        <s>{`${product.price * 30 / 100 + product.price}`} vnd</s>
                                                                    </span>
                                                                </div>
                                                                <h6 className="text-success">Free shipping</h6>
                                                                <div className="d-flex flex-column mt-4">
                                                                    <MDBBtn color="primary" size="sm">
                                                                        Details
                                                                    </MDBBtn>
                                                                    <MDBBtn outline color="primary" size="sm" className="mt-2">
                                                                        Add to wish list
                                                                    </MDBBtn>
                                                                </div>
                                                            </MDBCol>
                                                        </MDBRow>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                        </MDBRow>
                                    </>
                                )
                            })
                        }
                    </MDBContainer>
                </Row>
            </Container>
        </>
    )
}