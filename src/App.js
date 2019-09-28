import React from 'react';
import {
  getImages,
} from './google-images';
import ImageGrid from './image-grid';

export default class App extends React.Component {

  state = {
    imgUrls: [],
    query: '',
  };

  onInputChange = e => this.setState({ [e.target.name]: e.target.value });

  onQueryButtonClicked = () => {
    getImages(this.state.query)
      .then(imgUrls => this.setState({ imgUrls }));
  };


  render() {
    return (
      <div className="app">
        <div className="query-container">
          <input name="query" type="text" value={this.state.query} onChange={this.onInputChange} />
          <button onClick={this.onQueryButtonClicked}>Search!</button>
        </div>
        <ImageGrid images={this.state.imgUrls} />
      </div>
    );
  }
}
