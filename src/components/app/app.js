import React, { Component } from 'react';

import Header from '../header';
import ErrorBoundry from '../error-boundry';
import ErrorIndicator from '../error-indicator';
import {
    PersonDetails,
    PlanetDetails,
    StarshipDetails,
    PersonList,
    PlanetList,
    StarshipList
} from '../sw-components';

import './app.css';
import SwapiService from '../../services/swapi-service';

export default class App extends Component {

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
                <div className="stardb-app">
                    <Header/>

                    <PersonDetails itemId={11} />
                    <PlanetDetails itemId={5} />
                    <StarshipDetails itemId={9} />

                    <PersonList>
                        {({name}) => <span>{name}</span>}
                    </PersonList>
                    <PlanetList>
                        {({name}) => <span>{name}</span>}
                    </PlanetList>
                    <StarshipList>
                        {({name}) => <span>{name}</span>}
                    </StarshipList>
                </div>

            </ErrorBoundry>
        )
    }
};