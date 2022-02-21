import LoginForm from './LoginForm';

const Login = () => {
    return (
        <div className="container">
            <div className="row min-vh-100 d-flex align-items-center text-black">
                <div className="col-lg-6 col-12">
                    <img src="/img/motorcycle.png" className="w-75 d-block ms-lg-auto m-auto" alt="Motorcycle" />
                </div>
                <div className="col-lg-6 col-12 my-5">
                    <h1 className="mb-3 text-lg-start text-center">Login</h1>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default Login;