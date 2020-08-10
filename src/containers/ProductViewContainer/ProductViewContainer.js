import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOneProducts } from '../../store/actions/ProductsAction';
import InnerPageComponent from '../../components/InnerPageComponent/InnerPageComponent';
import Spinner from '../../components/SpinnerComponent/SpinnerComponent';
import ProductViewComponent from '../../components/ProductViewComponent/ProductViewComponent';

const ProductViewContainer = ({
    products: { getOneProductData, getOneProductStatus },
    getOneProducts,
    match
}) => {
    useEffect(() => {
        const { id } = match.params;

        getOneProducts(id);
    }, [])
    return (
        <>
            { getOneProductStatus === 'pending' && <Spinner /> }
            <InnerPageComponent>
                <ProductViewComponent 
                    data={getOneProductData ? getOneProductData.result : null}
                />
            </InnerPageComponent>
        </>
    )
}

const mapStateToProps = state => ({
    products: state.products
});

const mapDispatchToProps = dispatch => ({
    getOneProducts: id => dispatch(getOneProducts(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductViewContainer);