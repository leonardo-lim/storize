import { Link } from 'react-router-dom';

const User = () => {
    return (
        <div className="container">
            <div className="row min-vh-100 pt-5 d-flex align-items-center text-black">
                <div className="col-lg-4 col-12">
                    <img src="/img/scrolling.png" className="d-block w-100 h-100 ms-lg-auto m-auto" alt="Scrolling" />
                </div>
                <div className="col-lg-8 col-12">
                    <div className="card bg-transparent w-100 border-0 m-auto float-lg-start">
                        <div className="card-body text-lg-start text-center">
                            <div className="row">
                                <div className="col">
                                    <h1 className="mb-3">My Profile</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <div>
                                        <h6 className="mb-1 text-gold"><i className="fa fa-tag"></i> Name</h6>
                                        <h6 className="card-title">-</h6>
                                    </div>
                                    <hr />
                                    <div>
                                        <h6 className="mb-1 text-gold"><i className="fa fa-user"></i> Username</h6>
                                        <h6 className="card-title">-</h6>
                                    </div>
                                    <hr />
                                    <div>
                                        <h6 className="mb-1 text-gold"><i className="fa fa-envelope"></i> Email</h6>
                                        <h6 className="card-title">-</h6>
                                    </div>
                                    <hr />
                                    <div>
                                        <h6 className="mb-1 text-gold"><i className="fa fa-phone-alt"></i> Phone</h6>
                                        <h6 className="card-title">-</h6>
                                    </div>
                                    <hr />
                                    <div>
                                        <h6 className="mb-1 text-gold"><i className="fa fa-clock"></i> Joined From</h6>
                                        <h6 className="card-title">-</h6>
                                    </div>
                                    <hr />
                                </div>
                                <div className="col-lg-6 col-12">
                                    <div>
                                        <h6 className="mb-1 text-gold"><i className="fa fa-map-marker-alt"></i> Address</h6>
                                        <h6 className="card-title>">-</h6>
                                    </div>
                                    <hr />
                                    <div>
                                        <h6 className="mb-1 text-gold"><i className="fa fa-city"></i> City</h6>
                                        <h6 className="card-title>">-</h6>
                                    </div>
                                    <hr />
                                    <div>
                                        <h6 className="mb-1 text-gold"><i className="fa fa-globe"></i> Country</h6>
                                        <h6 className="card-title>">-</h6>
                                    </div>
                                    <hr />
                                    <div>
                                        <h6 className="mb-1 text-gold"><i className="fa fa-mailbox"></i> Zip Code</h6>
                                        <h6 className="card-title>">-</h6>
                                    </div>
                                    <hr />
                                    <Link to="/users/edit" className="btn btn-gold w-100 mt-2"><i className="fa fa-pencil"></i> Edit</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;