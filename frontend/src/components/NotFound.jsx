const NotFound = () => {
    return (
        <div className="container">
            <div className="row min-vh-100 pt-5 d-flex align-items-center text-black">
                <div className="col-lg-6 col-12">
                    <img src="/img/scrolling.png" className="w-75 d-block ms-lg-auto m-auto" alt="Scrolling" />
                </div>
                <div className="col-lg-6 col-12 text-lg-start text-center">
                    <h1 className="status">4 <i className="fa fa-frown"></i> 4</h1>
                    <h5>Looks like the page you're looking for doesn't exist</h5>
                    <a href="/" className="btn btn-gold mt-3"><i className="fa fa-arrow-left"></i> Go Back</a>
                </div>
            </div>
        </div>
    );
};

export default NotFound;