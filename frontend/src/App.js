import { createContext, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Index from './components/Index';
import About from './components/About';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import CompletedOrder from './components/CompletedOrder';
import Login from './components/Login';
import Register from './components/Register';
import Product from './components/Product';
import ProductDetails from './components/ProductDetails';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

const NavbarContext = createContext();

const App = () => {
    const { pathname } = useLocation();
    const [amount, setAmount] = useState();

    return (
        <div className="app">
            <Background />

            <NavbarContext.Provider value={[amount, setAmount]}>
                {(pathname !== '/login' && pathname !== '/register') && <Navbar />}
            </NavbarContext.Provider>

            <Routes>
                <Route exact path="/" element={<Index />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/cart" element={<Cart setAmount={setAmount} />} />
                <Route exact path="/checkout" element={<Checkout />} />
                <Route exact path="/completed" element={<CompletedOrder />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/products" element={<Product />} />
                <Route exact path="/products/details/*" element={<ProductDetails setAmount={setAmount} />} />
                <Route exact path="*" element={<NotFound />} />
            </Routes>

            <Footer />
        </div>
    );
};

export { NavbarContext };
export default App;