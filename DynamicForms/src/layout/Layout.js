import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './navmenu/NavMenu';
import PageContent from './pagecontent/PageContent';
import { Sidebar } from './sidebar/sidebar';
//import SideMenu from './sidemenu/SideMenu';
//import { NavMenu } from './layout/navmenu/NavMenu';
//import SideMenu from './layout/sidemenu/SideMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <NavMenu/>
                <div className="SideMenuNdPageContent">
                    <Sidebar/>
                    <PageContent/>
                </div>
            </div>

        );
    }
}
