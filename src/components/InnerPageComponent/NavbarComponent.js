import React from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';

const Navbar = ({ navbarOpened }) => {
    const { Sider } = Layout;
    const { SubMenu } = Menu;
    const { pathname } = window.location;
    return (
        <>
            <Sider width={200} className="navbar-container">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={pathname.includes('tickets') ? ['tickets']
                        : pathname.includes('reports') ? ['reports']
                            : pathname.includes('marketing') ? ['marketing']
                                : pathname.includes('customer-messaging') ? ['customer-messaging']
                                    : pathname.includes('users') ? ['users']
                                        : pathname.includes('users/view') ? ['users/view']
                                            : pathname.includes('commission') ? ['commission']
                                                : pathname.includes('product') ? ['products']
                                                      : pathname.includes('notifications') ? ['notifications']
                                                           : pathname.includes('add-notifiy') ? ['add-notifiy']
                                                    : []}
                    defaultOpenKeys={(pathname.includes('reports') || pathname.includes('marketing')) && ['ticket-report']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="tickets" className="mt-0 mb-0"><Link to="/tickets">Tickets</Link></Menu.Item>
                    <Menu.Item key="products" className="mt-0 mb-0"><Link to="/products">Products</Link></Menu.Item>
                    <Menu.Item key="users" className="mt-0"><Link to="/users">Users</Link></Menu.Item>
                    <SubMenu
                        key="ticket-report"
                        title={
                            <span>
                                <span>Reports</span>
                            </span>
                        }
                    >
                        <Menu.Item key="reports" className="mt-0 mb-0"><Link to="/reports">Ticket Reports</Link></Menu.Item>
                        <Menu.Item key="marketing" className="mt-0 mb-0"><Link to="/marketing">Marketing</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="notifications" className="mt-0 mb-0"><Link to="/notifications">Notifications</Link></Menu.Item>
                    <Menu.Item key="customer-messaging" className="mt-0 mb-0"><Link to="/customer-messaging">Passenger Notifications</Link></Menu.Item>
                    <Menu.Item key="commission" className="mt-0 mb-0"><Link to="/commission">Commission</Link></Menu.Item>
                </Menu>
            </Sider>
            <Sider width={200} style={{ right: navbarOpened ? '0' : '-200px' }} className="mobile-navbar-container">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={pathname.includes('tickets') ? ['tickets']
                        : pathname.includes('reports') ? ['reports']
                            : pathname.includes('marketing') ? ['marketing']
                                : pathname.includes('notifications') ? ['notifications']
                                    : pathname.includes('users') ? ['users']
                                        : pathname.includes('users/view') ? ['users/view']
                                            : pathname.includes('commission') ? ['commission']
                                                : pathname.includes('product') ? ['product']
                                                    : []}
                    defaultOpenKeys={(pathname.includes('reports') || pathname.includes('marketing')) && ['ticket-report']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="tickets" className="mt-0 mb-0"><Link to="/tickets">Tickets</Link></Menu.Item>
                    <Menu.Item key="users" className="mt-0"><Link to="/users">Users</Link></Menu.Item>
                    <SubMenu
                        key="ticket-report"
                        title={
                            <span>
                                <span>Reports</span>
                            </span>
                        }
                    >
                        <Menu.Item key="reports" className="mt-0 mb-0"><Link to="/reports">Ticket Reports</Link></Menu.Item>
                        <Menu.Item key="marketing" className="mt-0 mb-0"><Link to="/marketing">Marketing</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="notifications" className="mt-0 mb-0"><Link to="/notifications">Passenger Notifications</Link></Menu.Item>
                    <Menu.Item key="commission" className="mt-0 mb-0"><Link to="/commission">Commission</Link></Menu.Item>
                </Menu>
            </Sider>
        </>
    )
}

export default Navbar;