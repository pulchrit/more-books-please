import React from 'react';
import {Route} from 'react-router-dom';
import Header from './Header';
import BestSellersListOptions from './BestSellersListOptions';
import TopBooksList from './TopBooksList';
import Footer from './Footer';
import config from './config';
import { handleErrors } from './utilities.js';
import '../css/App.css';

const processListNamesData = (listNamesData) => {
  const childrensListNames = listNamesData.filter(list =>
    list.display_name.includes('Children'));
  
  const listNames = childrensListNames.map(listObject => {
    return {
      display_name: listObject.display_name, // just display_name? destructuring
      list_name_encoded: listObject.list_name_encoded // just list_name_encoded? destructuring
    }
  });

  return listNames;
}



export default class App extends React.Component {
  
  state = {
    listNames: [],
    error: null
  };

  componentDidMount() {
    
    // Get listNames from NYT API to populate nav buttons
    const getListNamesUrl = `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${config.API_KEY_NYT}`;
    
    fetch(getListNamesUrl)
    .then(handleErrors)
    .then(response => response.json())
    .then(data => processListNamesData(data.results))
    .then(processedListNames => this.setState({listNames: processedListNames}))
    .catch(error => {this.setState({error: error.message});
    })
  }

  render() {

    return (
      <main className="app">

        <Header />
        
        {/* Initial view route. Shows list of best seller lists. */}
        <Route 
          exact
          path='/'
          render={ () => 
            <BestSellersListOptions 
              listNames={this.state.listNames}
              error={this.state.error}
            />
          }
        />

        {/* Book list view route. Shows top books for each list. */}
        <Route 
          path="/topBooks/:listName"
          component={TopBooksList} 
        />
      
        <Footer />

      </main> 
    );
  }
}

