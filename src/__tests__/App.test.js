import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import App from '../components/App';

describe ("App", () => {


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <App />
        </BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  })

})


