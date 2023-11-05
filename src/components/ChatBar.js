import { InputGroup, FormControl, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons'
export default function ChatBar() {
    return (
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
                    style={{ height: '10px' }}
                />
                <Button variant="light" id="basic-addon2">
                    <FontAwesomeIcon icon={faLink} />
                </Button>
                <Button variant="light" className="">
                    <FontAwesomeIcon icon={faGoogleDrive} />
                </Button>
            </InputGroup>
            <Button variant="primary" className="ms-2">
                <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
        </div>
    )
}