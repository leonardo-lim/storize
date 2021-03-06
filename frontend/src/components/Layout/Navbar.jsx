import { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { NavbarContext } from '../../App';

const Nav = styled.nav`
    z-index: 1;

    .navbar-collapse {
        background-color: #fff;
        box-shadow: rgba(149, 157, 165, .2) 0 8px 24px;
    }

    @media (min-width: 975px) {
        .navbar-collapse {
            background-color: transparent;
            box-shadow: none;
        }
    }
`;

const Amount = styled.span`
    position: absolute;
    top: -10px;
    margin-left: 2px;
    padding: 0 5px;
`;

const Navbar = () => {
    const [amount, setAmount] = useContext(NavbarContext);
    const { pathname } = useLocation();

    useEffect(() => {
        const rawData = localStorage.getItem('items');
        let data;

        if (!rawData) {
            data = [];
        } else {
            data = JSON.parse(rawData);
        }

        setAmount(data?.length);
    }, []);

    return (
        <Nav className="navbar navbar-expand-lg navbar-light bg-transparent position-absolute w-100 mt-lg-5 mt-2 text-black">
            <div className="container">
                <Link to="/" className="navbar-brand fs-1 text-gold">Storize</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse mt-lg-0 mt-2 pb-lg-0 pb-3 rounded" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/products" className={`nav-link ${pathname.includes('/products') && 'active'} fs-5 mx-3`}>Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className={`nav-link ${pathname === '/about' && 'active'} fs-5 mx-3`}>About</Link>
                        </li>
                    </ul>
                    <form className="d-flex ms-auto position-relative">
                        <Link to="/cart" className="btn btn-beige ms-3" title="Cart"><i className="fa fa-shopping-cart"></i>
                            {amount > 0 && <Amount className="bg-danger rounded">{amount}</Amount>}
                        </Link>
                        <Link to="/login" className="btn btn-gold ms-3"><i className="fa fa-sign-in"></i> Login</Link>
                    </form>
                </div>
            </div>
        </Nav>
    );
};

export default Navbar;