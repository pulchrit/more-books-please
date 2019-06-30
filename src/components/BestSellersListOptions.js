import React from 'react';
import {Link} from 'react-router-dom';
import '../css/BestSellersListOptions.css';

export default class BestSellersListOptions extends React.Component {

    render() {

        // Save error from state to error variable.
        const {error} = this.props;
        
        const nameButtons = this.props.listNames.map((name, index) =>  
            <button className="list-button" key={index}>
                <Link to={`/topBooks/${name.list_name_encoded}`}>
                        {name.display_name}
                </Link>
            </button>
        );
            
        return (
            <section className="best-sellers-list-options">
                
                {/* If there is an error, render it, otherwise 'display' empty string. */}
                {error ? <p className='error' role='alert'>{error.message}</p> : ''}

                <h2 className="subhead">Find more food for your hungry little bookworms.</h2>
                <p className="directions">Choose from The New York Times Bestsellers Lists below
                    to see the most recent best sellers in each children's book list.</p>
                    {nameButtons}
            </section>
        );
    } 
}
