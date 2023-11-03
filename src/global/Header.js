

import Header_Guest from "./../components/Header_Guest"
import axios from 'axios';
import { useState, useEffect } from 'react'


export default function Header() {
    const [account, setAccount] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3004/accounts')
            .then(function (response) {
                setAccount(response.data)
                // handle success
            })
    }, [])

    return (
        <>
            <Header_Guest />
        </>
    )
}