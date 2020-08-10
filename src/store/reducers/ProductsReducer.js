import {
    GET_PRODUCT,
    GET_ONE_PRODUCT
} from '../constants'

const defaultState = {
    getProductsData: null,
    getProductsStatus: null,
    lastEvaluatedKey: null,
    getProductsInfinite: false,

    getOneProductData: null,
    getOneProductStatus: null
};

const productsReducer = (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_PRODUCT.PENDING:
            return {
                ...state,
                getProductsStatus: 'pending',
                getProductsData: null,
                lastEvaluatedKey: null,
                getProductsInfinite: false
            };
        case GET_PRODUCT.SUCCESS:
            return {
                ...state,
                getProductsData: payload.data,
                lastEvaluatedKey: payload.lastEvaluatedKey,
                getProductsStatus: 'success',
                getProductsInfinite: payload.infinite,
            };
        case GET_PRODUCT.ERROR:
            return {
                ...state,
                getProductsData: null,
                lastEvaluatedKey: null,
                getProductsInfinite: false,
                getProductsStatus: 'error'
            };
        case GET_ONE_PRODUCT.PENDING:
            return {
                ...state,
                getOneProductData: null,
                getOneProductStatus: 'pending'
            };
        case GET_ONE_PRODUCT.SUCCESS:
            return {
                ...state,
                getOneProductData: payload,
                getOneProductStatus: 'success'
            };
        case GET_ONE_PRODUCT.ERROR:
            return {
                ...state,
                getOneProductData: payload,
                getOneProductStatus: 'error'
            };
        default:
            return state;
    }
};

export default productsReducer;
