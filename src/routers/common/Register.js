import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
} from 'mdb-react-ui-kit';
import { Container } from 'react-bootstrap'


export default function Register() {
    return (
        <>
            <Container> <MDBContainer fluid className='p-4'>

                <MDBRow>

                    <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                        <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                            The best offer <br />
                            <span className="text-primary">for your business</span>
                        </h1>

                        <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                            quibusdam tempora at cupiditate quis eum maiores libero
                            veritatis? Dicta facilis sint aliquid ipsum atque?
                        </p>

                    </MDBCol>

                    <MDBCol md='6'>

                        <MDBCard className='my-5'>
                            <MDBCardBody className='p-5'>

                                <MDBRow>
                                    <MDBCol col='6'>
                                        <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text' />
                                    </MDBCol>

                                    <MDBCol col='6'>
                                        <MDBInput wrapperClass='mb-4' label='Last name' id='form1' type='text' />
                                    </MDBCol>
                                </MDBRow>

                                <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' />
                                <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' />


                                <MDBBtn className='w-100 mb-4' size='md'>sign up</MDBBtn>


                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>

                </MDBRow>

            </MDBContainer></Container>
        </>
    )
}