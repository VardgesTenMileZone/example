import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../store/actions/ProductsAction';
import InnerPageComponent from '../../components/InnerPageComponent/InnerPageComponent';
import Spinner from '../../components/SpinnerComponent/SpinnerComponent';
import ProductComponent from '../../components/ProductComponent/ProductComponent';

const ProductContainer = ({
    getProducts,
    products: { getProductsData, getProductsStatus, getProductsInfinite, lastEvaluatedKey }
}) => {
    useEffect(() => {
        getProducts({});
    }, [])

    const handleActionClick = (name, id) => {
        if(name === 'View') return window.location.href = `/product/${id}`;
    }

    return (
        <>
            { getProductsStatus === 'pending' && <Spinner /> }
            <InnerPageComponent>
                <ProductComponent 
                    data={getProductsData}
                    getProductsInfinite={getProductsInfinite}
                    handleActionClick={handleActionClick}
                    lastEvaluatedKey={lastEvaluatedKey}
                    productsStatus={getProductsStatus}
                    getProducts={getProducts}
                    productData={getProductsData}
                />
            </InnerPageComponent>
        </>
    )
}

const mapStateToProps = state => ({
    products: state.products
});

const mapDispatchToProps = dispatch => ({
    getProducts: (body, infinite) => dispatch(getProducts(body, infinite))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);