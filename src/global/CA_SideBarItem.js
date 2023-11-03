import ListGroup from 'react-bootstrap/ListGroup';
import { Badge, Image } from 'react-bootstrap';
import '../css/CA_SidebarItem.module.css';
import { Link } from 'react-router-dom';
export default function SideBarItem({user, index, changeIndex}) {
    // console.log(JSON.stringify(index));
    return (
        <ListGroup.Item className="p-2 border-bottom chat-item"
        style={user.id === index.id ? {backgroundColor: 'rgba(0,0,0,0.1)'} : {}}>
            <Link to={`${user.id}/messages`} className="d-flex justify-content-between" onClick={() => changeIndex(user)}>
                <div className="d-flex flex-row">
                    <div>
                        <Image
                            src={user.avatar}
                            alt="avatar"
                            className="d-flex align-self-center me-3"
                            width="60"
                            height="60"
                            style={{objectFit: 'fill', borderRadius: '50%'}}
                        />
                    </div>
                    <div className="pt-1">
                        <p className="fw-bold mb-0">{user.fname + ' ' + user.lname}</p>
                        <p className="small text-muted">{}</p>
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