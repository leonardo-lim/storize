import { useState } from 'react';
import styled from 'styled-components';
import Joi from 'joi';

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

    const [errors, setErrors] = useState({});

    const schema = Joi.object({
        username: Joi
            .string()
            .required()
            .messages({
                'string.empty': 'Username field is required'
            }),
        password: Joi
            .string()
            .required()
            .messages({
                'string.empty': 'Password field is required'
            })
    });

    const validateForm = (e) => {
        const result = schema.validate(data, { abortEarly: false });
        const { error } = result;

        if (error) {
            e.preventDefault();

            const errorData = {};

            for (const err of error.details) {
                const name = err.path[0];
                const message = err.message;
                errorData[name] = message;
            }

            setErrors(errorData);
        }
    };

    return (
        <form action="/login" method="POST" className="text-lg-start text-center">
            <div className="form-group mb-3">
                <span className="me-2 mt-1 position-absolute"><i className="fa fa-user text-gold"></i></span>
                <input type="text" className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline" id="username" name="username" placeholder="Enter your username" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
                {errors.username && <div className="alert alert-warning w-75 py-2 mb-2 m-auto float-lg-start text-start" role="alert">{errors.username}</div>}
            </div>
            <div className="form-group mb-3">
                <span className="me-2 mt-1 position-absolute"><i className="fa fa-lock text-gold"></i></span>
                <input type="password" className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline" id="password" name="password" placeholder="Enter your password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                {errors.password && <div className="alert alert-warning w-75 py-2 mb-2 m-auto float-lg-start text-start" role="alert">{errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-gold w-75 mb-2" onClick={validateForm}><i className="fa fa-sign-in"></i> Login</button>
            <a href="/" className="btn btn-beige w-75 mb-3"><i className="fa fa-arrow-left"></i> Back</a>
            <p>Don't have an account? <RegisterLink href="/register" className="register-link text-gold">Register</RegisterLink></p>
        </form>
    );
};

export default LoginForm;