const CompletedOrder = () => {
    return (
        <div className="container">
            <div className="row min-vh-100 pt-5 d-flex align-items-center">
                <div className="col text-center">
                    <h1 className="text-beige"><i className="fa fa-check fa-5x"></i></h1>
                    <h2 className="text-gold">Order completed</h2>
                    <p className="text-beige">Your order will be immediately processed by the seller.</p>
                    <a href="/products" className="btn btn-gold mb-3">Shop again <i className="fa fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    );
};

export default CompletedOrder;