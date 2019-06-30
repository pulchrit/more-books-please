import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import Footer from '../components/Footer';

describe ("Footer", () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Footer /> 
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
            <Footer />
        </BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  })

})


