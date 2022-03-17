import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const OrderSummary = ({ feeIndex }) => {
    const [subtotalPrice, setSubtotalPrice] = useState();
    const [taxPrice, setTaxPrice] = useState();
    const [shippingPrice, setShippingPrice] = useState();
    const [totalPrice, setTotalPrice] = useState();

    const completeOrder = () => {
        localStorage.setItem('items', JSON.stringify([]));
    };

    useEffect(() => {
        const rawData = localStorage.getItem('items');
        const data = JSON.parse(rawData);

        const newSubtotalPrice = data.reduce((total, current) => {
            return total + parseFloat(current.price);
        }, 0);

        const newTaxPrice = newSubtotalPrice / 10;
        let newShippingPrice;

        if (feeIndex === 0) {
            newShippingPrice = 0;
        } else if (feeIndex === 1) {
            newShippingPrice = 1;
        } else {
            newShippingPrice = 5;
        }

        const newTotalPrice = newSubtotalPrice + newTaxPrice + newShippingPrice;

        setSubtotalPrice(newSubtotalPrice.toFixed(2));
        setTaxPrice(newTaxPrice.toFixed(2));
        setShippingPrice(newShippingPrice.toFixed(2));
        setTotalPrice(newTotalPrice.toFixed(2));
    }, [feeIndex]);

    return (
        <>
            <h3>Order Summary</h3>
            <hr />
            <div className="row mb-2">
                <div className="col-6 text-start">
                    <h6>Subtotal price</h6>
                </div>
                <div className="col-6 text-end">
                    <h6>${subtotalPrice}</h6>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-6 text-start">
                    <h6>Tax price</h6>
                </div>
                <div className="col-6 text-end">
                    <h6>${taxPrice}</h6>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-6 text-start">
                    <h6>Shipping price</h6>
                </div>
                <div className="col-6 text-end">
                    <h6>${shippingPrice}</h6>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-6 text-start">
                    <h6 className="fw-bold">Total price</h6>
                </div>
                <div className="col-6 text-end">
                    <h6 className="fw-bold">${totalPrice}</h6>
                </div>
            </div>
            <Link to="/completed" className="btn btn-gold w-100" onClick={completeOrder}>Complete Order</Link>
        </>
    );
};

OrderSummary.propTypes = {
    feeIndex: PropTypes.number
};

export default OrderSummary;