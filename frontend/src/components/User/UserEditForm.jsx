import { useState } from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi';

const UserEditForm = () => {
    const [data, setData] = useState({
        name: '-',
        phone: '-',
        email: '-',
        username: '-',
        address: '',
        city: '',
        country: '',
        zipCode: ''
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
            .string(),
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
        address: Joi
            .string()
            .allow(''),
        city: Joi
            .string()
            .allow(''),
        country: Joi
            .string()
            .allow(''),
        zipCode: Joi
            .number()
            .allow('')
            .messages({
                'number.base': 'Zip code can only contain numbers'
            }),
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
        <form action="/users/update" method="POST" className="text-lg-start text-center">
            <div className="row">
                <div className="col-lg-6 col-12">
                    <div className="form-group mb-3">
                        <span className="me-2 mt-1 position-absolute"><i className="fa fa-tag text-gold"></i></span>
                        <input type="text" className="form-control bg-transparent ps-4 border-0 border-bottom rounded-0 d-inline" id="name" name="name" placeholder="Enter your name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                        {errors.name && <div className="alert alert-warning w-100 py-2 mb-2 m-auto float-lg-start text-start" role="alert">{errors.name}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <span className="me-2 mt-1 position-absolute"><i className="fa fa-phone-alt text-gold"></i></span>
                        <input type="text" className="form-control bg-transparent ps-4 border-0 border-bottom rounded-0 d-inline" id="phone" name="phone" placeholder="Enter your phone" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
                        {errors.phone && <div className="alert alert-warning w-100 py-2 mb-2 m-auto float-lg-start text-start" role="alert">{errors.phone}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <span className="me-2 mt-1 position-absolute"><i className="fa fa-envelope text-gold"></i></span>
                        <input type="text" className="form-control bg-transparent ps-4 border-0 border-bottom rounded-0 d-inline" id="email" name="email" placeholder="Enter your email" value={data.email} readOnly />
                        {errors.email && <div className="alert alert-warning w-100 py-2 mb-2 m-auto float-lg-start text-start" role="alert">{errors.email}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <span className="me-2 mt-1 position-absolute"><i className="fa fa-user text-gold"></i></span>
                        <input type="text" className="form-control bg-transparent ps-4 border-0 border-bottom rounded-0 d-inline" id="username" name="username" placeholder="Enter your username" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
                        {errors.username && <div className="alert alert-warning w-100 py-2 mb-2 m-auto float-lg-start text-start" role="alert">{errors.username}</div>}
                    </div>
                </div>
                <div className="col-lg-6 col-12">
                    <div className="form-group mb-3">
                        <span className="me-2 mt-1 position-absolute"><i className="fa fa-map-marker-alt text-gold"></i></span>
                        <input type="text" className="form-control bg-transparent ps-4 border-0 border-bottom rounded-0 d-inline" id="address" name="address" placeholder="Enter your address" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
                        {errors.address && <div className="alert alert-warning w-100 py-2 mb-2 m-auto float-lg-start text-start" role="alert">{errors.address}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <span className="me-2 mt-1 position-absolute"><i className="fa fa-city text-gold"></i></span>
                        <input type="text" className="form-control bg-transparent ps-4 border-0 border-bottom rounded-0 d-inline" id="city" name="city" placeholder="Enter your city" value={data.city} onChange={(e) => setData({ ...data, city: e.target.value })} />
                        {errors.city && <div className="alert alert-warning w-100 py-2 mb-2 m-auto float-lg-start text-start" role="alert">{errors.city}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <span className="me-2 mt-1 position-absolute"><i className="fa fa-globe text-gold"></i></span>
                        <input type="text" className="form-control bg-transparent ps-4 border-0 border-bottom rounded-0 d-inline" id="country" name="country" placeholder="Enter your country" value={data.country} onChange={(e) => setData({ ...data, country: e.target.value })} />
                        {errors.country && <div className="alert alert-warning w-100 py-2 mb-2 m-auto float-lg-start text-start" role="alert">{errors.country}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <span className="me-2 mt-1 position-absolute"><i className="fa fa-mailbox text-gold"></i></span>
                        <input type="text" className="form-control bg-transparent ps-4 border-0 border-bottom rounded-0 d-inline" id="zip-code" name="zipCode" placeholder="Enter your zip code" value={data.zipCode} onChange={(e) => setData({ ...data, zipCode: e.target.value })} />
                        {errors.zipCode && <div className="alert alert-warning w-100 py-2 mb-2 m-auto float-lg-start text-start" role="alert">{errors.zipCode}</div>}
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-gold w-100 mb-2" onClick={validateForm}><i className="fa fa-arrow-up"></i> Update</button>
            <Link to="/users" className="btn btn-beige w-100"><i className="fa fa-arrow-left"></i> Back</Link>
        </form>
    );
};

export default UserEditForm;