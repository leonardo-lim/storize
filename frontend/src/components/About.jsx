const About = () => {
    return (
        <div className="container">
            <div className="row min-vh-100 pt-5 d-flex align-items-center text-black">
                <div className="col-lg-5 col-12">
                    <img src="/img/scrolling.png" className="w-100 d-block m-auto" alt="Scrolling" />
                </div>
                <div className="col-lg-7 col-12">
                    <div className="row mb-3">
                        <h1>Storize</h1>
                        <p>Storize is an online shopping site for people who love to shop. Storize provides a wide range of goods at affordable prices. Storize was founded in 2020 and has become a trusted shopping site for people all over the world. Currently, Storize is the number one online shopping site, especially in Indonesia.</p>
                    </div>
                    <div className="row">
                        <div className="col-4 text-center">
                            <h1><i className="fa fa-box fa-2x text-gold"></i></h1>
                            <h2>100m+</h2>
                            <h6>products sold</h6>
                        </div>
                        <div className="col-4 text-center">
                            <h1><i className="fa fa-exchange fa-2x text-gold"></i></h1>
                            <h2>50m+</h2>
                            <h6>transactions done</h6>
                        </div>
                        <div className="col-4 text-center">
                            <h1><i className="fa fa-user fa-2x text-gold"></i></h1>
                            <h2>1m+</h2>
                            <h6>actived users</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;