import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import AlertComponent from './AlertComponent';

const RegisterFormComponent = () => {

    const { registerUser } = useContext(AuthContext);

    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        repassword: ''
    });
    const [alert, setAlert] = useState(null);

    const { username, password, repassword } = registerForm;

    const onRegisterForm = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setRegisterForm({
            ...registerForm,
            [name]: value
        })
    }

    const getUser = async (event) => {
        event.preventDefault();

        if (password !== repassword) {
            setAlert({ type: 'danger', message: 'Mật khẩu không trùng' });
            setTimeout(() => setAlert(null), 5000);
            return
        }

        try {
            const registerData = await registerUser(registerForm);
            if (registerData.success) {
            } else {
                setAlert({ atype: "danger", message: registerData.message });
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
                <Form.Control type="text" 
                name="username" placeholder="Nhập username ..." 
                required onChange={onRegisterForm} value={username}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-10">
                <Form.Control type="password" name="password" 
                placeholder="Nhập password ..." required 
                onChange={onRegisterForm} value={password}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-10">
                <Form.Control type="password" 
                name="repassword" placeholder="Nhập lại password ..." 
                required onChange={onRegisterForm} value={repassword}></Form.Control>
            </Form.Group>
            <Button className="mb-10" variant="success" type="submit">Đăng ký</Button>
            <p>Already have an account?<Link className="btn btn-sm btn-primary" to="/login">Đăng nhập</Link></p>

        </Form>
    )
}

export default RegisterFormComponent
