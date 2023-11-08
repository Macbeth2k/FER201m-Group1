import { useEffect, useState } from 'react';
import Search from '../components/CA_Search';
import SideBarItem from './CA_SideBarItem';
import ListGroup from 'react-bootstrap/ListGroup';
import { useContext } from 'react'
import { userContext } from '../layout/CustomerAgent'
export default function Sidebar() {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const {indexUser, setIndexHandler} = useContext(userContext)
    useEffect(() => {
        fetch('http://localhost:3004/accounts')
            .then(response => response.json())
            .then(data => {
                setUsers(data)
                setIndexHandler({...data[0]})
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
        {console.log('sidebar' + users)}
            <div className='me-3'>
                <Search listen={searchHandler} placeholder='Search...'/>
            </div>
            <div style={{ height: '72vh', overflowY: 'auto' }}>
                <ListGroup variant="flush">
                    {listUserBySearch.map(user => (
                        <SideBarItem key={user.id} user={user}/>
                    ))}

                </ListGroup>
            </div>
            
        </div>
    )
}