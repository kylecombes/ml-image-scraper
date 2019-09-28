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
    let classNames = ['image-grid-item'];
    if (this.props.selected) {
      classNames.push('selected');
    }
    return <div className={classNames.join(' ')}>
      <img src={this.props.imgUrl} onClick={this.onClick}/>
    </div>
  }

}
