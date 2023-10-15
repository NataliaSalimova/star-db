import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import ErrorIndicator from '../error-indicator';

import './app.css';
import SwapiService from '../../services/swapi-service';
import ItemDetails, { Record }  from '../item-details/item-details';
import Row from '../row';

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

        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

        const { getPerson, getStarship, getPersonImage, getStarshipsImage } = this.swapiService;
        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={getPerson}
                getImageUrl={getPersonImage} >
                <Record field="gender " label="Gender"/>
                <Record field="eyeColor " label="Eye Color"/>
            </ItemDetails>
        )
        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarship}
                getImageUrl={getStarshipsImage} />
        )

        return (
            <ErrorBoundry>
                <div className="stardb-app">
                    <Header/>
                    <Row
                        left={personDetails}
                        right={starshipDetails}
                    />
                </div>

            </ErrorBoundry>
        )
    }
};