import React from 'react';
import BookItem from './BookItem';
import config from './config';
import { handleErrors, toTitleCase } from './utilities.js'; 
import '../css/TopBooksList.css';

const processTopBooksData = (data) => {
        
    const display_name = data.results.display_name;

    const books = data.results.books.map(book => {
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
    };
}



export default class TopBooksList extends React.Component {
    
    state = {
        topBooksByList: {
            display_name: '',
            books: []
        },
        error: null
    }

    reviseTopBooksByList = (data, topBooksByList) => {
        
        const isbnAndInfoUrl = Object.keys(data).map(key => {
          return {
            isbn: key.slice(5),
            info_url: data[key].info_url
          }
        });
            
        topBooksByList.books.forEach(book => {
            isbnAndInfoUrl.forEach(isbnObject => {
              if (isbnObject.isbn === book.primary_isbn10) {
                book.open_library_url = isbnObject.info_url;
              } 
            });
          });
    
        return topBooksByList;
    }

    // Get OpenLibrary urls, process data, add OpenLibrary urls to 
    // topBooksByList object and setState with this revised topBooksByList object.
    getOpenLibraryUrls = (topBooksByList) => {
        
        const baseOpenLibraryUrl = 'https://openlibrary.org/api/books?bibkeys='
    
        const isbnNumbers = topBooksByList.books.map(book => 
            `ISBN:${book.primary_isbn10}`)
            .join(',');
    
        const callOpenLibraryUrl = `${baseOpenLibraryUrl}${isbnNumbers}&format=json`;
    
        fetch(callOpenLibraryUrl)
            .then(handleErrors)
            .then(response => response.json())   
            .then(data => this.reviseTopBooksByList(data, topBooksByList))
            .then(topBooksByList => this.setState({topBooksByList}))
            .catch(error => this.setState({error: error.message}))
    }

    componentDidMount() {
        
        // Get selected NTY best seller list data, process data into topBooksByList
        // object, and pass that object to getOpenLibraryUrls function to call 
        // the OpenLibrary API (which will then update the topBooksByList object 
        // and setState for topBooksByList).
        const listName = this.props.match.params.listName

        const baseNYTUrl = 'https://api.nytimes.com/svc/books/v3/lists/current/';
    
        const callNYTUrl = `${baseNYTUrl}${listName}?api-key=${config.API_KEY_NYT}`;
      
        fetch(callNYTUrl)
            .then(handleErrors)
            .then(response => response.json())
            .then(data => processTopBooksData(data) || data)
            .then(topBooksByList => this.getOpenLibraryUrls(topBooksByList))
            .catch(error => this.setState({ error }))
    }

    render() {

        const {error} = this.state;

        const bookItems = this.state.topBooksByList.books.map((book) => {
            
            return (
                <BookItem 
                    key={book.rank}
                    rank={book.rank}
                    title={book.title}
                    author={book.author}
                    description={book.description}
                    image={book.book_image}
                    url={book.open_library_url === '' ? book.amazon_product_url : book.open_library_url}
                />
            )}
        );
        
        return (
            <> 
                {/* If there is an error, render it, otherwise 'display' an empty string. */}
                {error ? <p className='error' role='alert'>{error.message}</p> : ''}

                {this.state.topBooksByList.display_name === '' 
                    ? <p className='placeholder-text'>Gathering books...one moment please...</p>
                
                    : <section className="top-books">
                        <h2 className="subhead-top-books">{this.state.topBooksByList.display_name}</h2>
                        {bookItems}
                    </section>}
            </>
        );
    }
}

