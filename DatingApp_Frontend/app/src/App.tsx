import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Find } from './components/Find/Find';
import { Matches } from './components/Matches/Matches';
import { Messages } from './components/Messages/Messages';
import { MessagesThread } from './components/MessagesThread/MessagesThread';
import { User } from './components/User/User';
import { UserContext } from './UserContext';
import { UserContextState } from './interfaces/Interfaces';
import { decodeJwt } from './util/decodeJwt';

export const App = (): JSX.Element => {

    const jwt = localStorage.getItem("jwt") || "";

    const decoded = decodeJwt(jwt);

    const [userContext, setUserContext] = useState<UserContextState>({
        baseURL: "http://localhost:5000/api/",
        jwt: jwt,
        jwtID: decoded.nameid,
        jwtUsername: decoded.unique_name,
        jwtPhotoUrl: decoded.photo_url,
        jwtExpiry: decoded.exp,
        loggedIn: decoded.nameid ? true : false,
        unreadMatches: 0
    })

    useEffect(() => {
        if(userContext.jwtExpiry < Date.now().valueOf() / 1000) {
            setUserContext({
                ...userContext,
                jwt: "",
                jwtID: "",
                jwtUsername: "",
                jwtPhotoUrl: "",
                jwtExpiry: -1,
                loggedIn: false,
                unreadMatches: 0
            });
            localStorage.removeItem("jwt");
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Router>
            <UserContext.Provider value={{ userContext, setUserContext }}>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/user/:id" component={User} />
                    <PrivateRoute path="/find" component={Find} />
                    <PrivateRoute path="/matches" component={Matches} />
                    <PrivateRoute path="/messages" component={Messages} />
                    <PrivateRoute path="/thread/:id" component={MessagesThread} />
                </Switch>
            </UserContext.Provider>
        </Router>
    )
}