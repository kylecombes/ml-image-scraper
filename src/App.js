import React from 'react';
import {
  getImages,
} from './google-images';
import ImageGrid from './image-grid';

export default class App extends React.Component {

  state = {
    imgUrls: [],
    focusedImageIndex: 0,
    query: '',
    selectedImages: new Set(),
  };

  onInputChange = e => this.setState({ [e.target.name]: e.target.value });

  onQueryButtonClicked = () => {
    this.setState({
      imgUrs: [],
      focusedImageIndex: 0,
      selectedImages: new Set(),
    });
    getImages(this.state.query)
      .then(imgUrls => this.setState({ imgUrls }));
  };

  imageSelected = imgUrl => {
    if (this.state.selectedImages.has(imgUrl)) {
      this.markImageDeselected(imgUrl);
    } else {
      this.markImageSelected(imgUrl);
    }
  };

  markImageSelected = imgUrl => {
    let selectedImages = new Set([...this.state.selectedImages]);
    selectedImages.add(imgUrl);
    this.setState({ selectedImages });
  };

  markImageDeselected = imgUrl => {
    let selectedImages = new Set([...this.state.selectedImages]);
    selectedImages.delete(imgUrl);
    this.setState({ selectedImages });
  };

  onKeyDown = e => {
    const numImages = this.state.imgUrls.length;
    switch (e.key) {
      case 'Y':
      case 'y':
      case 'Enter':
        this.markImageSelected(this.state.imgUrls[this.state.focusedImageIndex]);
        this.setState({ focusedImageIndex: Math.min(this.state.focusedImageIndex+1, numImages-1) });
        e.stopPropagation();
        break;
      case 'N':
      case 'n':
        this.markImageDeselected(this.state.imgUrls[this.state.focusedImageIndex]);
        this.setState({ focusedImageIndex: Math.min(this.state.focusedImageIndex+1, numImages-1) });
        e.stopPropagation();
        break;
      case 'ArrowLeft':
        this.setState({ focusedImageIndex: Math.max(this.state.focusedImageIndex-1, 0)});
        e.stopPropagation();
        break;
      case 'ArrowRight':
        this.setState({ focusedImageIndex: Math.min(this.state.focusedImageIndex+1, numImages-1)});
        e.stopPropagation();
        break;
      default:
    }
  };

  render() {
    return (
      <div className="app" onKeyDown={this.onKeyDown} tabIndex={0}>
        <div className="query-container">
          <input name="query" type="text" value={this.state.query} onChange={this.onInputChange} />
          <button onClick={this.onQueryButtonClicked}>Search!</button>
          <textarea readOnly={true} value={[...this.state.selectedImages].join(',')} />
        </div>
        <div className="image-container">
          <ImageGrid
            images={this.state.imgUrls}
            focusedIdx={this.state.focusedImageIndex}
            selectedImages={this.state.selectedImages}
            imageClick={this.imageSelected}
          />
          <img src={this.state.imgUrls[this.state.focusedImageIndex]} className="preview-img" />
        </div>
      </div>
    );
  }
}
