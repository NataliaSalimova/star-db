import React from 'react';
import { StarshipList } from '../sw-components';
import { useNavigate } from 'react-router-dom';

const StarshipsPage = ({history})=> {
    return (
        <StarshipList
            onItemSelected={(itemId)=>{
                history(itemId);
            }}/>
    );
};

export const withRouter = (Component) =>{
    const Wrapper = (props) =>{
        const navigate = useNavigate();
        return <Component history={navigate} {...props}/>
    }
    return Wrapper;
}

export default withRouter(StarshipsPage);