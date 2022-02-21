import { useState } from 'react';
import Joi from 'joi';

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
            <div className="form-group mb-3">
                <span className="me-2 mt-1 position-absolute"><i className="fa fa-tag text-gold"></i></span>
                <input type="text" className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline" id="name" name="name" placeholder="Enter your name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                {errors.name && <div className="alert alert-warning w-75 py-2 mb-2 m-auto float-lg-start text-start" role="alert">{errors.name}</div>}
            </div>
            <div className="form-group mb-3">
                <span className="me-2 mt-1 position-absolute"><i className="fa fa-phone-alt text-gold"></i></span>
                <input type="text" className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline" id="phone" name="phone" placeholder="Enter your phone" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
                {errors.phone && <div className="alert alert-warning w-75 py-2 mb-2 m-auto float-lg-start text-start" role="alert">{errors.phone}</div>}
            </div>
            <div className="form-group mb-3">
                <span className="me-2 mt-1 position-absolute"><i className="fa fa-envelope text-gold"></i></span>
                <input type="text" className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline" id="email" name="email" placeholder="Enter your email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                {errors.email && <div className="alert alert-warning w-75 py-2 mb-2 m-auto float-lg-start text-start" role="alert">{errors.email}</div>}
            </div>
            <div className="form-group mb-3">
                <span className="me-2 mt-1 position-absolute"><i className="fa fa-user text-gold"></i></span>
                <input type="text" className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline" id="username" name="username" placeholder="Enter your username" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
                {errors.username && <div className="alert alert-warning w-75 py-2 mb-2 m-auto float-lg-start text-start" role="alert">{errors.username}</div>}
            </div>
            <div className="form-group mb-3">
                <span className="me-2 mt-1 position-absolute"><i className="fa fa-lock-alt text-gold"></i></span>
                <input type="password" className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline" id="password" name="password" placeholder="Enter your password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                {errors.password && <div className="alert alert-warning w-75 py-2 mb-2 m-auto float-lg-start text-start" role="alert">{errors.password}</div>}
            </div>
            <div className="form-group mb-3">
                <span className="me-2 mt-1 position-absolute"><i className="fa fa-lock text-gold"></i></span>
                <input type="password" className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline" id="confirm-password" name="confirmPassword" placeholder="Confirm your password" value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />
                {errors.confirmPassword && <div className="alert alert-warning w-75 py-2 mb-2 m-auto float-lg-start text-start" role="alert">{errors.confirmPassword}</div>}
            </div>
            <button type="submit" className="btn btn-gold w-75 mb-2" onClick={validateForm}><i className="fa fa-user-plus"></i> Register</button>
            <a href="/login" className="btn btn-beige w-75"><i className="fa fa-arrow-left"></i> Back</a>
        </form>
    );
};

export default RegisterForm;