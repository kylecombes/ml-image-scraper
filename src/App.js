import React from 'react';
import {
  getImages,
} from './google-images';

export default class App extends React.Component {

  onInputChange = e => this.setState({ [e.target.name]: e.target.value });

  onQueryButtonClicked = () => {
    getImages(this.state.query);
  };


  render() {
    return (
      <div className="app">
        <input name="query" type="text" onChange={this.onInputChange} />
        <button onClick={this.onQueryButtonClicked}>Search!</button>
      </div>
    );
  }
}
