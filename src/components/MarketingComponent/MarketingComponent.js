import React, { useState } from 'react';
import { Button } from 'antd';
import moment from 'moment';
import "./MarketingComponent.scss"

const MarketingComponent = ({
    marketingSubmit,
    marketingData
}) => {
    const [data, setData] = useState({
        marketingDate: null
    })
    const handleSubmit = () => {
        let date = [];
        if (data.marketingDate === 'Same Day') {
            date.push(moment().format('YYYY-MM-DD'));
        } else if (data.marketingDate === '7 Days') {
            for(let i = 0; i <= 7; i++){
                date.push(moment().add(i, 'days').format('YYYY-MM-DD'));
            }
        }
        const body = {
            dates: date
        }
        marketingSubmit(body)
    }
    return (
        <>
            <div className="marketing-component">
                <h1 className="reports-heading markdown-header">Reports</h1>
                <div className="d-flex">
                    <Button className="ml-4" type="primary" onClick={handleSubmit}>Submit</Button>
                </div>
                {marketingData.reportsStatus === 'success' && (
                    <>
                        <div className="d-flex mt-5 align-items-center">
                            <h4 className="mb-0">Detail:</h4>
                            <a download href={marketingData && marketingData.data && marketingData.data.data.link} target="_blank" className="ml-3">{marketingData && marketingData.data && marketingData.data.data.link}</a>
                        </div>
                    </>
                )}
            </div>
        </>
    )
};

export default MarketingComponent;