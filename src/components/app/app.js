import React, { Component } from 'react';

import Header from '../header';
import ErrorBoundry from '../error-boundry';
import ErrorIndicator from '../error-indicator';
import RandomPlanet from '../random-planet';
import {StarshipDetails} from '../sw-components';

import { PeoplePage, PlanetsPage, StarshipsPage, SecretPage, LoginPage  } from '../pages';

import SwapiService from '../../services/swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {

    state = {
        hasError: false,
        swapiService: new SwapiService(),
        isLoggedId: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
    };

    onServiceChange = ()=> {
        this.setState(( {swapiService} )=> {
            const Service = swapiService instanceof SwapiService ? null : SwapiService;

            return {
                swapiService: new Service()
            }
        });
    }

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true});
    }

    render() {
        const { isLoggedIn } = this.state;

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService} >
                    <Router>
                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange}/>

                            <RandomPlanet/>

                            <Routes>
                                <Route path="/" element={<h2>Welcome to StarDB</h2>} exact/>
                                <Route path="/people/:id?" element={<PeoplePage/>}/>
                                <Route path="/planets" element={<PlanetsPage/>}/>
                                <Route path="/starships" exact element={<StarshipsPage/>}/>
                                <Route path="/starships/:id" element={<StarshipDetails/>}/>
                                <Route path="/login"
                                       element={
                                           <LoginPage
                                               isLoggedIn={isLoggedIn}
                                               onLogin={this.onLogin}
                                           />
                                       }/>
                                <Route
                                    path="/secret"
                                    element={
                                        <SecretPage
                                            isLoggedIn={isLoggedIn}
                                        />
                                    }/>
                                <Route path={'*'} element={<h2>Page not found</h2>}/>
                            </Routes>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        )
    }
};