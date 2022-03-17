import { createContext, useContext, useState } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Background from './components/Layout/Background';
import Navbar from './components/Layout/Navbar';
import Index from './components/Common/Index';
import About from './components/Common/About';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import CompletedOrder from './components/Checkout/CompletedOrder';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Product from './components/Product/Product';
import ProductDetails from './components/Product/ProductDetails';
import Footer from './components/Layout/Footer';
import NotFound from './components/Common/NotFound';

const NavbarContext = createContext();
const BodyContext = createContext();

const Layout = () => {
    const { pathname } = useLocation();
    const [amount, setAmount] = useContext(BodyContext);

    return (
        <>
            <Background />

            <NavbarContext.Provider value={[amount, setAmount]}>
                {(pathname !== '/login' && pathname !== '/register') && <Navbar />}
            </NavbarContext.Provider>

            <Outlet />

            <Footer />
        </>
    );
};

const App = () => {
    const [amount, setAmount] = useState();

    return (
        <div className="app">
            <BodyContext.Provider value={[amount, setAmount]}>
                <Routes>
                    <Route exact path="/" element={<Layout />}>
                        <Route index element={<Index />} />
                        <Route exact path="/about" element={<About />} />
                        <Route exact path="/cart" element={<Cart setAmount={setAmount} />} />
                        <Route exact path="/checkout" element={<Checkout />} />
                        <Route exact path="/completed" element={<CompletedOrder />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/products" element={<Product />} />
                        <Route exact path="/products/details/*" element={<ProductDetails setAmount={setAmount} />} />
                        <Route exact path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BodyContext.Provider>
        </div>
    );
};

export { NavbarContext };
export default App;