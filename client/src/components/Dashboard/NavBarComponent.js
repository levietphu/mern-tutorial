import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import learnItLogo from '../../assets/logo.svg';
import logoutIcon from '../../assets/logout.svg';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

const NavBarComponent = () => {

    let { logoutUser, authState: { user } } = useContext(AuthContext);

    const onLogout = () => logoutUser();

    return (
        <Navbar expand="lg" bg="info" variant="dark" className="shadow">
            <Navbar.Brand className="font-weight-bolder text-white">
                <img src={learnItLogo} alt="learn" width="32" height="32" className="mr-2" />
                LearnIt
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className="font-weight-bolder text-white" to="/dashboard" as={Link}>
                        DashBoard
                    </Nav.Link>
                    <Nav.Link className="font-weight-bolder text-white" to="/about" as={Link}>
                        About
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className="font-weight-bolder text-white" disabled>
                        welcome {user.username}
                    </Nav.Link>
                    <Button onClick={onLogout} variant="secondary" className="font-weight-bolder text-white">
                        <img src={logoutIcon} alt="logout" width="32" height="32" className="mr-2" />
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBarComponent

