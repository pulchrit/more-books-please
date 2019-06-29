import React from 'react';
import BookItem from './BookItem';
import '../css/TopBooksList.css';

export default class TopBooksList extends React.Component {
    
    state = {
        topBooks: []
    }

    componentDidMount() {
        
    }

    //!!!!!!!!!!!!  add api calls here. You will need one for each route param...
    // so use the match object to pull the route param and make the call using that
    // you'll make a api call for a particular route param...so these pages will be 
    // created as you need them! Which makes them scalable. 
    render() {
        // Find the Best Seller list to render based on the route parameter.
        // The route parameter is given a value when the button is created 
        // in BestSellersListOptions. You read that route parameter out of 
        // match.params.listName.
        console.log("match object listname:", this.props.match.params.listName);
        console.log("Top books from props/state:", this.props.topBooksByList);
        const listObject = this.props.topBooksByList.find(list => 
            this.props.match.params.listName === list.display_name);
        
        const bookItems = listObject.books.map((book) => {
            
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

