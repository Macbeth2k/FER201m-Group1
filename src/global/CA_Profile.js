import { Image, Dropdown } from 'react-bootstrap';
import '../css/CA_Profile.module.css'
import { Link } from 'react-router-dom';

export default function CA_Profile({ account }) {
    return (
        <>
            <Dropdown>
            <Dropdown.Toggle variant="" id="Profile" style={{ boxShadow: 'none', display: 'flex', alignItems: 'center' }}>
    <Image
        src={account.avatar}
        className="d-flex align-self-center me-3 profile"
        width="40"
        height="40"
        style={{ objectFit: 'fill', borderRadius: '50%' }}
    />
    <h6 className="m-b-0 profile" style={{ margin: '0', flexGrow: 1, textAlign: 'right' }}>
        {account.fname + ' ' + account.lname}
    </h6>
</Dropdown.Toggle>


                <Dropdown.Menu>
                    <Dropdown.Item>
                        <Link>
                            Tài khoản
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link >Đăng xuất</Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}