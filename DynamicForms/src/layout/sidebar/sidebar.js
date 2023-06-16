import React, { Component } from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

//const Sidebar = () => {
export class Sidebar extends Component {
    static displayName = Sidebar.name;

    render() {

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial', top: 0 }}>
            <CDBSidebar textColor="#808080" backgroundColor="#FFFFFF">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                        Sidebar
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/groups" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="table">Groups</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/users" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/forms" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="chart-line">Forms</CDBSidebarMenuItem>
                        </NavLink>                      
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        style={{
                            padding: '20px 5px',
                        }}
                    >
                        Sidebar Footer
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
//};

//export default Sidebar;

    }
}