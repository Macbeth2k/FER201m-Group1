
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
    MDBCardText
} from "mdb-react-ui-kit"

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

export default function ShoppingCart() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentAccount = useSelector(state => state.user.account)

    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([])
    const [account, setAccount] = useState({})
    const [change, setChange] = useState(false)
    useEffect(() => {
        axios.get(`http://localhost:3004/accounts/${currentAccount.id}`)
            .then(res => setAccount(res.data))
    }, [currentAccount.id, change])

    useEffect(() => {
        axios.get('http://localhost:3004/products')
            .then(res => setProducts(res.data))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3004/brands')
            .then(res => setBrands(res.data))
    }, [])

    const getProductById = (productId) => {
        const product = products.find((p) => {
            return p.id === productId
        })
        return product
    }

    const getBrandProductById = (productId) => {
        const product = products.find((p) => {
            return p.id === productId
        })
        if (product?.brand) {
            const brand = brands.find((b) => {
                return b.id === product.brand
            })
            return brand
        }
    }

    const getTotal = () => {
        const productList = products.filter((p) => {

            return p.id === account?.cart?.find((c) => {
                return c?.productId === p.id
            })?.productId
        })

        return (productList.reduce((accumulator, currentProduct) => {
            return accumulator + currentProduct.price * getQuantityByCartProductId(currentProduct.id)
        }, 0))
    }

    const getQuantityByCartProductId = (productId) => {
        return account?.cart?.find((c) => {
            return c?.productId === productId
        })?.quantity
    }

    const handleBackToProductDetail = () => {
        navigate(`/products`)
    }

    const handleRemoveAllCart = (cart) => {
        let newCart = account?.cart.filter((c) => {
            return c !== cart
        })
        axios.put(`http://localhost:3004/accounts/${account.id}`, {
            ...account,
            'cart': newCart
        })
        dispatch({
            type: 'FETCH_USER_LOGIN_SUCCESS',
            payload: account
        })
        toast.success("Remove all carts success!", {
            theme: 'colored',
            position: toast.POSITION.BOTTOM_RIGHT
        })
        setChange(!change)
    }

    const handleMinusOneCart = (cart, index) => {
        if (cart?.quantity === 1) {
            toast.error("You only have one product left!", {
                theme: 'colored'
            })
        } else {
            const newCart = account.cart
            newCart[index].quantity = newCart[index].quantity - 1
            axios.put(`http://localhost:3004/accounts/${account.id}`, {
                ...account,
                'cart': newCart
            })
            toast.success("Minus one cart success!", {
                theme: 'colored',
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setChange(!change)
        }
    }

    const handlePlusOneCart = (cart, index) => {
        const quantityInStock = products.find((p) => {
            return p.id === cart.productId
        })?.quantity
        if (quantityInStock > cart.quantity) {
            const newCart = account.cart
            newCart[index].quantity = newCart[index].quantity + 1
            axios.put(`http://localhost:3004/accounts/${account.id}`, {
                ...account,
                'cart': newCart
            })
            toast.success("Add one cart success!", {
                theme: 'colored',
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setChange(!change)
        } else {
            toast.error("Exceeded the product in stock!", {
                theme: 'colored',
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }



    return (
        <>
            <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
                <ToastContainer />
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol size="12">
                            <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                                <MDBCardBody className="p-0">
                                    <MDBRow className="g-0">
                                        <MDBCol lg="8">
                                            <div className="p-5">
                                                <div className="d-flex justify-content-between align-items-center mb-5">
                                                    <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                                                        Shopping Cart
                                                    </MDBTypography>
                                                </div>
                                                {
                                                    account.cart?.map((cart, index) => {
                                                        return (
                                                            <>
                                                                <hr className="my-4" key={index} />
                                                                <MDBRow className="mb-4 d-flex justify-content-between align-items-center" >
                                                                    <MDBCol md="2" lg="2" xl="2">
                                                                        <MDBCardImage
                                                                            src={getProductById(cart.productId)?.image}
                                                                            fluid className="rounded-3" alt="Cotton T-shirt" />
                                                                    </MDBCol>
                                                                    <MDBCol md="3" lg="3" xl="3">
                                                                        <MDBTypography tag="h6" className="text-muted">
                                                                            {getBrandProductById(cart.productId)?.name}
                                                                        </MDBTypography>
                                                                        <MDBTypography tag="h6" className="text-black mb-0">
                                                                            {getProductById(cart.productId)?.name}
                                                                        </MDBTypography>
                                                                    </MDBCol>
                                                                    <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                                                                        <MDBBtn onClick={() => handleMinusOneCart(cart, index)} color="link" className="px-2">
                                                                            <MDBIcon fas icon="minus" />
                                                                        </MDBBtn>

                                                                        <MDBInput type="number" min="0" value={cart.quantity} size="sm" />

                                                                        <MDBBtn onClick={() => handlePlusOneCart(cart, index)} color="link" className="px-2">
                                                                            <MDBIcon fas icon="plus" />
                                                                        </MDBBtn>
                                                                    </MDBCol>
                                                                    <MDBCol md="3" lg="2" xl="2" className="text-end">
                                                                        <MDBTypography tag="h6" className="mb-0">
                                                                            {getProductById(cart.productId)?.price * cart.quantity} vnd
                                                                        </MDBTypography>
                                                                    </MDBCol>
                                                                    <MDBCol md="1" lg="1" xl="1" className="text-end">
                                                                        <a href="#!" onClick={() => handleRemoveAllCart(cart)} className="text-muted">
                                                                            <MDBIcon fas icon="times" />
                                                                        </a>
                                                                    </MDBCol>
                                                                </MDBRow>
                                                            </>
                                                        )
                                                    })
                                                }
                                                <div className="pt-5">
                                                    <MDBTypography tag="h6" className="mb-0">
                                                        <MDBCardText tag="a" onClick={handleBackToProductDetail} href="#!" className="text-body">
                                                            <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                                                            to shop
                                                        </MDBCardText>
                                                    </MDBTypography>
                                                </div>
                                            </div>
                                        </MDBCol>
                                        <MDBCol lg="4" className="bg-grey">
                                            <div className="p-5">
                                                <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                                                    Summary
                                                </MDBTypography>

                                                <hr className="my-4" />
                                                {
                                                    account?.cart?.map((cart) => {
                                                        return (
                                                            <>
                                                                <div className="d-flex justify-content-between mb-4" key={cart.id}>
                                                                    <MDBTypography tag="h5" className="text-uppercase">
                                                                        {getProductById(cart.productId)?.name.substring(0, 10)}...
                                                                    </MDBTypography>
                                                                    <MDBTypography tag="h5">{getProductById(cart.productId)?.price * cart.quantity} vnd</MDBTypography>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }
                                                <hr className="my-4" />

                                                <div className="d-flex justify-content-between mb-5">
                                                    <MDBTypography tag="h5" className="text-uppercase">
                                                        Total price
                                                    </MDBTypography>
                                                    <MDBTypography tag="h5">{getTotal()} vnd</MDBTypography>
                                                </div>

                                                <MDBBtn onClick={() => navigate(`/order/${account.id}`)} color="dark" block size="lg">
                                                    Check out
                                                </MDBBtn>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section >
        </>
    )
}