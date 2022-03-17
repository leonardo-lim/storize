import RegisterForm from './RegisterForm';

const Register = () => {
    return (
        <div className="container">
            <div className="row min-vh-100 d-flex align-items-center text-black">
                <div className="col-lg-6 col-12 mt-3">
                    <img src="/img/rocket.png" className="w-75 d-block ms-lg-auto m-auto" alt="Rocket" />
                </div>
                <div className="col-lg-6 col-12 my-5">
                    <h1 className="mb-3 text-lg-start text-center">Register</h1>
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};

export default Register;