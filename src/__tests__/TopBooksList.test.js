import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import TopBooksList from '../components/TopBooksList';

describe ("TopBooksList", () => {

    const topBooksList = {
        display_name: 'Children\'s Chapter Books',
        books: [
            {
                rank: 1,
                primary_isbn10: "0385376715",
                description: "A celebration of future possibilities.",
                title: "THE WONDERFUL THINGS YOU WILL BE",
                author: "Emily Winfield Martin",
                book_image: "https://s1.nyt.com/du/books/images/9780385376716.jpg",
                open_library_url: "https://openlibrary.org/books/OL26629977M/The_Wonderful_Things_You_Will_Be",
                amazon_product_url: "http://www.amazon.com/The-Wonderful-Things-You-Will/dp/0385376715?tag=NYTBS-20"
            }
        ]
    }

    const match = {
            params: {
                listName: "chapter-books"
            }    
    };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter initialEntries={["/topBooks/chapter-books"]} initialIndex={0}>
            <TopBooksList match={match}/>
        </MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // This snapshot is passing because it renders the placholder text, and 
  // it does render the placholder text correctly. However, I can't figure 
  // out how to test the updated component after setState is run after the 
  // API calls. I know Enzyme has a setState() method, but I don't believe
  // I can use Enzyme with react-router. 
  it('renders UI as expected', () => {
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={["/topBooks/chapter-books"]} >
            <TopBooksList 
                match={match}
                topBooksList={topBooksList}
            />
        </MemoryRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  })

})


