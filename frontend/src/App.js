import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Index from './components/Index';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Product from './components/Product';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

const App = () => {
    const location = useLocation();

    return (
        <div className="app">
            <Background />
            {(location.pathname !== '/login' && location.pathname !== '/register') && <Navbar />}
            <Routes>
                <Route exact path="/" element={<Index />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/products" element={<Product />} />
                <Route exact path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;