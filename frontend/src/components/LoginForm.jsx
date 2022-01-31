import { useState } from 'react';
import styled from 'styled-components';

const RegisterLink = styled.a`
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const LoginForm = () => {
    const [data, setData] = useState({
        username: '',
        password: ''
    });

    return (
        <form action="/login" method="POST" className="text-lg-start text-center">
            <div className="form-group mb-3">
                <span className="me-2 mt-1 position-absolute"><i className="fa fa-user text-gold"></i></span>
                <input type="text" className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline" id="username" name="username" placeholder="Enter your username" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
            </div>
            <div className="form-group mb-3">
                <span className="me-2 mt-1 position-absolute"><i className="fa fa-lock text-gold"></i></span>
                <input type="password" className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline" id="password" name="password" placeholder="Enter your password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-gold w-75 mb-2"><i className="fa fa-sign-in"></i> Login</button>
            <a href="/" className="btn btn-beige w-75 mb-3"><i className="fa fa-arrow-left"></i> Back</a>
            <p>Don't have an account? <RegisterLink href="/register" className="register-link text-gold">Register</RegisterLink></p>
        </form>
    );
};

export default LoginForm;