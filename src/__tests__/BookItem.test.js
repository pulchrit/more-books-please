import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import BookItem from '../components/BookItem';

describe ("BookItem", () => {

    const book = 
        {
            rank: '1',
            primary_isbn10: "0385376715",
            description: "A celebration of future possibilities.",
            title: "The Wonderful Things You Will Be",
            author: "Emily Winfield Martin",
            book_image: "https://s1.nyt.com/du/books/images/9780385376716.jpg",
            open_library_url: "https://openlibrary.org/books/OL26629977M/The_Wonderful_Things_You_Will_Be",
            amazon_product_url: "http://www.amazon.com/The-Wonderful-Things-You-Will/dp/0385376715?tag=NYTBS-20"
        };


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <BookItem 
            key={book.rank}
            rank={book.rank}
            title={book.title}
            author={book.author}
            description={book.description}
            image={book.book_image}
            url={book.open_library_url === '' ? book.amazon_product_url : book.open_library_url}
        /> 
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
            <BookItem 
                key={book.rank}
                rank={book.rank}
                title={book.title}
                author={book.author}
                description={book.description}
                image={book.book_image}
                url={book.open_library_url === '' ? book.amazon_product_url : book.open_library_url}
            />
        </BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  })

})


