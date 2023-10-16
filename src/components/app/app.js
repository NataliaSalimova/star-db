import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import ErrorIndicator from '../error-indicator';
import ItemDetails, { Record }  from '../item-details/item-details';
import ItemList from '../item-list';

import './app.css';
import SwapiService from '../../services/swapi-service';

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

        const { getPerson, getStarship, getPersonImage, getStarshipsImage, getAllPeople, getAllPlanets } = this.swapiService;
        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={getPerson}
                getImageUrl={getPersonImage} >
                <Record field="gender" label="Gender"/>
                <Record field="eyeColor" label="Eye Color"/>
            </ItemDetails>
        )
        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarship}
                getImageUrl={getStarshipsImage}>
                <Record field="model" label="Model"/>
                <Record field="length" label="Length"/>
                <Record field="costInCredits" label="Cost"/>
            </ItemDetails>
        )

        return (
            <ErrorBoundry>
                <div className="stardb-app">
                    <Header/>
                    <ItemList
                        getData={getAllPeople}
                        onItemSelected={()=> {}}>
                        {({name}) => <span>{name}</span>}
                    </ItemList>

                    <ItemList
                        getData={getAllPlanets}
                        onItemSelected={()=> {}}>
                        {({name}) => <span>{name}</span>}
                    </ItemList>
                </div>

            </ErrorBoundry>
        )
    }
};