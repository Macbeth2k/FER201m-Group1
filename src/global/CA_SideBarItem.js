import ListGroup from 'react-bootstrap/ListGroup';
import { Badge, Image } from 'react-bootstrap';
import '../css/CA_SidebarItem.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react'
import { userContext } from '../layout/CustomerAgent'
export default function SideBarItem({ user }) {
    const { indexUser, setIndexHandler } = useContext(userContext)
    const location = useLocation()
    const [newPath, setNewPath] = useState('')

        useEffect(() => {
            const currentPath = location.pathname
            const [prefix, suffix] = currentPath.split(indexUser.id)
            const updatedPath = `${user.id}${suffix}`
            setNewPath(updatedPath)
        }, [location.pathname])

    return (
        <ListGroup.Item className="p-2 border-bottom chat-item"
            style={user.id === indexUser.id ? { backgroundColor: 'rgba(0,0,0,0.1)' } : {}}>
            <Link to={newPath} className="d-flex justify-content-between" onClick={() => setIndexHandler(user)}>
                <div className="d-flex flex-row">
                    <div>
                        <Image
                            src={user.avatar}
                            alt="avatar"
                            className="d-flex align-self-center me-3"
                            width="60"
                            height="60"
                            style={{ objectFit: 'fill', borderRadius: '50%' }}
                        />
                    </div>
                    <div className="pt-1">
                        <p className="fw-bold mb-0">{user.fname + ' ' + user.lname}</p>
                        <p className="small text-muted">{ }</p>
                    </div>
                </div>
                <div className="pt-1">
                    <p className="small text-muted mb-1">Just now</p>
                    <Badge bg="danger" className="rounded-pill float-end">3</Badge>
                </div>
            </Link>
        </ListGroup.Item>
    );
}