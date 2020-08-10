import React, { useState, useEffect } from 'react';
import { Table, Select, Input, Button } from 'antd';
import { Row, Col } from 'reactstrap';
import InfiniteScroll from "react-infinite-scroller";
import columns from './columns';
import './products.scss';

const ProductComponent = ({
    lastEvaluatedKey,
    handleActionClick,
    productsStatus,
    getProducts,
    productData,
    getProductsInfinite
}) => {
    const { Option } = Select;
    const [data, setData] = useState([]);
    const [searchType, setSearchType] = useState({
        type: 'baseEmail',
        value: ''
    });

    useEffect(() => {
        if(productData){
            if(getProductsInfinite) return setData(prevState => (prevState.concat(productData)))
            else return setData(() => (productData));
        }
    }, [productData])

    const handleChangeType = type => {
        setSearchType({
            ...searchType,
            type
        });
    }

    const searchInputChange = ({ target: { value } }) => {
        setSearchType({
            ...searchType,
            value
        });
    }

    const handleInfiniteOnLoad = () => {
        const body = {
            LastEvaluatedKey: lastEvaluatedKey
        }

        getProducts(body, 'infinite');
    }

    const searchSubmit = () => {
        const body = {
            search: {
                type: searchType.type,
                value: searchType.value
            }
        }

        getProducts(body)
    }

    const selectBefore = (
        <Select defaultValue="Email" style={{ width: 152 }}>
            <Option value="email" onClick={() => handleChangeType('baseEmail')}>Email</Option>
            <Option value="lastName" onClick={() => handleChangeType('baseLastName')}>Last Name</Option>
        </Select>
    );

    const renderTableHeader = () => {
        return (
            <Row>
                <Col lg="5" md="12">
                    <Row>
                        <Col md="10">
                            <Input placeholder="Search" addonAfter={selectBefore} onChange={searchInputChange} />
                        </Col>
                        <Col md="2">
                            <Button className="w-100 product-search-btn" type="primary" onClick={searchSubmit}>Search</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }

    return (
        <>
            <div className="products-container">
                <h2 className="markdown-header">Products</h2>
                <InfiniteScroll
                    initialLoad={false}
                    loadMore={handleInfiniteOnLoad}
                    hasMore={productsStatus !== 'pending' && lastEvaluatedKey}
                    threshold={20}
                    useWindow={false}
                >
                    <Table
                        columns={columns(handleActionClick)}
                        dataSource={data}
                        pagination={false}
                        bordered
                        title={() => (renderTableHeader())}
                    />
                </InfiniteScroll>
            </div>
        </>
    )
}

export default ProductComponent;