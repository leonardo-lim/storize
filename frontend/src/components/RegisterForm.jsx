import { useState } from 'react';

const RegisterForm = () => {
    const [data, setData] = useState({
        name: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    return (
        <form action="/register" method="POST" className="text-lg-start text-center">
            <div className="form-group mb-3">
                <span className="me-2 mt-1 position-absolute"><i className="fa fa-tag text-gold"></i></span>
                <input type="text" className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline" id="name" name="name" placeholder="Enter your name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
            </div>
            <div className="form-group mb-3">
                <span className="me-2 mt-1 position-absolute"><i className="fa fa-phone-alt text-gold"></i></span>
                <input type="text" className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline" id="phone" name="phone" placeholder="Enter your phone" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
            </div>
            <div className="form-group mb-3">
                <span className="me-2 mt-1 position-absolute"><i className="fa fa-envelope text-gold"></i></span>
                <input type="text" className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline" id="email" name="email" placeholder="Enter your email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            </div>
            <div className="form-group mb-3">
                <span className="me-2 mt-1 position-absolute"><i className="fa fa-user text-gold"></i></span>
                <input type="text" className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline" id="username" name="username" placeholder="Enter your username" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
            </div>
            <div className="form-group mb-3">
                <span className="me-2 mt-1 position-absolute"><i className="fa fa-lock-alt text-gold"></i></span>
                <input type="password" className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline" id="password" name="password" placeholder="Enter your password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
            </div>
            <div className="form-group mb-3">
                <span className="me-2 mt-1 position-absolute"><i className="fa fa-lock text-gold"></i></span>
                <input type="password" className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline" id="confirm-password" name="confirmPassword" placeholder="Confirm your password" value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-gold w-75 mb-2"><i className="fa fa-user-plus"></i> Register</button>
            <a href="/login" className="btn btn-beige w-75"><i className="fa fa-arrow-left"></i> Back</a>
        </form>
    );
};

export default RegisterForm;