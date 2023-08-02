import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';

import './app.css';

export default class App extends Component {
    state = {
        selectedPerson: 5,
        hasError: false
    }

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        })
    }

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true});
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        return (
            <div className="stardb-app">
                <Header/>
                <RandomPlanet/>
                <ErrorButton/>

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList onItemsSelected = {this.onPersonSelected}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>
            </div>
        )
    }
};