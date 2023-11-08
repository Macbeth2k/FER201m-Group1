import { InputGroup, FormControl, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons'
import Bubble from '../../global/Bubble'
import io from 'socket.io-client'
import { useState, useEffect } from 'react';

const socket = io.connect('http://localhost:3001')

export default function ManageMessages() {
    const [message, setMessage] = useState('')
    const [messageReceived, setMessageReceived] = useState('')
    const sendMessageHandler = () => {
        socket.emit('send_message', {message})
    }
    useEffect(()=>{
        socket.on('receive_message', (data) => {
          setMessageReceived(data.message)  
        })
    },[socket])

    const chatBoxHandler = (value) => {
        setMessage(value)
    }

    return (
        <div>
            <div style={{ maxHeight: '68vh', overflowY: 'auto' }}>
                <Bubble direction='left' content={messageReceived}/>
                <Bubble direction='right' />
                
            </div>
            <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                <Image
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                    alt="avatar 3"
                    style={{ width: '40px', height: '100%' }}
                />
                <InputGroup className="ms-2 border rounded">
                    <FormControl
                        as='textarea'
                        placeholder="Type message"
                        aria-label="Type message"
                        aria-describedby="basic-addon2"
                        style={{ height: '10px' }} onChange={(e) => chatBoxHandler(e.target.value)}
                    />
                    <Button variant="light" id="basic-addon2">
                        <FontAwesomeIcon icon={faLink} />
                    </Button>
                    <Button variant="light" className="">
                        <FontAwesomeIcon icon={faGoogleDrive} />
                    </Button>
                </InputGroup>
                <Button variant="primary" className="ms-2" onClick={() => sendMessageHandler()}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
            </div>
        </div>
    )
}