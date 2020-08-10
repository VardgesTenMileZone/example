import React, { useState } from 'react';
import { Layout} from 'antd';
import { logout } from '../../store/actions/AuthActions';
import { connect } from 'react-redux';
import Header from './Header';
import Navbar from './NavbarComponent';
import './InnerPageComponent.scss';

const InnerPageComponent = ({ children, logoutAction }) => {
    const { Content } = Layout;
    const [navbarOpened, setNavbarOpened] = useState(false);

    return (
        <Layout style={style.layout}>
            <Header logoutAction={logoutAction} navbarOpened={navbarOpened} setNavbarOpened={setNavbarOpened} />
            <Layout>
                <Navbar navbarOpened={navbarOpened} />
                <Layout style={{ padding: '0 24px' }}>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <div className="admin-container">
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
};

const style = {
    layout: {
        height: '100vh'
    }
};

const mapDispatchToProps = dispatch => ({
    logoutAction: () => dispatch(logout())
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(InnerPageComponent);