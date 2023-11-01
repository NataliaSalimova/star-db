import React, { Component } from 'react';
import { PersonList, PersonDetails } from '../sw-components';
import Row from '../row'
import {useNavigate} from "react-router-dom";

const PeoplePage = ({history, match})=> {
    return (
        <Row
            left={<PersonList onItemSelected={(id)=> history.push(id)}/>}
            right={<PersonDetails itemId={match.params} />}/>
    )
}

export const withRouter = (Component) =>{
    const Wrapper = (props) =>{
        const navigate = useNavigate();
        return <Component history={navigate} {...props}/>
    }
    return Wrapper;
}

export default withRouter(PeoplePage);