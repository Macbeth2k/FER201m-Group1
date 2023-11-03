import { useEffect, useState } from 'react';
import Search from '../components/CA_Search';
import SideBarItem from './CA_SideBarItem';
import ListGroup from 'react-bootstrap/ListGroup';
export default function Sidebar(props) {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    useEffect(() => {
        fetch('http://localhost:3004/accounts')
            .then(response => response.json())
            .then(data => {
                setUsers(data)
                // console.log(JSON.stringify(data));
                // console.log(JSON.stringify(data[0]));
                props.changeIndex(data[0])
                // console.log(`index: ${props.index}`)
                // console.log(JSON.stringify(props.index))
            })
            .catch(err => console.log(err))
    }, [])

    const searchHandler = (value) => {
        setSearch(value)
    }

    const listUserBySearch = users.filter(user => {
        return user.fname.toLowerCase().includes(search.toLowerCase()) || user.lname.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className='p-3' style={{paddingBottom: '0'}}>
            <div className='me-3'>
                <Search listen={searchHandler} />
            </div>
            <div style={{ height: '72vh', overflowY: 'auto' }}>
                <ListGroup variant="flush">
                    {listUserBySearch.map(user => (
                        <SideBarItem key={user.id} user={user} index={props.index} changeIndex={props.changeIndex} />
                    ))}

                </ListGroup>
            </div>
            
        </div>
    )
}