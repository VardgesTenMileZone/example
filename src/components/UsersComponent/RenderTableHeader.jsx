import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { Button, Input, Select } from "antd";

const RenderTableHeader = ({ getUserByParams }) => {
    const { Option } = Select;
    const [ searchParams, setSearchParams ] = useState({
        searchBy:"email",
        searchValue:""
    });
    const { searchBy, searchValue } = searchParams;
    const handleChange = (event) => {
        const { name,value } = event.target;
        setSearchParams({
            ...searchParams,
            [name]:value
        })
    };
    const handleChangeType = (type) => {
        setSearchParams({
            ...searchParams,
            searchBy:type
        })
    };
    const selectBefore = (
        <Select defaultValue={searchBy} value={ searchBy } style={{ width: 152 }}>
            <Option value="email" onClick={() => handleChangeType('email')}>Email</Option>
        </Select>
    );
    const handleClick = () => {
        if(searchValue === ""){
            return window.location.reload();
        }
        getUserByParams({ type: searchBy, value: searchValue })
    };
    return (
        <Row>
            <Col lg="10" md="12">
                <Row>
                    <Col md="10">
                        <Input placeholder="Search" addonAfter={ selectBefore } name="searchValue" onChange={ handleChange } />
                    </Col>
                    <Col md="2">
                        <Button className="w-100 ticket-search-btn" type="primary" onClick={ handleClick }>Search</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};

export default RenderTableHeader