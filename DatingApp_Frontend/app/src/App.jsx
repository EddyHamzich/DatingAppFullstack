import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from './utils/PrivateRoute';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Messages } from './components/Messages/Messages';
import { UserContext } from './UserContext';

export const App = () => {

    const [state, setState] = useState({ loggedIn: false, userName: "" })

    return (
        <Router>
            <UserContext.Provider value={{ state, setState }}>
                <Navbar />
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/messages" component={Messages} />
            </UserContext.Provider>
        </Router>
    )
}
