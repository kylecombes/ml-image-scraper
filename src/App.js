import React from 'react';
import {
  getImages,
} from './google-images';
import ImageGrid from './image-grid';

export default class App extends React.Component {

  state = {
    imgUrls: [],
    query: '',
    selectedImages: new Set(),
  };

  onInputChange = e => this.setState({ [e.target.name]: e.target.value });

  onQueryButtonClicked = () => {
    getImages(this.state.query)
      .then(imgUrls => this.setState({ imgUrls }));
  };

  imageSelected = imgUrl => {
    let selectedImages = new Set([...this.state.selectedImages]);
    if (selectedImages.has(imgUrl)) {
      selectedImages.delete(imgUrl);
    } else {
      selectedImages.add(imgUrl);
    }
    this.setState({ selectedImages });
  };

  render() {
    return (
      <div className="app">
        <div className="query-container">
          <input name="query" type="text" value={this.state.query} onChange={this.onInputChange} />
          <button onClick={this.onQueryButtonClicked}>Search!</button>
        </div>
        <ImageGrid images={this.state.imgUrls} selectedImages={this.state.selectedImages} imageClick={this.imageSelected} />
      </div>
    );
  }
}
