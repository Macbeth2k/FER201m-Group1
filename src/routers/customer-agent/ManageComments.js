import Table from 'react-bootstrap/Table'
import { useContext } from 'react'
import { userContext } from '../../layout/CustomerAgent'
import { useState, useEffect, useCallback } from 'react'
import Search from '../../components/CA_Search'
import { Col, Row } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
export default function ManageComments() {
    const { indexUser, setIndexHandler } = useContext(userContext)
    const [comments, setComments] = useState([])
    const [products, setProducts] = useState([])
    const [searchProductName, setSearchProductName] = useState('')
    const [searchContentValue, setSearchContent] = useState('')


    useEffect(() => {
        fetch('http://localhost:3004/comments')
            .then(response => response.json())
            .then(data => { setComments(data) })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3004/products')
            .then(response => response.json())
            .then(data => { setProducts(data) })
            .catch(err => console.log(err))
    }, [])

    const getNameFromId = (id) => {
        const product = products.find(product => product.id === id)
        if (product) return product.name
        else return undefined
    }

    const searchProduct = (value) => {
        setSearchProductName(value)
    }

    const searchContent = (value) => {
        setSearchContent(value)
    }

    const toggleHandle = (id) => {
        const updatedComments = comments.map((comment) => {
            if (comment.id === id) {
                comment.status = comment.status === 'Appropriate' ? 'Non-Appropriate' : 'Appropriate';

                // Gọi yêu cầu PATCH để cập nhật trạng thái
                fetch(`http://localhost:3004/comments/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: comment.status }),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then((updatedComment) => {
                        console.log('Comment updated:', updatedComment);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
            return comment;
        });

        setComments(updatedComments);
    };


    const commentsFilter = comments && comments.filter(comment => {
        const productName = getNameFromId(comment.product);
        if (productName) {
            const productNameLower = productName.toLowerCase();
            const searchProductNameLower = searchProductName.toLowerCase();
            const contentLower = comment.content.toLowerCase();
            const searchContentValueLower = searchContentValue.toLowerCase();

            if (productNameLower.includes(searchProductNameLower) && contentLower.includes(searchContentValueLower) && comment.user === indexUser.id) {
                return true;
            }
        }
        return false;

    })

    return (
        <>
            <Row>
                <Col>
                    <Search listen={searchProduct} placeholder='product name...' />
                </Col>
                <Col>
                    <Search listen={searchContent} placeholder='content...' />
                </Col>
            </Row>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Comment Id</th>
                        <th>Product</th>
                        <th>Content</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {commentsFilter && commentsFilter.map((comment, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{comment.id}</td>
                                <td>{getNameFromId(comment.product)}</td>
                                <td>{comment.content}</td>
                                <td>
                                    <DropdownButton id="dropdown-basic-button" size='sm' variant='info' title={
                                        <span style={{ textTransform: 'none' }}>
                                            {comment.status}
                                        </span>
                                    }>
                                        <Dropdown.Item onClick={() => toggleHandle(comment.id)}>
                                            {comment.status === 'Appropriate' ? 'Non-Appropriate' : 'Appropriate'}
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}