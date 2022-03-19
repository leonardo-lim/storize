import { createContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import UserEditFormInput from './UserEditFormInput';

const FormInputContext = createContext();

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
                <FormInputContext.Provider value={[data, setData, errors]}>
                    <div className="col-lg-6 col-12">
                        <UserEditFormInput propKey="name" iconName="tag" readOnly={false} />
                        <UserEditFormInput propKey="phone" iconName="phone-alt" readOnly={false} />
                        <UserEditFormInput propKey="email" iconName="envelope" readOnly={true} />
                        <UserEditFormInput propKey="username" iconName="user" readOnly={false} />
                    </div>
                    <div className="col-lg-6 col-12">
                        <UserEditFormInput propKey="address" iconName="map-marker-alt" readOnly={false} />
                        <UserEditFormInput propKey="city" iconName="city" readOnly={false} />
                        <UserEditFormInput propKey="country" iconName="globe" readOnly={false} />
                        <UserEditFormInput propKey="zipCode" iconName="mailbox" readOnly={false} />
                    </div>
                </FormInputContext.Provider>
            </div>
            <button type="submit" className="btn btn-gold w-100 mb-2" onClick={validateForm}><i className="fa fa-arrow-up"></i> Update</button>
            <Link to="/users" className="btn btn-beige w-100"><i className="fa fa-arrow-left"></i> Back</Link>
        </form>
    );
};

export { FormInputContext };
export default UserEditForm;