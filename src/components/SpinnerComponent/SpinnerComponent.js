import React from 'react';
import { Spin, Icon } from 'antd';
import './Spinner.scss';

const Spinner = () => {
    const spinner = <Icon type="loading" style={{ fontSize: 45 }} spin />;

    return (
        <div className="spinner-container">
            <Spin indicator={spinner} />
        </div>
    )
}

export default Spinner;