import { useEffect, useState } from 'react';
import CheckoutItem from './CheckoutItem';
import ShippingFee from './ShippingFee';
import OrderSummary from './OrderSummary';

const Checkout = () => {
    const [itemData, setItemData] = useState();
    const [feeIndex, setFeeIndex] = useState(0);

    useEffect(() => {
        const rawData = localStorage.getItem('items');

        if (!rawData) {
            setItemData([]);
        } else {
            setItemData(JSON.parse(rawData));
        }
    }, []);

    return (
        <div className="container min-vh-100 py-5">
            <div className="row mt-lg-5 pt-5 d-flex text-black">
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
                    {
                        itemData?.map((item) =>
                            <CheckoutItem key={item.id} item={item} />
                        )
                    }
                </div>
                <div className="col-lg-4 col-12 mb-auto">
                    <div className="row mb-3 bg-beige text-white rounded">
                        <div className="col p-4">
                            <ShippingFee feeIndex={feeIndex} setFeeIndex={setFeeIndex} />
                        </div>
                    </div>
                    <div className="row bg-beige text-white rounded">
                        <div className="col p-4">
                            <OrderSummary feeIndex={feeIndex} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;