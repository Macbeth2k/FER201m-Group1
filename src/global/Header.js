import Header_Guest from "./../components/Header_Guest"
import Header_Customer from "./../components/Header_Customer"


import axios from 'axios';
import { useSelector } from 'react-redux'



export default function Header() {
    const isLogin = useSelector(state => state.user.isLogin)
    const account = useSelector(state => state.user.account)

    console.log('account: ' + account)
    console.log('isLogin: ' + isLogin)
    const showHeader = () => {
        return isLogin ? <Header_Customer /> : <Header_Guest />
    }
    return (
        <>
            {showHeader()}
        </>
    )
}