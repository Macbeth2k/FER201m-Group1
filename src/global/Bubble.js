import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
export default function Bubble(props){
    return (
        <Container className={props.direction === 'left' ? 'd-flex flex-row justify-content-start' : 'd-flex flex-row justify-content-end'} style={{marginBottom: '20px'}}>
          {props.direction === 'left' && (
            <>
              <Image
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                alt="avatar 1"
                style={{ width: '45px', height: '100%' }}
              />
              <div>
                <Alert className="p-2 ms-3 mb-1 rounded-3" variant="light" style={{marginRight: '80px'}}>
                  {props.content}
                </Alert>
                {/* <p className="small ms-3 mb-3 rounded-3 text-muted float-start">
                  12:00 PM | Aug 13
                </p> */}
              </div>
            </>
          )}
    
          {props.direction === 'right' && (
            <>
              <div>
                <Alert className="p-2 ms-3 mb-1 rounded-3" variant="light" style={{marginLeft: '80px'}}>
                  {props.content}
                </Alert>
                {/* <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                  12:00 PM | Aug 13
                </p> */}
              </div>
              <Image
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                alt="avatar 1"
                style={{ width: '45px', height: '100%', marginLeft: '15px' }}
              />
            </>
          )}
        </Container>
      )
}