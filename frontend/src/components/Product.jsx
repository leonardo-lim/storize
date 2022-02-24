import { useEffect, useState } from 'react';
import FetchLoading from './FetchLoading';
import ProductItem from './ProductItem';

const Product = () => {
    const [items, setItems] = useState([]);
    const [showFetchLoading, setShowFetchLoading] = useState(false);

    const getItems = () => {
        setShowFetchLoading(true);

        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => {
                setShowFetchLoading(false);
                setItems(data);
            });
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <div className="container min-vh-100 py-5">
            {showFetchLoading && <FetchLoading />}

            <div className="row mt-lg-5 pt-5 d-flex justify-content-center text-black">
                {
                    items.map((item) => {
                        return (
                            <div key={item.id} className="col-lg-4 col-md-6 col-12 p-0">
                                <ProductItem item={item} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Product;