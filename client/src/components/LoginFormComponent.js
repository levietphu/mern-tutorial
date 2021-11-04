import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import AlertComponent from './AlertComponent';

const LoginFormComponent = () => {

    const { loginUser } = useContext(AuthContext);

    const [loginForm, setState] = useState({
        username: '',
        password: ''
    });
    const [alert, setAlert] = useState(null);
    
    const { username, password } = loginForm;

    const onloginForm = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setState({
            ...loginForm,
            [name]: value
        })
    }

    const getUser = async (event) => {
        event.preventDefault();

        try {
            const loginData = await loginUser(loginForm);
            if (!loginData.success) {
                setAlert({atype: "danger", message: loginData.message});
                setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form onSubmit={getUser}>
            <AlertComponent info={alert}></AlertComponent>
            <Form.Group className="mb-10">
                <Form.Control type="text" name="username" value={username} placeholder="Nhập username ..." onChange={onloginForm}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-10">
                <Form.Control type="password" name="password" value={password} placeholder="Nhập password ..." onChange={onloginForm}></Form.Control>
            </Form.Group>
            <Button className="mb-10" variant="success" type="submit">Đăng nhập</Button>
            <p>Dons't have an account?<Link className="btn btn-sm btn-primary" to="/register">Đăng ký</Link></p>

        </Form>
    )
}

export default LoginFormComponent
