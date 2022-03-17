import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Tagline = styled.h1`
    font-size: 4vw;
`;

const Img = styled.img`
    width: auto;
    height: 35vh;

    @media (min-width: 576px) {
        & {
            width: auto;
            height: 50vh;
        }
    }

    @media (min-width: 992px) {
        & {
            width: auto;
            height: 65vh;
        }
    }
`;

const Index = () => {
    return (
        <div className="container">
            <div className="row min-vh-100 pt-5 d-flex align-items-center text-black">
                <div className="col-lg-7 col-12">
                    <Tagline>Your reliable and</Tagline>
                    <Tagline>most updated</Tagline>
                    <Tagline>shopping site</Tagline>
                    <Link to="/products" className="btn btn-gold mt-3">Explore <i className="fa fa-arrow-right"></i></Link>
                </div>
                <div className="col-lg-5 col-12">
                    <Img src="/img/scrolling.png" className="d-block ms-auto" alt="Scrolling" />
                </div>
            </div>
        </div>
    );
};

export default Index;