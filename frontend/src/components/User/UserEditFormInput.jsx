import { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormInputContext } from './UserEditForm';

const UserEditFormInput = ({ propKey, iconName, readOnly }) => {
    const [data, setData, errors] = useContext(FormInputContext);

    const handleChange = (e) => {
        const { value } = e.target;
        setData({ ...data, [propKey]: value });
    };

    return (
        <div className="form-group mb-3">
            <span className="me-2 mt-1 position-absolute"><i className={`fa fa-${iconName} text-gold`}></i></span>
            <input type="text" className="form-control bg-transparent ps-4 border-0 border-bottom rounded-0 d-inline" name={propKey} placeholder={`Enter your ${propKey}`} value={data[propKey]} onChange={handleChange} readOnly={readOnly} />
            {errors[propKey] && <div className="alert alert-warning w-100 py-2 mb-2 m-auto float-lg-start text-start" role="alert">{errors[propKey]}</div>}
        </div>
    );
};

UserEditFormInput.propTypes = {
    propKey: PropTypes.string,
    iconName: PropTypes.string,
    readOnly: PropTypes.bool
};

export default UserEditFormInput;