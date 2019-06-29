import React from 'react';
import {Route} from 'react-router-dom';
import Header from './Header';
import BestSellersListOptions from './BestSellersListOptions';
import TopBooksList from './TopBooksList';
import Footer from './Footer';
import config from './config';
import { handleErrors } from './utilities.js';
import '../css/App.css';


/* const toTitleCase = (title) => {
  let titleLowercase = title.toLowerCase();
  const titleCaseArray = titleLowercase.split(" ").map(word => 
    `${word[0].toUpperCase()}${word.slice(1)}`);
  return titleCaseArray.join(" ");
} */

/* const handleErrors = (response) => {
   if (!response.ok) {
     throw new Error ("Something went wrong.")
   }
   return response; 
} */

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

/* const processTopBooksData = (dataArray) => {
  const topBooksByList = dataArray.map(listObject => {
      const display_name = listObject.results.display_name;
      
      const books = listObject.results.books.map(book => {
        return {
          rank: book.rank,
          primary_isbn10: book.primary_isbn10,
          description: book.description,
          title: toTitleCase(book.title),
          author: book.author,
          book_image: book.book_image,
          open_library_url: '',
          amazon_product_url: book.amazon_product_url
        }
      });
      
    return {
      display_name,
      books
    }
  });

  return topBooksByList;
} */

/* const createEndpoints = (listNamesEncoded) => {
    const baseNYTUrl = 'https://api.nytimes.com/svc/books/v3/lists/current/';
    
    return listNamesEncoded.map(name => 
      `${baseNYTUrl}${name}?api-key=${config.API_KEY_NYT}`);
} */



// React component begins here.
export default class App extends React.Component {
  /* constructor(props) {
    super(props);
    this.state = {
      listNames: [],
      topBooksByList: [],
      error: null
    }
  }  */

  state = {
    listNames: [],
    //topBooksByList: [],
    error: null
  };

/*   reviseTopBooksByList = (data, topBooksByList) => {
    const isbnAndInfoUrl = Object.keys(data).map(key => {
      return {
        isbn: key.slice(5),
        info_url: data[key].info_url
      }
    });

    //const revisedTopBooksByList = topBooksByList;
    
    topBooksByList.forEach(listObject => {
      
      listObject.books.forEach(book => {

        isbnAndInfoUrl.forEach(isbnObject => {
          if (isbnObject.isbn === book.primary_isbn10) {
            book.open_library_url = isbnObject.info_url;
          } 
        });
      });
    });

    return topBooksByList; */

    /* this.setState({
      topBooksByList: revisedTopBooksByList,
      error: null
    }); */
  //}

 /*  getOpenLibraryUrls = (topBooksByList) => {
    const baseOpenLibraryUrl = 'https://openlibrary.org/api/books?bibkeys='

    const isbnNumbers = topBooksByList.flatMap(listObject => 
       listObject.books.map(book => {
        return `ISBN:${book.primary_isbn10}`}).join(',')
    );

    const openLibraryUrl = `${baseOpenLibraryUrl}${isbnNumbers}&format=json`;

    return fetch(openLibraryUrl)
    .then(handleErrors)
    .then(response => response.json())   
    .then(data => this.reviseTopBooksByList(data, topBooksByList))
    .catch(error => this.setState({error: error.message}))
  }
 */
 

 /*  getTopBooksByList = (listNames) => {
    
    const listNamesEncoded = listNames.map(list => 
      list.list_name_encoded);

    // Attribution for Promise.all and getFoldersNotes function: https://tinyurl.com/y42df8dz
    const endpoints = createEndpoints(listNamesEncoded);

    // Promise.all will call this function and fetch the data for each endpoint list endpoint or throw an error is fetch is unsuccessful.
    const getTopBooks = (endpoint) => 
      fetch(endpoint)
      .then(handleErrors)
      .then(response => response.json());
    
    // Call each endpoint, but block the data processing (i.e., setting state) 
    // until all Promises have returned successfully or been rejected. 
    // Attribution for return the result of Promise.all: https://stackoverflow.com/questions/44735669/how-to-make-javascript-fetch-synchronous
    return Promise
      .all(endpoints.map(getTopBooks))
      .then(dataArray => processTopBooksData(dataArray))
     
      .catch(error => this.setState({ error }))
  } */

 

  componentDidMount() {
    
    // Get listNames from NYT API to populate nav buttons
    const getListNamesUrl = `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${config.API_KEY_NYT}`;
    console.log("App component did mount ran");
    fetch(getListNamesUrl)
    .then(handleErrors)
    .then(response => response.json())
    .then(data => processListNamesData(data.results))
    .then(processedListNames => this.setState({listNames: processedListNames}))
    /* .then(processedListNames => this.getTopBooksByList(processedListNames))
    .then(processedTopBooksByList => this.getOpenLibraryUrls(processedTopBooksByList))
    .then(revisedTopBookList => console.log(revisedTopBookList) || revisedTopBookList)
    .then(revisedTopBooksByList => this.setState({topBooksByList: revisedTopBooksByList})) */
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

        {console.log("listnames from state: ", this.state.listNames)}
      
        <Footer />

      </main> 
    );
  }
}

