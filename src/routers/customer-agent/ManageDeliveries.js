import Table from 'react-bootstrap/Table'
import { useContext } from 'react'
import { userContext } from '../../layout/CustomerAgent'
import { useState, useEffect } from 'react'

export default function ManageDeliveries() {
    // deliveryOrders
    //accounts 
    const { indexUser, setIndexHandler } = useContext(userContext)
    const orderIds = indexUser.orders
    const [orders, setOrders] = useState([])
    const [deliveries, setDeliveries] = useState([])
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        fetch('http://localhost:3004/orders')
            .then(response => response.json())
            .then(data => { setOrders(data) })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3004/deliveryOrders')
            .then(response => response.json())
            .then(data => { setDeliveries(data) })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3004/accounts')
            .then(response => response.json())
            .then(data => { setAccounts(data) })
            .catch(err => console.log(err))
    }, []) // useEffect để lấy danh sách accounts

    const getNameFromId = (id) => {
        const agent = accounts.find(account => account.id === id)
        if (agent) return agent.fname + " " + agent.lname
        else return undefined
    }

    const getStatusById = (id) => {
        const order = orders.find(order => order.id === id)
        if (order) return order.status
        else return undefined
    }

    return (
        <>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Delivery Id</th>
                        <th>Order Id</th>
                        <th>Delivery Agent</th>
                        <th>Address</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orderIds && orderIds.map((orderId, i) => {
                        const delivery = deliveries && deliveries.find(delivery => delivery.order === orderId)
                        
                        if (delivery) {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{delivery.id}</td>
                                    <td>{orderId}</td>
                                    <td>{getNameFromId(delivery.deliveryAgent)}</td>
                                    <td>{indexUser.address[0]}</td>
                                    <td>{getStatusById(orderId)}</td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </Table>
        </>
    )
}