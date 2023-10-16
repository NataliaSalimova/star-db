import React, { Component } from 'react';

import Spinner from '../spinner';
import ErrorButton from '../error-button';

import SwapiService from '../../services/swapi-service';

import './item-details.css';

const Record = ({item , field, label})=> {
    return (
        <li className="list-group-item">
            <span className="term">{ label }</span>
            <span>{ item[field] }</span>
        </li>
    );
};
export {
    Record
}

export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        loading: true,
        image: null
    }

    componentDidMount() {
        this.updateItem();
    }

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;
        this.setState({loading: true});

        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item)=> {
                this.setState({
                    item,
                    image: getImageUrl(item),
                    loading: false
                });
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId!== prevProps.itemId) {
            this.updateItem();
        }}

    render() {
        if (!this.state.item) {
            return <span>Select a item from a list</span>
        }

        const { item, loading } = this.state;

        const spinner = loading ? <Spinner /> : null;
        const content = !loading ? <ItemView item={item} image={this.state.image} props={this.props} /> : null;



        return (
            <div className="item card">
                {spinner}
                {content}
            </div>
        )
    }
}

const ItemView = ({item, image, props}) => {
    const {  name } = item;

    return (
        <div className="item-details card">
            <img className="item-image"
                src={image}
                alt="item"/>

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(props.children, (child)=> {
                            return React.cloneElement(child, { item });
                        })
                    }
                </ul>
                <ErrorButton/>
            </div>
        </div>
    );
}