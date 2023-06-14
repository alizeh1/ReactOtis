/*import './App.css';*/

import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
//import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Home } from './home/Home';
import { Department } from './home/Department';
import { Employee } from './home/Employee';
import { FetchData } from './fetchdata/FetchData';
import { Counter } from './counter/Counter';
//import './custom.css'
import './App.css'
import { NavMenu } from './layout/navmenu/NavMenu';
//import SideMenu from './sidemenu/SideMenu';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>         
            </Layout>
        );
    }
}


//function App() {
//    return (
//        <Layout>
//            <SideMenu/>
//            <Routes>
//                <Route exact path='/' element={<Home />} />
//                <Route path='/counter' element={<Counter />} />
//                <Route path='/fetch-data' element={<FetchData />} />
//                <Route path='/department' element={<Department />} />
//                <Route path='/employee' element={<Employee />} />
//            </Routes>
//        </Layout>
//    );
//}
//export default App;

////function App() {
////    return (
////            <Layout>
////                <Routes>
////            <div className="App container">
////                <h3 className="d-flex justify-content-center m-3">
////                    My React App
////                </h3>

////                <nav className="navbar navbar-expand-sm bg-light navbar-dark">
////                    <ul className="navbar-nav">
////                        <li className="nav-item m-1">
////                            <NavLink className="btn btn-light btn-outline-primary" to="/home">
////                                Home
////                            </NavLink>
////                        </li>
////                        <li className="nav-item m-1">
////                            <NavLink className="btn btn-light btn-outline-primary" to="/department">
////                                Department
////                            </NavLink>
////                        </li>
////                        <li className="nav-item m-1">
////                            <NavLink className="btn btn-light btn-outline-primary" to="/employee">
////                                Employee
////                            </NavLink>
////                        </li>
////                    </ul>
////                </nav>

////                <switch>
////                    <Route path='/home' component={Home}></Route>
////                    <Route path='/department' component={Department}></Route>
////                    <Route path='/employee' component={Employee}></Route>
////                </switch>
////            </div>
////                </Routes>
////            </Layout>
////    );
////}
////export default App;


////-------------------------------------------------------------------------------------------------------

////import React from 'react'
//////import 'bootstrap/dist/css/bootstrap.min.css'
//////import 'bootstrap-icons/font/bootstrap-icons.css'
////import Sidebar from './Dashboard/Sidebar'
//////import Home from './Home'
////import { Home } from './home/Home';
////import { useState } from 'react'


////function App() {
////    const [toggle, setToggle] = useState(true)
////        const Toggle = () => { setToggle(!toggle) }
////    return (
////        <div className='container-fluid bg-secondary min-vh-100 '>
////            <div className='row '>
////                {
////                    toggle && <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
////                    <Sidebar />
////                </div>}
////                {
////                    toggle && <div className='col-4 col-md-2'></div>}
////                <div className='col'>
////                    <Home Toggle={Toggle} />
////                </div>
////            </div>
////    </div>)
////}
////export default App

//---------------------------------------------------------------------------------------
//import React, { Component } from 'react';
//import { useSelector } from 'react-redux';

//import { ThemeProvider } from '@mui/material/styles';
//import { CssBaseline, StyledEngineProvider } from '@mui/material';

//// routing
//import Routes from 'routes';

//// defaultTheme
//import themes from 'themes';

//// project imports
//import NavigationScroll from 'layout/NavigationScroll';

//// ==============================|| APP ||============================== //

//const App = () => {
//    const customization = useSelector((state) => state.customization);

//    return (
//        <StyledEngineProvider injectFirst>
//            <ThemeProvider theme={themes(customization)}>
//                <CssBaseline />
//                <NavigationScroll>
//                    <Routes />
//                </NavigationScroll>
//            </ThemeProvider>
//        </StyledEngineProvider>
//    );
//};

//export default App;



