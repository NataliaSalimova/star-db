import React, { Component } from 'react';

import Header from '../header';
import ErrorBoundry from '../error-boundry';
import ErrorIndicator from '../error-indicator';
import RandomPlanet from '../random-planet';
import {StarshipDetails} from '../sw-components';

import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';

import SwapiService from '../../services/swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {

    state = {
        hasError: false,
        swapiService: new SwapiService()
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
                            </Routes>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        )
    }
};