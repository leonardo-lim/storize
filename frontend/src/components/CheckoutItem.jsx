import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProductImage = styled.div`
    width: 100%;
    height: 120px;
    overflow: hidden;
`;

const CheckoutItem = ({ item }) => {
    return (
        <>
            <div className="row align-items-center">
                <div className="col-md-2 col-6">
                    <ProductImage>
                        <img src={item.image} className="w-100" alt={item.title} />
                    </ProductImage>
                </div>
                <div className="col-6">
                    <h6 className="px-2">{item.title}</h6>
                </div>
                <div className="col-md-2 col-6 mt-md-0 mt-3 ">
                    <h6>{item.quantity}</h6>
                </div>
                <div className="col-md-2 col-6 mt-md-0 mt-3 ">
                    <h6>${item.price}</h6>
                </div>
            </div>
            <hr />
        </>
    );
};

CheckoutItem.propTypes = {
    item: PropTypes.object
};

export default CheckoutItem;