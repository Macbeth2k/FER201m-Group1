import Table from 'react-bootstrap/Table'
import { useContext } from 'react'
import { userContext } from '../../layout/CustomerAgent'
import { useState, useLayoutEffect, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useNavigate } from "react-router-dom"


export default function ManageDeliveries() {
    const { indexUser, setIndexHandler } = useContext(userContext)
    console.log(indexUser);
    const orderIds = indexUser.orders
    const [orders, setOrders] = useState([])
    const [deliveries, setDeliveries] = useState([])
    const [accounts, setAccounts] = useState([])
    const [show, setShow] = useState(false);
    const [newDelivery, setNewDelivery] = useState({})
    const [address, setAddress] = useState('')
    const [newPhone, setPhone] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        console.log(Array.isArray(indexUser.address))
        if (Array.isArray(indexUser.address)) {
            setAddress(indexUser.address[0])
        }
        setPhone(indexUser.phone)
    }, [indexUser])

    function handleOrderSelect(event) {
        const selectedOrderId = parseInt(event.target.value)
        setNewDelivery({ ...newDelivery, order: selectedOrderId })
        console.log(newDelivery)
    }

    function handleDASelect(event) {
        const selectedDaId = event.target.value;
        setNewDelivery({ ...newDelivery, deliveryAgent: selectedDaId })
        console.log(newDelivery)
    }

    function handleAddressChange(event) {
        setAddress(event.target.value)

    }

    function handlePhoneChange(event) {
        setPhone(event.target.value)
    }

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleSubmit = () => {
        //update order
        fetch(`http://localhost:3004/orders/${newDelivery.order}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'Delivering' })
        })
            .then(res => res.json())
            .then(console.log);

        fetch('http://localhost:3004/deliveryOrders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newDelivery, address, newPhone })
        })
            .then(res => res.json())
            .then(console.log)
        // setShow(false)
    }

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
            .then(data => {
                setAccounts(data)
            })
            .catch(err => console.log(err))
    }, []) // useEffect để lấy danh sách accounts

    const getNameFromId = (id) => {
        const agent = accounts && accounts.find(account => account.id === id)
        if (agent) return agent.fname + " " + agent.lname
        else return undefined
    }

    const getStatusById = (id) => {
        const order = orders && orders.find(order => order.id === id)
        if (order) return order.status
        else return undefined
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create new delivery order
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New delivery order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Select onChange={handleOrderSelect}>
                            <option>Choose the order's id</option>
                            {orderIds && orderIds.map(orderId => {
                                const filteredOrders = orders && orders.filter(order => order.id === orderId && order.status === 'Processing')
                                return filteredOrders.map((order) => (
                                    <option key={order.id}>{order.id}</option>
                                ))
                            })}
                        </Form.Select>
                        <br />
                        <Form.Select onChange={handleDASelect}>
                            <option>Choose delivery agent</option>
                            {accounts &&
                                accounts
                                    .filter((account) => account.role === 'delivery-agent')
                                    .map((account) => (
                                        <option key={account.id} value={account.id}>
                                            {account.fname} {account.lname}
                                        </option>
                                    ))}
                        </Form.Select>
                        <br />
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                value={address}
                                autoFocus
                                onChange={handleAddressChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="tel"
                                value={newPhone}
                                autoFocus
                                onChange={handlePhoneChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Delivery Id</th>
                        <th>Phone</th>
                        <th>Delivery Agent</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {orderIds && orderIds.map((orderId, i) => {
                        const delivery = deliveries && deliveries.find(delivery => delivery.order === orderId)

                        if (delivery && indexUser.address) {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{delivery.id}</td>
                                    <td>{orderId}</td>
                                    <td>{getNameFromId(delivery.deliveryAgent)}</td>
                                    <td>{indexUser?.address[0]}</td>
                                    <td>{getStatusById(orderId) || 'N/A'}</td>
                                    <td>
                                        <Button variant="danger">
                                            Delete
                                        </Button>{' '}
                                    </td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </Table>
        </>
    )
}