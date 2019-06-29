import React from 'react';
import BookItem from './BookItem';
import config from './config';
import {handleErrors, toTitleCase} from '.utilities'; 
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
        topBooksByList: {}
    }

    reviseTopBooksByList = (data) => {
        
        const isbnAndInfoUrl = Object.keys(data).map(key => {
          return {
            isbn: key.slice(5),
            info_url: data[key].info_url
          }
        });
    
        const revisedTopBooksByList = this.state.topBooksByList;
        
        revisedTopBooksByList.books.forEach(book => {
            isbnAndInfoUrl.forEach(isbnObject => {
              if (isbnObject.isbn === book.primary_isbn10) {
                book.open_library_url = isbnObject.info_url;
              } 
            });
          });
    
        return revisedTopBooksByList;
    }

    // Get OpenLibrary urls, process data, add OpenLibrary urls to 
    // topBooksByList object and setState with this revised topBooksByList object.
    getOpenLibraryUrls = () => {
        
        const baseOpenLibraryUrl = 'https://openlibrary.org/api/books?bibkeys='
    
        const isbnNumbers = this.state.topBooksByList.books.map(book => 
            `ISBN:${book.primary_isbn10}`)
            .join(',');
    
        const callOpenLibraryUrl = `${baseOpenLibraryUrl}${isbnNumbers}&format=json`;
    
        fetch(callOpenLibraryUrl)
            .then(handleErrors)
            .then(response => response.json())   
            .then(data => this.reviseTopBooksByList(data))
            .then(revisedTopBooksByList => this.setState({topBooksByList: revisedTopBooksByList}))
            .catch(error => this.setState({error: error.message}))
    }

    componentDidMount() {
        
        // Get selected NTY best seller list data, process and set state.
        const listName = this.props.match.params.listName

        const baseNYTUrl = 'https://api.nytimes.com/svc/books/v3/lists/current/';
    
        const callNYTUrl = `${baseNYTUrl}${listName}?api-key=${config.API_KEY_NYT}`);
      
        fetch(callNYTUrl)
            .then(handleErrors)
            .then(response => response.json())
            .then(data => processTopBooksData(data))
            // Use callback on setState to initiate OpenLibrary API call.
            .then(topBooksByList => this.setState({topBooksByList}, this.getOpenLibraryUrls))
            .catch(error => this.setState({ error }))
    }

    render() {
        // Find the Best Seller list to render based on the route parameter.
        // The route parameter is given a value when the button is created 
        // in BestSellersListOptions. You read that route parameter out of 
        // match.params.listName.
      /*   console.log("match object listname:", this.props.match.params.listName);
        console.log("Top books from props/state:", this.props.topBooksByList);
        const listObject = this.props.topBooksByList.find(list => 
            this.props.match.params.listName === list.display_name); */
        
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
            <section className="top-books">
                <h2 className="subhead-top-books">{listObject.display_name}</h2>
                {bookItems}
            </section>
        );
    }
}

