import { createContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartItem from './CartItem';

const CartItemContext = createContext();

const Cart = ({ setAmount }) => {
    const [itemData, setItemData] = useState();
    const [subtotalPrice, setSubtotalPrice] = useState();

    const updateSubtotalPrice = () => {
        const newSubtotalPrice = itemData.reduce((total, current) => {
            return total + parseFloat(current.price);
        }, 0);

        setSubtotalPrice(newSubtotalPrice.toFixed(2));
    };

    useEffect(() => {
        const rawData = localStorage.getItem('items');

        if (!rawData) {
            setItemData([]);
        } else {
            const data = JSON.parse(rawData);

            const newSubtotalPrice = data.reduce((total, current) => {
                return total + parseFloat(current.price);
            }, 0);

            setItemData(data);
            setSubtotalPrice(newSubtotalPrice.toFixed(2));
        }
    }, []);

    return (
        <div className="container min-vh-100 py-5">
            <div className="row mt-lg-5 pt-5 d-flex align-items-center text-black">
                {
                    itemData?.length === 0 ? (
                        <>
                            <div className="col-lg-6 col-12">
                                <img src="/img/motorcycle.png" className="w-75 d-block ms-lg-auto m-auto" alt="Motorcycle" />
                            </div>
                            <div className="col-lg-6 col-12 my-5 text-lg-start text-center">
                                <h1 className="status"><i className="fa fa-shopping-cart"></i> <i className="fa fa-frown"></i></h1>
                                <h5>Looks like your cart is empty</h5>
                                <Link to="/products" className="btn btn-gold mt-3"><i className="fa fa-arrow-right"></i> Start Shopping</Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col-lg-8 col-12 text-center pe-lg-5">
                                <div className="row my-3">
                                    <div className="col-md-2 col-6">
                                        <h6>IMAGE</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6>TITLE</h6>
                                    </div>
                                    <div className="col-md-2 col-6">
                                        <h6>QTY</h6>
                                    </div>
                                    <div className="col-md-2 col-6">
                                        <h6>PRICE</h6>
                                    </div>
                                </div>
                                <hr />

                                <CartItemContext.Provider value={[
                                    itemData,
                                    setItemData,
                                    setAmount,
                                    updateSubtotalPrice
                                ]}>
                                    {
                                        itemData?.map((item, i) =>
                                            <CartItem
                                                key={item.id}
                                                item={item}
                                                i={i} />
                                        )
                                    }
                                </CartItemContext.Provider>
                            </div>
                            <div className="col-lg-4 col-12 mb-auto">
                                <div className="row bg-beige text-center text-white rounded">
                                    <div className="col p-4">
                                        <h6>Subtotal Price</h6>
                                        <hr />
                                        <h1 className="mb-3">${subtotalPrice}</h1>
                                        <Link to="/checkout" className="btn btn-gold w-100">Checkout</Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div >
    );
};

Cart.propTypes = {
    setAmount: PropTypes.func
};

export { CartItemContext };
export default Cart;