import { createContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import RegisterFormInput from './RegisterFormInput';

const FormInputContext = createContext();

const RegisterForm = () => {
    const [data, setData] = useState({
        name: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const isUsername = (value, helpers) => {
        for (let i = 0; i < value.length; i++) {
            if ((value[i] >= 'a' && value[i] <= 'z') || (value[i] >= '0' && value[i] <= '9') || value[i] === '.' || value[i] === '-' || value[i] === '_') {
                continue;
            } else {
                return helpers.message({ custom: 'Invalid username format' });
            }
        }

        return true;
    };

    const schema = Joi.object({
        name: Joi
            .string()
            .required()
            .max(50)
            .messages({
                'string.empty': 'Name field is required',
                'string.max': 'Name field should not contain more than 50 characters'
            }),
        phone: Joi
            .string()
            .required()
            .min(10)
            .max(15)
            .pattern(/^[0-9]+$/)
            .messages({
                'string.empty': 'Phone field is required',
                'string.min': 'Phone field should contain at least 10 numbers',
                'string.max': 'Phone field should not contain more than 15 numbers',
                'string.pattern.base': 'Phone can only contain numbers'
            }),
        email: Joi
            .string()
            .required()
            .email({ tlds: { allow: false } })
            .messages({
                'string.empty': 'Email field is required',
                'string.email': 'Invalid email format'
            }),
        username: Joi
            .string()
            .required()
            .max(50)
            .custom(isUsername)
            .messages({
                'string.empty': 'Username field is required',
                'string.max': 'Username field should not contain more than 50 characters',
                'string.custom': 'Invalid username format'
            }),
        password: Joi
            .string()
            .required()
            .min(8)
            .max(50)
            .messages({
                'string.empty': 'Password field is required',
                'string.min': 'Password field should contain at least 8 characters',
                'string.max': 'Password field should not contain more than 50 characters',
            }),
        confirmPassword: Joi
            .any()
            .valid(Joi.ref('password'))
            .messages({
                'any.only': 'Password does not match'
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
        <form action="/register" method="POST" className="text-lg-start text-center">
            <FormInputContext.Provider value={[data, setData, errors]}>
                <RegisterFormInput type="text" propKey="name" iconName="user" />
                <RegisterFormInput type="text" propKey="phone" iconName="phone-alt" />
                <RegisterFormInput type="text" propKey="email" iconName="envelope" />
                <RegisterFormInput type="text" propKey="username" iconName="user" />
                <RegisterFormInput type="password" propKey="password" iconName="lock-alt" />
                <RegisterFormInput type="password" propKey="confirmPassword" iconName="lock" />
            </FormInputContext.Provider>
            <button type="submit" className="btn btn-gold w-75 mb-2" onClick={validateForm}><i className="fa fa-user-plus"></i> Register</button>
            <Link to="/login" className="btn btn-beige w-75"><i className="fa fa-arrow-left"></i> Back</Link>
        </form>
    );
};

export { FormInputContext };
export default RegisterForm;