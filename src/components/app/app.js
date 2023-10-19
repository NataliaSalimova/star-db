import React, { Component } from 'react';

import Header from '../header';
import ErrorBoundry from '../error-boundry';
import ErrorIndicator from '../error-indicator';

import SwapiService from '../../services/swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';

import {
    PersonDetails,
    PlanetDetails,
    StarshipDetails,
    PersonList,
    PlanetList,
    StarshipList
} from '../sw-components';

import './app.css';

export default class App extends Component {
    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false
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
                <SwapiServiceProvider value={this.swapiService} >
                    <div className="stardb-app">
                        <Header/>

                        <PersonDetails itemId={11} />

                        <PlanetDetails itemId={7} />

                        <StarshipDetails itemId={9} />

                        <PersonList/>
                        <PlanetList/>
                        <StarshipList/>
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        )
    }
};