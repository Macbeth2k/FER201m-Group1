import Table from 'react-bootstrap/Table'
import { useContext } from 'react'
import { userContext } from '../../layout/CustomerAgent'
import { useState, useEffect } from 'react'

export default function ViewOrder() {
    const indexUser = useContext(userContext)
    const orderIds = indexUser.orders
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:3004/orders')
            .then(response => response.json())
            .then(data => { setOrders(data) })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3004/products')
            .then(response => response.json())
            .then(data => { setProducts(data) })
            .catch(err => console.log(err))
    }, [])

    const smallProductData = {};

    products.forEach(product => {
        smallProductData[product.id] = {
            name: product.name,
            price: product.price,
            quantity: 0
        }
    });


    return (
        <>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Order Id</th>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Total price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderIds && orderIds.map((orderId, index) => {
                        const order = orders.find((order) => order.id === orderId)
                        const products = order ? order.products.map(product => {
                            const index = smallProductData[product.productId]
                            if (index) index.quantity = product.quantity
                            return index
                        }) : [];

                        return (
                            <tr key={orderId}>
                                <td>{index + 1}</td>
                                <td>{orderId}</td>
                                <td>
                                    {order ? new Date(order.date).toLocaleDateString('vi-VN') : 'N/A'}
                                </td>
                                <td>
                                    {products && products.map((product, i) => (
                                        product ? (
                                            <span key={i}>
                                                {`${product.name}: ${product.quantity}`}
                                                <br />
                                            </span>
                                        ) : 'N/A'
                                    )
                                    )}
                                </td>
                                <td>
                                    {products.reduce((total, product) => total + (product ? product.quantity * product.price : 0), 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    )
}