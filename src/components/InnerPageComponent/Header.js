import React from 'react';
import { Layout, Button, Icon } from 'antd';

const Header = ({ logoutAction, navbarOpened, setNavbarOpened }) => {
    const { Header } = Layout;
    
    const handleOpen = () => {
        setNavbarOpened(!navbarOpened);
    }

    return (
        <Header className="header">
            <div className="logo">
                <img src={require('../../assets/img/snowbus-logo.svg')} />
            </div>
            <div className="header-menu-container">
                <Button onClick={logoutAction}>Log out</Button>
            </div>
            <div className="header-menu-burger-container">
                <Icon onClick={handleOpen} type="menu" />
            </div>
        </Header>
)
}

export default Header;