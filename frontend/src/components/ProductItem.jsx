import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.div`
    height: 500px;
    background: rgba(255, 255, 255, .25);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, .25);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, .18);
    overflow: auto;
`;

const CardImage = styled.div`
    width: 100%;
    height: 350px;
    overflow: hidden;
`;

const ProductItem = ({ item }) => {
    return (
        <Card className="card m-2 p-2">
            <CardImage>
                <img src={item.image} className="card-img-top m-auto" alt={item.title} />
            </CardImage>
            <div className="card-body text-center">
                <h6 className="card-title">{item.title}</h6>
                <h5 className="card-text mb-3">${item.price}</h5>
                <button className="btn btn-gold w-50"><i className="fa fa-shopping-cart"></i> Add to Cart</button>
                <a href="/products/detail" className="btn btn-beige w-50"><i className="fa fa-info-circle"></i> See Details</a>
            </div>
        </Card>
    );
};

ProductItem.propTypes = {
    item: PropTypes.object
};

export default ProductItem;