import React from 'react';

import { withData } from '../hoc-helpers';

import './item-list.css';

import SwapiService from '../../services/swapi-service';

const ItemList = (props) => {
    const { data, onItemsSelected, children: renderLabel } = props;

    const items = data.map((item) => {
        const { id } = item;
        const label = renderLabel(item);

        return (
            <li
                className="list-group-item"
                key={id}
                onClick={()=>onItemsSelected(id)}>
                {label}
            </li>
        )
    })

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

const { getAllPeople} = new SwapiService();

export default withData(ItemList, getAllPeople);