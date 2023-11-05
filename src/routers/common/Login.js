import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
} from 'mdb-react-ui-kit';
import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [accounts, setAccounts] = useState([])
    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [show, setShow] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3004/accounts')
            .then(res => setAccounts(res.data))
    }, [])

    const handleOnChangeEmail = (e) => {
        setInputEmail(e.target.value)
    }

    const handleOnChangePassword = (e) => {
        setInputPassword(e.target.value)
    }

    const handleOnSubmitSignIn = () => {
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 2000)),
            {
                pending: 'Check your account',
            }
        )
        if (inputEmail === '' || inputPassword === '') {
            toast.error("You cannot let an field blank!", {
                theme: "colored"
            });
        } else {
            const accFindByEmail = accounts.find((acc) => {
                return acc.email === inputEmail
            })
            if (accFindByEmail != undefined && accFindByEmail.password === inputPassword) {
                setTimeout(() => {
                    toast.success("Success!", {
                        theme: "colored"
                    })
                }, 2000)
                setTimeout(() => {

                    dispatch({
                        type: 'FETCH_USER_LOGIN_SUCCESS',
                        payload: accFindByEmail
                    })
                    navigate('/')
                }, 3500)
            }
            else {
                setTimeout(() => {
                    toast.error("False!", {
                        theme: "colored"
                    })
                }, 2000)

            }
        }

    }



    return (
        <>

            <Container>

                <MDBContainer fluid className="p-3 my-5">
                    <ToastContainer />
                    <MDBRow>

                        <MDBCol col='10' md='6'>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
                        </MDBCol>

                        <MDBCol col='4' md='6'>


                            <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"
                                onChange={handleOnChangeEmail}
                                value={inputEmail}
                            />
                            <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
                                onChange={handleOnChangePassword}
                                value={inputPassword}
                            />


                            <MDBBtn className="mb-4 w-100" size="lg"
                                onClick={handleOnSubmitSignIn}
                            >
                                Sign in</MDBBtn>
                            <p className='ms-5'>Don't have an account? <Link to="http://localhost:3000/login/register" className="link-info">Register here</Link></p>

                        </MDBCol>
                    </MDBRow>
                </MDBContainer></Container>
        </>
    )
}