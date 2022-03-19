import { createContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Joi from 'joi';
import LoginFormInput from './LoginFormInput';

const RegisterLink = styled(Link)`
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const FormInputContext = createContext();

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
            <FormInputContext.Provider value={[data, setData, errors]}>
                <LoginFormInput type="text" propKey="username" iconName="user" />
                <LoginFormInput type="password" propKey="password" iconName="lock" />
            </FormInputContext.Provider>
            <button type="submit" className="btn btn-gold w-75 mb-2" onClick={validateForm}><i className="fa fa-sign-in"></i> Login</button>
            <Link to="/" className="btn btn-beige w-75 mb-3"><i className="fa fa-arrow-left"></i> Back</Link>
            <p>Don't have an account? <RegisterLink to="/register" className="register-link text-gold">Register</RegisterLink></p>
        </form>
    );
};

export { FormInputContext };
export default LoginForm;