import React from 'react';

export default class ImageGrid extends React.Component {

  render() {
    return (
      <div className="image-grid">
        {this.props.images.map((imgUrl, idx) => <ImageGridItem imgUrl={imgUrl} key={idx} />)}
      </div>
    )
  }

}

class ImageGridItem extends React.Component {

  render() {
    return <div className="image-grid-item">
      <img src={this.props.imgUrl} />
    </div>
  }

}
