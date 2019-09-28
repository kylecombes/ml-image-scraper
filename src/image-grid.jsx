import React from 'react';

export default class ImageGrid extends React.Component {

  render() {
    return (
      <div className="image-grid">
        {this.props.images.map((imgUrl, idx) => (
          <ImageGridItem
            imgUrl={imgUrl}
            key={idx}
            onClick={this.props.imageClick}
            selected={this.props.selectedImages.has(imgUrl)}
          />
          ))}
      </div>
    )
  }

}

class ImageGridItem extends React.Component {

  onClick = () => this.props.onClick(this.props.imgUrl);

  render() {
    return <div className="image-grid-item">
      <img src={this.props.imgUrl} onClick={this.onClick} className={this.props.selected ? 'selected' : ''} />
    </div>
  }

}
