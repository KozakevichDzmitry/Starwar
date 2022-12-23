import React, {Component} from 'react';
import Header from "./components/header/Header";
import SectionRandomPlanet from "./components/SectionRandomPlanet/SectionRandomPlanet";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundry";
import {Route, Routes, Outlet, Navigate} from "react-router-dom"
import Content from "./components/content/Content";
import NotFoundPage from "./components/NotfoundPage";
import Login from "./components/login/Login";


export default class App extends Component {

    state = {
        activePage: 'people',
        hasError: false,
        isLogin: false
    }

    onLogin() {
        this.setState({isLogin: true})
    }

    render() {
        return (
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index
                               element={<h2 className="container">Welcome to Star Wars library</h2>}/>
                        <Route path="/people/"
                               element={<Content activePage='people'/>}/>
                        <Route path="/planets/"
                               element={<Content activePage='planets'/>}/>
                        <Route path="/starships/"
                               element={<Content activePage='starships'/>}/>
                        <Route path="/secret"
                               element={
                                   this.state.isLogin ?
                                       <h2 className="container">This secret page</h2>:
                                       <Navigate to="/login"/>
                               }/>
                        <Route path="/login"
                               element={
                                   this.state.isLogin ?
                                       <Navigate to="/"/> :
                                       <Login onLogin={() => this.onLogin()}/>
                               }/>
                        <Route path="*"
                               element={<NotFoundPage/>}/>
                    </Route>
                </Routes>
            </ErrorBoundary>
        )
    }
}


const Layout = () => {
    return (
        <>
            <Header/>
            <SectionRandomPlanet/>
            <Outlet/>
        </>
    )
}
