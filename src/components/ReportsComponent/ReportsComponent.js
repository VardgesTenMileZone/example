import React, { useState } from 'react';
import { Dropdown, Button, Icon, Menu } from 'antd';
import './ReportsComponent.scss'

const ReportsComponent = ({
    handleClick,
    data,
    reportsStatus,
    seasonReport: { seasonReportData, seasonReportStatus },
    ridershipReports: { ridershipReportsData, ridershipReportsStatus },
    seasonReportGetDownload,
    getRidershipReports
}) => {
    const [reportData, setReportData] = useState({
        year: null,
        month: null
    });

    const [ state, setState ] = useState({
        ridershipOpen:false
    });
    const { ridershipOpen } = state

    const handleYearChange = item => {
        setReportData({
            ...reportData,
            year: item.item.props.children
        })
    }

    const handleMonthChange = item => {
        setReportData({
            ...reportData,
            month: item.item.props.children
        })
    }

    const handleSeasonClick = () => {
        seasonReportGetDownload();
    }

    const handleRidershipClick = () => {
        getRidershipReports();
    }

    const yearMenu = (
        <Menu onClick={handleYearChange}>
            <Menu.Item>2019</Menu.Item>
            <Menu.Item>2020</Menu.Item>
        </Menu>
    )

    const mounthMenu = (
        <Menu onClick={handleMonthChange}>
            <Menu.Item>1</Menu.Item>
            <Menu.Item>2</Menu.Item>
            <Menu.Item>3</Menu.Item>
            <Menu.Item>4</Menu.Item>
            <Menu.Item>5</Menu.Item>
            <Menu.Item>6</Menu.Item>
            <Menu.Item>7</Menu.Item>
            <Menu.Item>8</Menu.Item>
            <Menu.Item>9</Menu.Item>
            <Menu.Item>10</Menu.Item>
            <Menu.Item>11</Menu.Item>
            <Menu.Item>12</Menu.Item>
        </Menu>
    );
    const openRidership = () => {
        setState({
            ...state,
            ridershipOpen:!ridershipOpen
        })
    }
    
    return (
        <>
            <div className="reports-container">
                <h1 className="reports-heading markdown-header">Reports</h1>
                <div className="reports-container-content">
                    <Dropdown overlay={yearMenu} trigger={['click']}>
                        <Button className="reports-button">
                            {reportData.year ? reportData.year : 'Year'} <Icon type="down" />
                        </Button>
                    </Dropdown>
                    <Dropdown overlay={mounthMenu} trigger={['click']}>
                        <Button className="reports-button latest">
                            {reportData.month ? reportData.month : 'Month'} <Icon type="down" />
                        </Button>
                    </Dropdown>
                    <Button className="ml-4" type="primary" onClick={() => handleClick(reportData)}>Submit</Button>
                </div>
                {reportsStatus === 'success' && (
                    <>
                        <div className="download-reports mt-5">
                            <h4 className="mb-0">Detail:</h4>
                            <a download href={data.link} target="_blank">{data.link}</a>
                        </div>
                        <div className="download-reports mt-5">
                            <h4 className="mb-0">Total:</h4>
                            <a download href={data.link2} target="_blank">{data.link2}</a>
                        </div>
                    </>
                )}
            </div>
            <div className="reports-container mt-5">
                <h1 className="reports-heading markdown-header">Season Reports</h1>
                <div className="reports-container-content">
                    <Button type="primary" onClick={() => handleSeasonClick(reportData)}>Submit</Button>
                </div>
                {seasonReportStatus === 'success' && (
                    <>
                        <div className="download-reports mt-5">
                            <h4 className="mb-0">Detail:</h4>
                            <a download href={seasonReportData.link} target="_blank">{seasonReportData.link}</a>
                        </div>
                        {/* <div className="download-reports mt-5">
                            <h4 className="mb-0">Total:</h4>
                            <a download href={data.link2} target="_blank">{data.link2}</a>
                        </div> */}
                    </>
                )}
            </div>
            <div className="reports-container mt-5">
                <h1 className="reports-heading markdown-header">Ridership Report</h1>
                <div className="reports-container-content">
                    <Button type="primary" onClick={() => handleRidershipClick()}>Submit</Button>
                </div>
                {ridershipReportsStatus === 'success' && (
                    <>
                        <div className="download-reports mt-5">
                            <h4 className="mb-0">Detail:</h4>
                            <a download href={ridershipReportsData.link} target="_blank">{ridershipReportsData.link}</a>
                        </div>
                    </>
                )}
            </div>
            <div className="reports-container mt-5">
                <h1 className="reports-heading markdown-header">Ridership Extended</h1>
                <div className="reports-container-content">
                    <Button type="primary" onClick={() => openRidership()}>Submit</Button>
                </div>
                {ridershipOpen &&
                    <>
                        <div className="download-reports mt-5">
                            <h4 className="mb-0">Detail:</h4>
                            <a href={`https://snowbus-reports-${process.env.REACT_APP_STAGE}.s3.amazonaws.com/fullRiders_extended.csv`} target="_blank">https://snowbus-reports-{process.env.REACT_APP_STAGE}.s3.amazonaws.com/fullRiders_extended.csv</a>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default ReportsComponent;