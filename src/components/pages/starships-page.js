import React from 'react';
import { StarshipList } from '../sw-components';
import { useNavigate } from 'react-router';

const StarshipsPage = ({history})=> {
    return (
        <StarshipList
            onItemSelected={(itemId)=>{
                history.push(`/starships/${itemId}`);
            }}/>
    );
};

export const withRouter = (Component) =>{
    const Wrapper = (props) =>{
        const history = useNavigate();
        return <Component history={history} {...props}/>
    }
    return Wrapper;
}

export default withRouter(StarshipsPage);