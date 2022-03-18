import UserEditForm from './UserEditForm';

const UserEdit = () => {
    return (
        <div className="container">
            <div className="row min-vh-100 pt-5 d-flex align-items-center text-black">
                <div className="col-lg-4 col-12">
                    <img src="/img/scrolling.png" className="d-block w-100 h-100 ms-lg-auto m-auto" alt="Scrolling" />
                </div>
                <div className="col-lg-8 col-12 my-5">
                    <div className="row">
                        <div className="col">
                            <h1 className="mb-3 text-lg-start text-center">Edit Profile</h1>
                        </div>
                    </div>
                    <UserEditForm />
                </div>
            </div>
        </div>
    );
};

export default UserEdit;