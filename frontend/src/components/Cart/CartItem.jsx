import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CartItemContext } from './Cart';

const ProductImage = styled.div`
    width: 100%;
    height: 120px;
    overflow: hidden;
`;

const Quantity = styled.input`
    width: 45px;
    height: 30px;
    border: none;
    outline: none;
`;

const CartItem = ({ item, i }) => {
    const [
        itemData,
        setItemData,
        setAmount,
        updateSubtotalPrice
    ] = useContext(CartItemContext);

    const decreaseQuantity = (idx) => {
        if (item.quantity > 1) {
            const updatedItemData = [...itemData];
            const currentItem = updatedItemData[idx];

            currentItem.quantity--;
            const price = currentItem.unitPrice * currentItem.quantity;

            currentItem.price = price.toFixed(2);
            currentItem.quantityError = false;

            setItemData(updatedItemData);
        }
    };

    const updateQuantity = (e, idx) => {
        const quantity = parseInt(e.target.value);

        if (isNaN(quantity)) {
            const updatedItemData = [...itemData];

            updatedItemData.splice(idx, 1);
            setItemData(updatedItemData);
            setAmount(itemData?.length - 1);

            localStorage.setItem('items', JSON.stringify(updatedItemData));
        } else if (quantity >= 1 && quantity <= itemData[idx].rating.count) {
            const updatedItemData = [...itemData];
            const currentItem = updatedItemData[idx];

            currentItem.quantity = quantity;
            const price = currentItem.unitPrice * currentItem.quantity;

            currentItem.price = price.toFixed(2);
            currentItem.quantityError = false;

            setItemData(updatedItemData);
        } else if (quantity > itemData[idx].rating.count) {
            const updatedItemData = [...itemData];

            updatedItemData[idx].quantityError = true;
            setItemData(updatedItemData);
        }
    };

    const increaseQuantity = (idx) => {
        if (itemData[idx].quantity < itemData[idx].rating.count) {
            const updatedItemData = [...itemData];
            const currentItem = updatedItemData[idx];

            currentItem.quantity++;
            const price = currentItem.unitPrice * currentItem.quantity;

            currentItem.price = price.toFixed(2);
            currentItem.quantityError = false;

            setItemData(updatedItemData);
        }
    };

    const removeItem = (idx) => {
        const updatedItemData = [...itemData];

        updatedItemData.splice(idx, 1);
        setItemData(updatedItemData);
        setAmount(itemData?.length - 1);

        // Why should we keep this line?
        // Because the 'useEffect' below does not detect changes in itemData
        // when it is empty (empty object / array does not reference well)
        localStorage.setItem('items', JSON.stringify(updatedItemData));
    };

    // Update the 'items' in local storage when 'setItemData' is called.
    // We need this because 'itemData' is a React State.
    // This 'useEffect' will detect 'itemData' updates.
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(itemData));
        updateSubtotalPrice();
    }, [itemData]);

    return (
        <>
            <div className="row align-items-center">
                <div className="col-md-2 col-6">
                    <ProductImage>
                        <a href={`/products/details/${item.id}`}>
                            <img src={item.image} className="w-100" alt={item.title} />
                        </a>
                    </ProductImage>
                </div>
                <div className="col-6">
                    <h6 className="px-2">{item.title}</h6>
                </div>
                <div className="col-md-2 col-6 mt-md-0 mt-3 bg-beige text-center rounded">
                    <button className="btn text-white p-0" onClick={() => decreaseQuantity(i)}><i className="fa fa-minus"></i></button>
                    <Quantity type="text" className="bg-transparent text-center text-white mx-1 fs-5" value={item.quantity} onChange={(e) => updateQuantity(e, i)} />
                    <button className="btn text-white p-0" onClick={() => increaseQuantity(i)}><i className="fa fa-plus"></i></button>
                    <br />
                    <button className="btn text-white" title="Remove" onClick={() => removeItem(i)}><i className="fa fa-trash"></i></button>
                </div>
                <div className="col-md-2 col-6 mt-md-0 mt-3">
                    <h6>${item.price}</h6>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {item.quantityError && <p className="alert alert-warning p-2">Max purchased item is {item.rating.count}</p>}
                </div>
            </div>
            <hr />
        </>
    );
};

CartItem.propTypes = {
    item: PropTypes.object,
    i: PropTypes.number
};

export default CartItem;