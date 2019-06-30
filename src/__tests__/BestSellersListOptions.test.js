import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import BestSellersListOptions from '../components/BestSellersListOptions';

describe ("BestSellersListOptions", () => {

    const listNames= [
        {
            display_name: "Children's Picture Books",
            list_name_encoded: 'picture-books'
        },
        {
            display_name: "Children's Chapter Books",
            list_name_encoded: 'chapter-books'
        },
        {
            display_name: "Children's Middle Grade Books",
            list_name_encoded: 'childrens-middle-grade'
        }
    ];
            
    const error = null;

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <BestSellersListOptions 
            listNames={listNames}
            error={error}/>
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
            <BestSellersListOptions 
                listNames={listNames}
                error={error}
            />
        </BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  })

})


